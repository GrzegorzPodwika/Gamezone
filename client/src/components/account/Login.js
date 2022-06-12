import React, {useState, useContext} from "react";
import {Button, Form} from "semantic-ui-react";
import {createNotification, NOTIFICATION} from "../../helpers/Notification";
import {UserContext} from "../../helpers/UserContext";
import {Redirect} from "react-router-dom";
import {ExecuteBasicAuthenticationService, UpdateUser} from "../../helpers/AuthenticationService";

function Login() {
    const {user, setUser} = useContext(UserContext);
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });


    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const sendLoginDataToAPI = () => {
        const formData = new FormData()
        formData.append("username", loginData.username);
        formData.append("password", loginData.password);

        ExecuteBasicAuthenticationService(formData)
        .then(res => {
                if (res.status !== undefined && res.status === 200) {
                    createNotification("Pomyślnie zalogowano", NOTIFICATION.INFO)
                    UpdateUser(res.data)
                    setUser(res.data)
                }
            })
            .catch(err => {
                if (err.response !== undefined) {
                    if(err.response.data.message !== undefined)
                        createNotification(err.response.data.message);
                    else
                        createNotification("Nie udało się zalogować " + err.response.status);
                }
            })
    }

    const handleLogin = () => {
        if (loginData.username.length > 0 && loginData.password.length > 0) {
            sendLoginDataToAPI(loginData);
        } else {
            createNotification("Login i hasło są wymagane");
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
                        <input placeholder="Login" name="username" onChange={handleChange}/>
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
