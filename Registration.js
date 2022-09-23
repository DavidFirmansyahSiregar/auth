// import React, { useState,} from "react";
// import { useNavigate } from "react-router-dom";
// import "antd/dist/antd.css";
// import { userRegistration } from "../_services";
// import { Layout, Button, Form, Input } from "antd";
// import "./auth.css";


// const { Header, Footer, Content } = Layout
// const layout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 16 },
//   };
// const validateMessages = {
//     required: '${label} is required!',
//     types: {
//       email: '${label} is not a valid email!',
//     },
//   };

// export const Registration = () => {
//     const navigate = useNavigate();

//     const [userCredentials, setUserCredential] = useState({userName: "", email: "", password: ""});
//     // console.log(userCredentials);
//     const [matchUserCredentials, setMatchUserCredential] = useState(false)
   
    
//     const onFinish = (values) => {
//         console.log(values);
//       };
   
   
//     return (
//         <Layout>
//         <Header></Header>
//         <div className="registration-page-container">
//             <Content>
//             <h1><b>REGISTRATION</b></h1>
//             <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
//                 <Form.Item 
//                     name={['UserName']}
//                     label="userName"
//                     onChange={(e) => {
//                         setUserCredential({...userCredentials, user: e.target.value})
//                     }}
//                     rules={[
              
//                     {
//                     required: true,
//                     },
//                     ]}
//                 >
//                 <Input />
//                 </Form.Item>

//                 <Form.Item
//                     name={['email']}
//                     label="Email"
//                     onChange={(e) => {
//                         setUserCredential({...userCredentials, user: e.target.value})
//                     }}
//                     rules={[
//                     {
//                     type: 'email',
//                     },
//                     ]}
//                 >
//                 <Input />
//                 </Form.Item>

//                 <Form.Item 
//                     name={['password']} 
//                     label="Password"
//                     onChange={(e) => {
//                         setUserCredential({...userCredentials, user: e.target.value})
//                     }}
//                 >
//                 <Input />
//                 </Form.Item>

//                 <Form.Item 
//                     name={['confirmpassword']} 
//                     label="ConfirmPassword"
//                 >
//                 <Input />
//                 </Form.Item>

//             <Form.Item 
//                 wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
//                 <Button 
//                     // disable={!validUserCredentials ? true : false}
//                     type="primary" 
//                     htmlType="submit"
//                     onClick={() => {
//                         userRegistration(userCredentials, navigate);
//                     }}
//                 >
//                 <b>Submit</b>
//                 </Button>
//             </Form.Item>
//             </Form>
//             </Content>
//             <Footer>
//                 <h1>Already have an account?</h1>
//                 <button 
//                     type="primary" 
//                     onClick={() => navigate("/login")}>
//                 LOGIN
//                 </button>
//             </Footer>
//         </div>
//         </Layout>
//     );
// };

import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userRegistration } from "../_services";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const Registration = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] =useState ('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(userName));
    }, [userName])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [userName, email, password, matchPwd])

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // if button enabled with JS hack
    //     const v1 = USER_REGEX.test(userName);
    //     const v2 = PWD_REGEX.test(password);
    //     if (!v1 || !v2) {
    //         setErrMsg("Invalid Entry");
    //         return;
    //     }
    // //     try {
    // //         const response = await axios.post("https://nodejs-backend-api-playground.herokuapp.com/auth/user/registration",
    // //             JSON.stringify({ userName, password, email}),
    // //             {
    // //                 headers: { 'Content-Type': 'application/json' },
    // //                 withCredentials: true
    // //             }
    // //         );
    // //         // TODO: remove console.logs before deployment
    // //         console.log(JSON.stringify(response?.data));
    // //         //console.log(JSON.stringify(response))
    // //         setSuccess(true);
    // //         //clear state and controlled inputs
    // //         setUserName('');
    // //         setEmail('');
    // //         setPassword('');
    // //         setMatchPwd('');
    // //     } catch (err) {
    // //         if (!err?.response) {
    // //             setErrMsg('No Server Response');
    // //         } else if (err.response?.status === 400) {
    // //             setErrMsg('Username Taken');
    // //         } else {
    // //             setErrMsg('Registration Failed')
    // //         }
    // //         errRef.current.focus();
    // //     }
    // // }


    return (
        <div className="registration-page-container">
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="/success">Login</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p 
                        ref={errRef} 
                        className={errMsg ? "errmsg" : "offscreen"} 
                        aria-live="assertive">{errMsg}
                    </p>
                    <h1>Register</h1>
                    <form onSubmit={userRegistration}>
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !userName ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && userName && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            example "cik@gmail.com".<br />
                        </p>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button 
                            disabled={!validName || !validEmail || !validPwd || !validMatch ? true : false}
                            onClick={() => {
                                userRegistration(userName, password, email, navigate);
                            }}
                            >Sign Up</button>
                    </form>
                    <p>
                    
                        Already have an account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="/login">LOGIN</a>
                        </span>
                    </p>
                </section>
            )}
        </>
        </div>
    )
}

