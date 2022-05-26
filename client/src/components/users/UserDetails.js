import React from "react";
import { Form, Icon, Dropdown } from "semantic-ui-react";
import {Role} from "../../helpers/Role";

function UserDetails(props) {
  const optionsRoleUser = [
    { key: Role.Admin, text: "Admin", value: true },
    { key: Role.User, text: "Użytkownik", value: false },
  ];

  return (
    <div>
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
              value={props.user.username}
              onChange={props.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email"
              name="email"
              value={props.user.email}
              onChange={props.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Imię</label>
            <input
              placeholder="Imię"
              name="firstName"
              value={props.user.firstName}
              onChange={props.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Nazwisko</label>
            <input
              placeholder="Nazwisko"
              name="lastName"
              value={props.user.lastName}
              onChange={props.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Telefon</label>
            <input
              placeholder="Telefon"
              name="phone"
              value={props.user.phone}
              onChange={props.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Rola</label>
            <Dropdown
              placeholder="Rola"
              fluid
              selection
              options={optionsRoleUser}
              defaultValue={props.user.role}
              onChange={props.handleChangeRole}
            />
          </Form.Field>
        </Form>
      </div>
    </div>
  );
}

export default UserDetails;
