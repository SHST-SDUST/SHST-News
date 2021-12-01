import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Radio, Button, Upload } from "antd";
import styles from "./index.module.scss";
import { typeList, subTypeListMapper } from "../common/type-group";
import { data } from "src/modules/global-data";
import { toast } from "src/modules/toast";

type UploadProps = Parameters<typeof Upload>[0];
type FormProps = Parameters<typeof Form>[0];

const IMAGE_LENGTH = 3;
const TABS = typeList;
const SUB_TABS = subTypeListMapper;

const NewsPublish = (): JSX.Element => {
    const [levelOneType, setLevelOneType] = React.useState<number>(0);
    const [imagePaths, setImagePaths] = React.useState<{ url: string; path: string }[]>([]);
    const beforeUpload: UploadProps["beforeUpload"] = file => {
        return Promise.reject(file);
    };

    const onFinish: FormProps["onFinish"] = values => {
        console.log("Success:", values);
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
                } = JSON.parse(event.file.response);
                if (!response.status) {
                    toast("上传失败，请稍后重试");
                } else if (response.status === -1 && response.msg) {
                    toast(response.msg);
                } else {
                    setImagePaths([...imagePaths, { url: response.url, path: response.path }]);
                }
            } catch (error) {
                toast("上传失败", "error");
            }
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
                        name="sub-type"
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
                    {imagePaths.map(item => (
                        <div
                            key={item.path}
                            className={
                                "a-x-center y-center a-flex-space-around" + styles.image_container
                            }
                        >
                            <img src={item.url} className="show-images" alt="" />
                        </div>
                    ))}
                    {imagePaths.length < IMAGE_LENGTH && (
                        <Upload
                            accept=".jpg,.png"
                            name="image"
                            showUploadList={false}
                            action={data.url + "/news/uploadImg"}
                            beforeUpload={beforeUpload}
                            onChange={onImageStatusChange}
                            withCredentials={true}
                        >
                            <div className={"a-x-center a-y-center " + styles.image_container}>
                                <PlusOutlined style={{ fontSize: "20px", color: "#aaa" }} />
                            </div>
                        </Upload>
                    )}
                    {Array(IMAGE_LENGTH - imagePaths.length - 1)
                        .fill(null)
                        .map((_, index) => (
                            <div key={index} className={styles.image_container_hide}></div>
                        ))}
                </div>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block className="a-lmt">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default NewsPublish;
