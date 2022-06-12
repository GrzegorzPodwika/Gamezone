import React, { useContext } from "react";
import { Card, Button, Icon, Image } from "semantic-ui-react";
import { UserContext } from "../../helpers/UserContext";
import {createNotification, NOTIFICATION} from "../../helpers/Notification";
import {AxiosClient} from "../../helpers/AuthenticationService";

function UserGameCard(props) {
  const { user } = useContext(UserContext);

  const deleteGame = () => {
    AxiosClient()
      .post(`deleteUserGame/${user.id}`, props.game)
      .then((res) => {
        if (res.status !== undefined && res.status === 200) {
          createNotification("Pomyślnie usunięto grę", NOTIFICATION.SUCCESS);
          props.handleDeleteGame(res.data);
        }
      })
      .catch((err) => {
          if (err.response !== undefined) {
              if(err.response.data.message !== undefined)
                  createNotification(err.response.data.message);
              else
                  createNotification("Nie udało się usunąć gry " + err.response.status);
          }
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
