import { useState, useEffect, useCallback, useRef, ChangeEvent } from "react";
import React from "react";
import LoginPage from "../pages/LoginPage";
import RegisterForm from "./RegisterForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/form.css"
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { ROUTES } from "../../../configs/routes";

type FieldType = {
    username?: string;
    password?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const handleClick = () => {
}

const LoginForm = () => {

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
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item label="Factory">
                                <Select defaultValue="Select Factory">
                                    <Select.Option value="SBM">SBM</Select.Option>
                                    <Select.Option value="DMF">DMF</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label={null}>
                                <Button type="primary" href={ROUTES.general} htmlType="submit" block onClick={handleClick}>
                                    Sign In
                                </Button>
                            </Form.Item>
                            <Button type="link" block href={ROUTES.forgot} style={{ textDecoration: "none" }}>
                                Forgot Your Password?
                            </Button>
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

export default LoginForm;