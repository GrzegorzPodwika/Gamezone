import React, { useContext } from "react";
import { Card, Button, Icon, Image } from "semantic-ui-react";
import { UserContext } from "../../helpers/UserContext";
import { createNotification } from "../../helpers/Notification";
import {AxiosClient} from "../../helpers/AuthenticationService";

function UserGameCard(props) {
  const { user } = useContext(UserContext);

  const deleteGame = () => {
    AxiosClient()
      .post(`deleteUserGame/${user.id}`, props.game)
      .then((res) => {
        if (res.status !== undefined && res.status === 200) {
          createNotification("success", "Pomyślnie usunięto grę");
          props.handleDeleteGame(res.data);
        }
      })
      .catch((err) => {
        if (err.response !== undefined)
            if (err.response.status === 404)
                createNotification("error", "Użytkownik albo gra nie została znaleziona!");
            else if(err.response.status === 409)
                createNotification("error", "Gra nie została usunięta!");
            else
                createNotification("error", err.response.status);
      });
  };

  return (
    <Card>
        <Image src={props.game.url} wrapped ui={false} />
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
