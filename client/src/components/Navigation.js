import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { UserContext } from "../helpers/UserContext";
import {createNotification, NOTIFICATION} from "../helpers/Notification";
import {Role} from "../helpers/Role";
import {AxiosClient, Logout} from "../helpers/AuthenticationService";

function Navigation() {
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    AxiosClient()
        .get("logout")
        .then((res) => {
            console.log(res);

            if (res.status !== undefined && res.status === 200) {
                createNotification("Zostałeś pomyślnie wylogowany", NOTIFICATION.SUCCESS);
            }
        })
        .catch((err) => {
            console.log(err);
            if (err.response !== undefined)
                createNotification("Nie udało się wylogować " + err.response.status);
        });

      Logout();
      setUser(null);
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">GameZone</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <>
                <Nav.Link href="/mygames" style={{ fontSize: "18px"}}>Moje gry</Nav.Link>
                {user.role === Role.Admin ? (
                  <>
                    <Nav.Link href="/addgame" style={{ fontSize: "18px"}}>Dodaj grę</Nav.Link>
                    <Nav.Link href="/users" style={{ fontSize: "18px"}}>Użytkownicy</Nav.Link>
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
                <Nav.Link href="/myprofile" style={{ fontSize: "18px"}}>Mój profil</Nav.Link>
                <Nav.Link href="/login" style={{ fontSize: "18px"}} onClick={logout}>Wyloguj</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login" style={{ fontSize: "18px"}}>Logowanie</Nav.Link>
                <Nav.Link href="/register" style={{ fontSize: "18px"}}>Rejestracja</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
