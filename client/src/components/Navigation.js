import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { UserContext } from "../helpers/UserContext";
import { createNotification } from "../helpers/Notification";
import {Role} from "../helpers/Role";
import {AxiosClient, Logout} from "../helpers/AuthenticationService";

function Navigation() {
  const { user, setUser } = useContext(UserContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">GameZone</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Gry</Nav.Link>
            {user ? (
              <>
                <Nav.Link href="/mygames">Moje gry</Nav.Link>
                {user.role === Role.Admin ? (
                  <>
                    <Nav.Link href="/addgame">Dodaj gre</Nav.Link>
                    <Nav.Link href="/users">Użytkownicy</Nav.Link>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link href="/myprofile">Mój profil</Nav.Link>
                <Nav.Link
                  href="/login"
                  onClick={() => {
                    AxiosClient()
                      .get("logout")
                      .then((res) => {
                        if (res.status !== undefined && res.status === 200) {
                          createNotification(
                            "success",
                            "Pomyślnie zostałeś wylogowany"
                          );
                        }
                      })
                      .catch((err) => {
                        if (err.response !== undefined)
                          createNotification("error", err.response.status);
                      });

                    Logout()
                    setUser(null)
                  }}
                >
                  Wyloguj
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Logowanie</Nav.Link>
                <Nav.Link href="/register">Rejestracja</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
