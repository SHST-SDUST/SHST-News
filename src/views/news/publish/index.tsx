import React from "react";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Form, Input, Radio, Button, Upload, Image, FormProps, UploadProps } from "antd";
import { compressAccurately } from "image-conversion";
import styles from "./index.module.scss";
import { typeList, subTypeListMapper } from "../common/type-group";
import { data } from "src/modules/global-data";
import { confirm, toast } from "src/modules/toast";
import loading from "src/modules/loading";
import { publishNews } from "src/models/news/post";
import { updateUserInfo } from "src/utils/mini-program";
import { useNavigate } from "react-router-dom";
import { throttle } from "src/modules/operate-limit";

const IMAGE_LENGTH = 3;
const TABS = typeList;
const SUB_TABS = subTypeListMapper;

const NewsPublish = (): JSX.Element => {
    const navigate = useNavigate();
    const [levelOneType, setLevelOneType] = React.useState<number>(0);
    const [imagePaths, setImagePaths] = React.useState<{ url: string; path: string }[]>([]);

    const beforeUpload: UploadProps["beforeUpload"] = file => {
        if (file.type !== "image/jpeg") {
            toast("仅允许上传jpg格式的图片");
            return Promise.reject(false);
        }
        loading.start("上传中...");
        return new Promise((resolve, reject) => {
            const limit = file.size / 1024 < 100; // 判断图片是否过大 100kb
            if (limit) resolve(file);
            const scale = 200 / (file.size / 1024);
            compressAccurately(file, {
                size: 100,
                accuracy: 0.9,
                scale: Math.max(0.5, Math.min(1, scale)),
            })
                .then(res => resolve(res))
                .catch(e => {
                    console.log(e);
                    reject(false);
                    loading.end();
                });
        });
    };

    const onFinish: FormProps<{ content: string; type: number; sub_type?: number }>["onFinish"] =
        values => {
            throttle(500, () => {
                publishNews(
                    values.content,
                    values.type,
                    values.sub_type ? values.sub_type : 0,
                    imagePaths
                ).then(res => {
                    if (res.update) {
                        updateUserInfo();
                    } else {
                        navigate("/mine/news", { replace: true });
                    }
                });
            });
        };

    const onImageStatusChange: UploadProps["onChange"] = event => {
        // `status`: `uploading` `done` `error` `removed` 被`beforeUpload`拦截的文件没有`status`属性
        if (event.file.status && event.file.status === "done") {
            try {
                const response: {
                    status: number;
                    msg?: string;
                    url: string;
                    path: string;
                } = event.file.response;
                if (!response.status) {
                    toast("上传失败，请稍后重试", "error");
                } else if (response.status === -1 && response.msg) {
                    toast(response.msg);
                } else {
                    setImagePaths([...imagePaths, { url: response.url, path: response.path }]);
                }
            } catch (error) {
                console.log(error);
                toast("上传失败", "error");
            } finally {
                loading.end();
            }
        }
    };

    const deleteImgItem = async (index: number) => {
        const choice = await confirm("提示", "确定要移除这张图片吗");
        if (choice) {
            imagePaths.splice(index, 1);
            setImagePaths([...imagePaths]);
        }
    };

    return (
        <div className={"a-background-white full-page " + styles.container}>
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item
                    name="content"
                    label="新鲜事"
                    rules={[
                        { required: true, message: "新鲜事必填" },
                        { min: 1, max: 200, message: "新鲜事必须在1-200字之间" },
                    ]}
                >
                    <Input.TextArea
                        showCount
                        maxLength={200}
                        autoSize={{ minRows: 4, maxRows: 7 }}
                    />
                </Form.Item>
                <Form.Item name="type" label="类别" rules={[{ required: true, message: "必选" }]}>
                    <Radio.Group onChange={event => setLevelOneType(event.target.value)}>
                        {TABS.map(item => (
                            <Radio value={item.index} key={item.index}>
                                {item.name}
                            </Radio>
                        ))}
                    </Radio.Group>
                </Form.Item>
                {SUB_TABS[levelOneType] && (
                    <Form.Item
                        name="sub_type"
                        label="二级类别"
                        rules={[{ required: true, message: "必选" }]}
                    >
                        <Radio.Group>
                            {SUB_TABS[levelOneType].map(item => (
                                <Radio value={item.index} key={item.index}>
                                    {item.name}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                )}
                <div className="a-x-center y-center a-flex-space-around">
                    {imagePaths.map((item, index) => (
                        <div key={index} className="a-position-relative">
                            <div className={"a-flex-space-around " + styles.image_container}>
                                <Image src={item.url} wrapperClassName="a-x-center" alt="" />
                            </div>
                            <CloseOutlined
                                className={"a-x-center a-y-center " + styles.close}
                                onClick={() => deleteImgItem(index)}
                            />
                        </div>
                    ))}
                    {imagePaths.length < IMAGE_LENGTH && (
                        <Upload
                            name="image"
                            showUploadList={false}
                            action={data.url + "/news/publish/uploadImg"}
                            beforeUpload={beforeUpload}
                            onChange={onImageStatusChange}
                            withCredentials={true}
                        >
                            <div className={"a-x-center a-y-center " + styles.image_container}>
                                <PlusOutlined style={{ fontSize: "20px", color: "#aaa" }} />
                            </div>
                        </Upload>
                    )}
                    {IMAGE_LENGTH - imagePaths.length - 1 > 0 &&
                        Array(IMAGE_LENGTH - imagePaths.length - 1)
                            .fill(null)
                            .map((_, index) => (
                                <div key={index} className={styles.image_container_hide}></div>
                            ))}
                </div>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block className="a-mt-20">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default NewsPublish;
