import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import { userLogin } from "../_services";
import { Layout, Button, Form, Input } from "antd";
import "./auth.css"

const { Header, Content, Footer} = Layout;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const validateMessages = {
    required: '${label} is required!',
};

export const Login = () => {
    const navigate = useNavigate();

    const [userCredentials, setUserCredentials] = useState({user: "", password: "", email: "",});
    // console.log(userCredentials);
    const onFinish = (values) => {
        console.log(values);
      };

    return (
        <Layout>
        <Header></Header>
        <div className="login-page-container">
        <Content>
            <h1><b>LOGIN</b></h1>
            <div className="login-form-container">
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item 
                    name={['UserName']}
                    label="UserName"
                    onChange={(e) => {
                        setUserCredentials({...userCredentials, user: e.target.value})
                    }}
                    rules={[
          
                    {
                    required: true,
                    },
                    ]}
                >
                <Input />
                </Form.Item>

                <Form.Item 
                    name={['password']}
                    label="password"
                    onChange={(e) => {
                        setUserCredentials({...userCredentials, user: e.target.value})
                    }}
                    rules={[
      
                    {
                    required: true,
                    },
                    ]}
                >
                <Input />
                </Form.Item>
                </Form>
            </div>

            <Form.Item 
            wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button 
                type="primary" 
                htmlType="submit"
                onClick={() => {
                    userLogin(userCredentials, navigate);
                }}
            >
            <b>LOGIN</b>
            </Button>
            </Form.Item>

        </Content>
        <Footer>
            Don't have an account ?
            <button className="button-registration" onClick={() => navigate("/registration")}>
                REGISTRATION
            </button>
        </Footer>
        </div>
       
        </Layout>
    )
}