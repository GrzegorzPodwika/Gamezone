import React, { useContext, useState } from "react";
import { Card, Button, Icon, Modal, Header, Form } from "semantic-ui-react";
import { DatePicker } from "antd";
import { UserContext } from "../../helpers/UserContext";
import axios from "axios";
import { createNotification } from "../../helpers/Notification";
import moment from "moment";
import {Role} from "../../helpers/Role";

function GameCard(props) {
  const { user } = useContext(UserContext);

  const [openModal, setOpenModal] = useState(false);
  const [gameData, setGameData] = useState({
    id: props.game.id,
    title: props.game.title,
    type: props.game.type,
    platform: props.game.platform,
    date: props.game.date,
  });

  const handleChange = (e) => {
    setGameData({
      ...gameData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeDate = (date, dateString) => {
    setGameData({
      ...gameData,
      date: dateString,
    });
  };

  const handleEditGame = () => {
    axios
      .post("editGame", {
        id: gameData.id,
        title: gameData.title,
        type: gameData.type,
        platform: gameData.platform,
        date: gameData.date,
      }, {
        auth: {
          username: user.login,
          password: user.password
        }
      })
      .then((res) => {
        if (res.status !== undefined && res.status === 200) {
          props.handleEditGame(res.data.games);
          createNotification("info", "Pomyślnie edytowano grę");
          setOpenModal(false);
        }
      })
      .catch((err) => {
        if (err.response !== undefined)
          createNotification("error", err.response.data);
      });
  };

  const handleAddGame = () => {
    axios
      .post("addUserGame", {
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
          createNotification("success", "Pomyślnie dodano grę");
        }
      })
      .catch((err) => {
        if (err.response !== undefined)
          createNotification("error", err.response.data);
      });
  };

  const handleDeleteGame = () => {
    axios
      .post("deleteGame", {
        id: props.game.id,
        title: props.game.title,
        type: props.game.type,
        platform: props.game.platform,
        date: props.game.date,
      }, {
        auth: {
          username: user.login,
          password: user.password
        }
      })
      .then((res) => {
        if (res.status !== undefined && res.status === 200) {
          createNotification("success", "Pomyślnie usunięto grę");
          props.handleDeleteGame(res.data.games);
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
      {user ? (
        <Button.Group>
          <Button primary onClick={handleAddGame}>
            Dodaj
          </Button>
          {user.role === Role.Admin ? (
            <>
              <Modal
                style={{
                  height: "auto",
                  width: "auto",
                  left: "auto",
                  bottom: "auto",
                  right: "auto",
                  top: "auto",
                }}
                closeIcon
                open={openModal}
                trigger={<Button secondary>Edytuj</Button>}
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
              >
                <Header icon="user" content="Edycja gry" />
                <Modal.Content>
                  <div>
                    <div style={{ minWidth: "30vw" }}>
                      <Form>
                        <Form.Field>
                          <label>Tytuł</label>
                          <input
                            placeholder="Tytuł"
                            name="title"
                            onChange={handleChange}
                            value={gameData.title}
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Gatunek</label>
                          <input
                            placeholder="Gatunek"
                            name="type"
                            onChange={handleChange}
                            value={gameData.type}
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Platforma</label>
                          <input
                            placeholder="Platforma"
                            name="platform"
                            onChange={handleChange}
                            value={gameData.platform}
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Data wydania</label>
                          <DatePicker
                            onChange={handleChangeDate}
                            style={{ width: "100%" }}
                            placeholder="Data wydania"
                            value={moment(gameData.date, "YYYY-MM-DD")}
                            allowClear={false}
                          />
                        </Form.Field>
                      </Form>
                    </div>
                  </div>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="red" onClick={() => setOpenModal(false)}>
                    <Icon name="remove" /> Odrzuć zmiany
                  </Button>
                  <Button color="green" onClick={handleEditGame}>
                    <Icon name="checkmark" /> Zatwierdź zmiany
                  </Button>
                </Modal.Actions>
              </Modal>

              <Button color="red" onClick={handleDeleteGame}>
                Usuń
              </Button>
            </>
          ) : (
            <></>
          )}
        </Button.Group>
      ) : (
        <> </>
      )}
    </Card>
  );
}

export default GameCard;
