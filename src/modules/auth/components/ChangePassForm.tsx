import { useState, useEffect, useCallback, useRef, ChangeEvent } from "react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../css/form.css"
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { ROUTES } from "../../../configs/routes";

type FieldType = {
    password?: string;
    repassword?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const ChangePassForm = () => {

    return (

        <div className="container">
            <img src="https://web-qa.hrm.div4.pgtest.co/static/media/HR_Logo.7c93eebe8886301b470d6d7131b23a95.svg" alt="" />
            <h3>HR Management System</h3>
            <main>
                <div>
                    <h3>Sign In</h3>
                    <div className="box">
                        <Form
                            name="form"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                label="New Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input new password!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Confirm Password"
                                name="repassword"
                                rules={[{ required: true, message: 'Please input repeat password!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item label={null}>
                                <Button type="primary" htmlType="submit" block>
                                    Confirm
                                </Button>
                            </Form.Item>

                        </Form>

                    </div>
                </div>
            </main >
            <footer>
                <span>Copyright © 2022. All Rights Reserved</span>
            </footer>
        </div >
    );
}

export default ChangePassForm;