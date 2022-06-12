import React, { useContext, useState } from "react";
import { UserContext } from "../../helpers/UserContext";
import { Form, Icon, Button } from "semantic-ui-react";
import {createNotification, NOTIFICATION} from "../../helpers/Notification";
import {Role} from "../../helpers/Role";
import {AxiosClient, UpdateUser} from "../../helpers/AuthenticationService";

function UserProfile() {
  const { user, setUser } = useContext(UserContext);

  const [password, setPassword] = useState("");

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmitPassword = () => {
    if (password.length > 0) {
      const updatedUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        password: password,
        role: user.role,
        games: user.games,
      }
      AxiosClient()
        .post("editUser", updatedUser)
        .then((res) => {
          if (res.status !== undefined && res.status === 200) {
            createNotification("Pomyślnie zmieniono hasło", NOTIFICATION.SUCCESS);
            UpdateUser(updatedUser);
            setUser(res.data)
          }
        })
        .catch((err) => {
          if (err.response !== undefined) {
            if(err.response.data.message !== undefined)
              createNotification(err.response.data.message);
            else
              createNotification("Nie udało się zmienić hasła" + err.response.status);
          }
        });
    } else {
      createNotification("Hasło nie może być puste!");
    }
  };

  return (
    <div className="card-app">
      <div style={{ minWidth: "30vw" }}>
        <h3 style={{ textAlign: "center" }}>
          {" "}
          <Icon name="user" /> Dane profilowe
        </h3>
        <Form>
          <Form.Field>
            <label>Login</label>
            <input
              placeholder="Login"
              name="login"
              readOnly={true}
              value={user.username}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email"
              name="email"
              readOnly={true}
              value={user.email}
            />
          </Form.Field>
          <Form.Field>
            <label>Imię</label>
            <input
              placeholder="Imię"
              name="firstName"
              readOnly={true}
              value={user.firstName}
            />
          </Form.Field>
          <Form.Field>
            <label>Nazwisko</label>
            <input
              placeholder="Nazwisko"
              name="lastName"
              readOnly={true}
              value={user.lastName}
            />
          </Form.Field>
          <Form.Field>
            <label>Telefon</label>
            <input
              placeholder="Telefon"
              name="phone"
              readOnly={true}
              value={user.phone}
            />
          </Form.Field>
          <Form.Field>
            <label>Rola</label>
            <input
              placeholder="Rola"
              name="role"
              readOnly={true}
              value={user.role === Role.Admin ? "Admin" : "Uzytkownik"}
            />
          </Form.Field>
          <div
            style={{
              borderTop: "2px solid #000",
              marginTop: 30,
              marginBottom: 5,
            }}
          />
          <Form.Field>
            <label>Nowe hasło</label>
            <input
              placeholder="Nowe hasło"
              type="password"
              name="password"
              onChange={(handleChangePassword)}
            />
          </Form.Field>
          <Button
            type="submit"
            color="green"
            onClick={handleSubmitPassword}
            style={{ width: "100%" }}
          >
            Potwierdź nowe hasło
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UserProfile;
