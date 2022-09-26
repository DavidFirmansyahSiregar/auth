import axios from "axios";

const BASE_PATH = "https://nodejs-backend-api-playground.herokuapp.com";

export const userRegistration = async (payload, navigate) => {
    try {
        const registration = await axios.post(`${BASE_PATH}/auth/user/registration`, payload);
        navigate("/success");
        console.log(registration.data.data);
    } catch (error) {
        console.log(error.response.data);
        alert(error.response.data.message)
    }
};

export const userLogin = async (payload, navigate) => {
    try {
        // login user
        const loginResults = await axios.post(`${BASE_PATH}/auth/user/login`, payload);
        // get access token from refresh token user login return response with headers option
        // check insomnia or postman @ GENERATE ACCESS TOKEN Request
        const getAccessToken = await axios.get(`${BASE_PATH}/auth/generate/accessToken`, {
            headers: {
                Authorization : `Bearer ${loginResults.data.refreshToken}`
            }
        });

        // create data structure about user credentials from all API hit above and save to local storage
        const userCredentials = {
            ...loginResults.data,
            accessToken: getAccessToken.data
        }

        // actually save to local storage.  userCredentials data nad key need to format to string before saving,
        // otherwise it will be convert to an object see https://prnt.sc/sqmjF9Ri51dN
        localStorage.setItem("userCredentials", JSON.stringify(userCredentials));

        // redirect to dashboard or whatever your page after auth
        navigate("/dashboard");

        // check or uncomment below log to see the actual process of hitting the above API
        // console.log(loginResults.data);
        // console.log(getAccessToken.data);
        // console.log(userCredentials);
    } catch (error) {
        console.log(error.response.data);
        alert(error.message)
    }
};

export const userLogout = (navigate) => {
    localStorage.removeItem("userCredentials");
    navigate("/login");
};