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

export const ExecuteBasicAuthenticationService = (formData) => {
    return axios.post(`/login`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const CreateBasicAuthToken = (username, password) => {
    return 'Basic ' + window.btoa(username + ":" + password);
}

export const UpdateUser = (userObject) => {
    console.log("registerSuccessfulLogin user: " + userObject + " username " + userObject.username);
    const convertedUser = JSON.stringify(userObject);

    sessionStorage.setItem(USER_SESSION_ATTRIBUTE, convertedUser);
    sessionStorage.setItem(TOKEN_ATTRIBUTE, CreateBasicAuthToken(userObject.username, userObject.password));
}

export const Logout = () => {
    sessionStorage.removeItem(USER_SESSION_ATTRIBUTE);
    sessionStorage.removeItem(TOKEN_ATTRIBUTE);

}

export const isUserLoggedIn = () => {
    let user = sessionStorage.getItem(USER_SESSION_ATTRIBUTE)
    return user !== null;
}

export const getLoggedInUserName = () => {
    let user = sessionStorage.getItem(USER_SESSION_ATTRIBUTE)
    if (user === null) return ''
    return user.username
}

/*
const setupAxiosInterceptors = (token) => {
    axios.interceptors.request.use(
        (config) => {
            console.log("setupAxiosInterceptors isUserLoggedIn " + isUserLoggedIn());

            if (isUserLoggedIn()) {
                console.log("setupAxiosInterceptors token " + token);
                config.headers.Authorization = token;
            } else {
                config.headers.Authorization = null;
            }
            return config;
        }
    )
}*/
