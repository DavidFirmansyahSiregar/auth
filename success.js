import React from 'react'
import "antd/dist/antd.css";
import { Layout } from "antd";
import { useNavigate } from 'react-router-dom';

const {Header, Content } = Layout;
export const Success = () => {
    const navigate = useNavigate();

  return (
    <Layout>
    <Header></Header>
    <Content>
        <div>
        <h1><b>Congrats! You have an account now. pliss click the button below.</b></h1>
        <br></br>
            <button 
                type="primary" 
                onClick={() => navigate("/login")}>
            LOGIN
            </button>
        </div>
    </Content>    
    </Layout>
  )
}
