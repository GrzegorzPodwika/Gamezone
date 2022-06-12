import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import {createNotification, NOTIFICATION} from "../../helpers/Notification";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {Role} from "../../helpers/Role";

function Register() {
  const [response,setResponse] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    role: Role.User
  });

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const validateRegisterData = () => {
    if (registerData.username.length <= 0) {
      createNotification("Login jest wymagany");

      return false;
    } else if (registerData.email.length <= 0) {
      createNotification("Email jest wymagany");
      return false;
    } else if (registerData.firstName.length <= 0) {
      createNotification("Imię jest wymagane");
      return false;
    } else if (registerData.lastName.length <= 0) {
      createNotification("Nazwisko jest wymagane");
      return false;
    } else if (registerData.phone.length <= 0) {
      createNotification("Telefon jest wymagany");
      return false;
    } else if (registerData.password.length <= 0) {
      createNotification( "Hasło jest wymagane");
      return false;
    }
    return true;
  };

  const handleRegister = () => {
    if (validateRegisterData()) {
      axios
          .post("register", JSON.stringify(registerData), null)
          .then((res) => {
            setResponse(true)

            if (res.status !== undefined && res.status === 200) {
              createNotification("Rejestracja przebiegła pomyślnie", NOTIFICATION.SUCCESS);
            }
          })
          .catch((err) => {
            console.log(err);
            if (err.response !== undefined) {
              if(err.response.data.message !== undefined)
                createNotification(err.response.data.message);
              else
                createNotification("Rejestracja sie nie powiodła " + err.response.status);
            }
          });
    }
  };

  if (response) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="card-app">
      <div style={{ minWidth: "30vw" }}>
        <h3 style={{ textAlign: "center" }}>Rejestracja</h3>
        <Form>
          <Form.Field>
            <label>Login</label>
            <input placeholder="Username" name="username" onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input placeholder="Email" name="email" onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Imię</label>
            <input
              placeholder="Imię"
              name="firstName"
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Nazwisko</label>
            <input
              placeholder="Nazwisko"
              name="lastName"
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Telefon</label>
            <input placeholder="Telefon" name="phone" onChange={handleChange} />
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
            onClick={handleRegister}
            style={{ width: "100%" }}
          >
            Zarejestruj się
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
