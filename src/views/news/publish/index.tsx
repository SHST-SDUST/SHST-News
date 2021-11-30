import "./index.scss";
import { Form, Input, Radio } from "antd";
import { typeList, subTypeListMapper } from "../common/type-group";
import React from "react";

const TABS = typeList;
const SUB_TABS = subTypeListMapper;

const NewsIndex = (): JSX.Element => {
    const [firstType, setFirstType] = React.useState(0);

    return (
        <div className="a-background-white">
            <Form>
                <Form.Item
                    name="content"
                    label="内容"
                    rules={[
                        { required: true, message: "内容必填" },
                        { min: 1, max: 200, message: "内容必须在1-200字之间" },
                    ]}
                >
                    <Input.TextArea showCount maxLength={200} />
                </Form.Item>
                <Form.Item name="type" label="类别" rules={[{ required: true, message: "必选" }]}>
                    <Radio.Group onChange={event => setFirstType(event.target.value)}>
                        {TABS.map(item => {
                            <Radio value={item.index} key={item.index}>
                                {item.name};
                            </Radio>;
                        })}
                    </Radio.Group>
                </Form.Item>
                {SUB_TABS[firstType] && (
                    <Form.Item
                        name="sub-type"
                        label="类别"
                        rules={[{ required: true, message: "必选" }]}
                    >
                        <Radio.Group>
                            {SUB_TABS[firstType].map(item => {
                                <Radio value={item.index} key={item.index}>
                                    {item.name};
                                </Radio>;
                            })}
                        </Radio.Group>
                    </Form.Item>
                )}
            </Form>
        </div>
    );
};

export default NewsIndex;
