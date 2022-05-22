import React, {useState, useContext} from "react";
import {Button, Form} from "semantic-ui-react";
import {createNotification} from "../../helpers/Notification";
import {UserContext} from "../../helpers/UserContext";
import {Redirect} from "react-router-dom";
import axios from 'axios'

function Login() {
    const {user, setUser} = useContext(UserContext);
    const [loginData, setLoginData] = useState({
        login: "",
        password: "",
    });


    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const sendLoginDataToAPI = (loginData) => {
        axios.post('login', {
            login: loginData.login,
            password: loginData.password
        }, {})
            .then(res => {
                if (res.status !== undefined && res.status === 200) {
                    setUser(res.data);
                    localStorage.setItem('user', JSON.stringify(res.data));
                }
            })
            .catch(err => {
                createNotification("error", err.response.data);
            })
    }

    const handleLogin = () => {
        if (loginData.login.length > 0 && loginData.password.length > 0) {
            sendLoginDataToAPI(loginData);
        } else {
            createNotification("error", "Login i hasło są wymagane");
        }
    };

    if (user) {
        return <Redirect to={'/'}
        />
    }

    return (
        <div className="card-margin-top-app">
            <div style={{minWidth: "30vw"}}>
                <h3 style={{textAlign: "center"}}>Logowanie</h3>
                <Form>
                    <Form.Field>
                        <label>Login</label>
                        <input placeholder="Login" name="login" onChange={handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Hasło</label>
                        <input
                            placeholder="Hasło"
                            type="password"
                            name="password"
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Button
                        type="submit"
                        color="green"
                        onClick={handleLogin}
                        style={{width: "100%"}}>
                        Zaloguj się
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;
