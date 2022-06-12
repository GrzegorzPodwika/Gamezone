import axios from 'axios'

export const baseUrlServer = "http://localhost:9000/";
export const USER_SESSION_ATTRIBUTE = "AUTHENTICATED_USER";
export const TOKEN_ATTRIBUTE = "TOKEN_USER";

export const AxiosClient = () => {
    const defaultOptions = {
        baseURL: baseUrlServer,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let instance = axios.create(defaultOptions);

    instance.interceptors.request.use(
        (config) => {
            const token = sessionStorage.getItem(TOKEN_ATTRIBUTE)
            console.log("setupAxiosInterceptors token " + token);

            if (isUserLoggedIn()) {
                config.headers.Authorization = token;
            } else {
                config.headers.Authorization = null;
            }
            return config;
        }
    )

    return instance;
}

export const isUserLoggedIn = () => {
    let user = sessionStorage.getItem(USER_SESSION_ATTRIBUTE)
    return user !== null;
}

export const ExecuteBasicAuthenticationService = (formData) => {
    return axios.post(`/login`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const UpdateUser = (userObject) => {
    const convertedUser = JSON.stringify(userObject);

    sessionStorage.setItem(USER_SESSION_ATTRIBUTE, convertedUser);
    sessionStorage.setItem(TOKEN_ATTRIBUTE, CreateBasicAuthToken(userObject.username, userObject.password));
}

const CreateBasicAuthToken = (username, password) => {
    return 'Basic ' + window.btoa(username + ":" + password);
}

export const Logout = () => {
    sessionStorage.removeItem(USER_SESSION_ATTRIBUTE);
    sessionStorage.removeItem(TOKEN_ATTRIBUTE);
}


