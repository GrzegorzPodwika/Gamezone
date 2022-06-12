import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import UserDetails from "../UserDetails";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders UserDetails correctly", () => {
    const user = {
        id: 0,
        username: "test",
        email: "test",
        firstName: "test",
        lastName: "test",
        phone: "test",
        password: "test",
        games: [],
        role: "USER"
    }
    const handleChange = jest.fn();
    const handleChangeRole = jest.fn();

    act(() => {
        render(<UserDetails user={user} handleChange={handleChange} handleChangeRole={handleChangeRole}/>, container);
    });

    const loginElement = document.getElementById('login');
    const emailElement = document.getElementById('email');
    const firstNameElement = document.getElementById('firstName');
    const lastNameElement = document.getElementById('lastName');
    const phoneElement = document.getElementById('phone');

    expect(loginElement.value).toBe(user.username);
    expect(emailElement.value).toBe(user.email);
    expect(firstNameElement.value).toBe(user.firstName);
    expect(lastNameElement.value).toBe(user.lastName);
    expect(phoneElement.value).toBe(user.phone);

    act(() => {
        loginElement.value = "NEW_LOGIN";
        emailElement.value = "NEW_EMAIL";
        firstNameElement.value = "NEW_FIRSTNAME";
        lastNameElement.value = "NEW_LASTNAME";
        phoneElement.value = "NEW_PHONE";
    });

    expect(loginElement.value).toBe("NEW_LOGIN");
    expect(emailElement.value).toBe("NEW_EMAIL");
    expect(firstNameElement.value).toBe("NEW_FIRSTNAME");
    expect(lastNameElement.value).toBe("NEW_LASTNAME");
    expect(phoneElement.value).toBe("NEW_PHONE");

    expect(handleChange).toHaveBeenCalledTimes(5);
});