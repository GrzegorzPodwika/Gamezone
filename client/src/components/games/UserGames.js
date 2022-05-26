import React, { useContext, useState, useEffect } from "react";
import UserGameCard from "./UserGameCard";
import { Card, Icon } from "semantic-ui-react";
import axios from "axios";
import { UserContext } from "../../helpers/UserContext";
import { createNotification } from "../../helpers/Notification";

function UserGames() {
  const [userGames, setUserGames] = useState([]);
  const { user } = useContext(UserContext);

  const handleDeleteGame = (newGames) => {
    setUserGames(newGames)
 }
  useEffect(() => {
    axios
      .get(`getUserGames/${user.id}`, {
          auth: {
              username: user.username,
              password: user.password
          }
      })
      .then((res) => {
        if (res.status !== undefined && res.status === 200) {
          setUserGames(res.data);
        }
      })
      .catch((err) => {
        if (err.response !== undefined)
          createNotification("error", err.response.data);
      });
  }, []);

  return (
    <div className="card-app">
      <h2 style={{ textAlign: "center" }}>
        <Icon name="game" /> Moje gry
      </h2>
      {userGames.length > 0 ? (
        <Card.Group centered={true}>
          {userGames.map((item, index) => (
            <UserGameCard game={item} key={index} handleDeleteGame={handleDeleteGame}/>
          ))}
        </Card.Group>
      ) : (
        <p>Nie masz żadnych gier</p>
      )}
    </div>
  );
}

export default UserGames;
