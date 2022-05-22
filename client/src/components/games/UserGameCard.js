import React, { useContext } from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import { UserContext } from "../../helpers/UserContext";
import axios from "axios";
import { createNotification } from "../../helpers/Notification";

function UserGameCard(props) {
  const { user } = useContext(UserContext);

  const deleteGame = () => {
    axios
      .post("deleteUserGame", {
        userId: user.id,
        gameId: props.game.id,
      }, {
          auth: {
              username: user.login,
              password: user.password
          }
      })
      .then((res) => {
        if (res.status !== undefined && res.status === 200) {
          createNotification("success", "Pomyślnie usunięto grę");
          props.handleDeleteGame(res.data);
        }
      })
      .catch((err) => {
        if (err.response !== undefined)
          createNotification("error", err.response.data);
      });
  };

  return (
    <Card>
      <Card.Content>
      <Card.Header>{props.game.title}</Card.Header>
        <Card.Meta>{props.game.type}</Card.Meta>
        <Card.Description>{props.game.platform}</Card.Description>
        <Card.Description>{props.game.date}</Card.Description>
      </Card.Content>
      <Button color="teal" onClick={deleteGame}>
        <Icon name="delete" /> Usuń
      </Button>
    </Card>
  );
}

export default UserGameCard;
