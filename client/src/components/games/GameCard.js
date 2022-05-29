import React, { useContext, useState } from "react";
import {Card, Button, Icon, Modal, Header, Form, Image, Dropdown} from "semantic-ui-react";
import { DatePicker } from "antd";
import { UserContext } from "../../helpers/UserContext";
import { createNotification } from "../../helpers/Notification";
import moment from "moment";
import {Role} from "../../helpers/Role";
import {AxiosClient} from "../../helpers/AuthenticationService";
import {PLATFORMS} from "../../helpers/Platform";
import {TYPES} from "../../helpers/GameType";

function GameCard(props) {
  const { user } = useContext(UserContext);

  const [openModal, setOpenModal] = useState(false);
  const [gameData, setGameData] = useState({
    id: props.game.id,
    title: props.game.title,
    type: props.game.type,
    platform: props.game.platform,
    url: props.game.url,
    date: props.game.date
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

  const handleGameTypeChange = (e, data) => {
    setGameData({
      ...gameData,
      type: data.value,
    });
  };

  const handlePlatformChange = (e, data) => {
    setGameData({
      ...gameData,
      platform: data.value,
    });
  };

  const handleEditGame = () => {
    AxiosClient()
      .post("editGame", gameData)
      .then((res) => {
        if (res.status !== undefined && res.status === 200) {
          props.handleEditGame(res.data);
          createNotification("info", "Pomyślnie edytowano grę");
          setOpenModal(false);
        }
      })
      .catch((err) => {
        if (err.response !== undefined)
          createNotification("error", err.response.status);
      });
  };

  const handleAddUserGame = () => {
    AxiosClient()
      .post(`addUserGame/${user.id}`, props.game)
      .then((res) => {
        if (res.status !== undefined && res.status === 200) {
          createNotification("success", "Pomyślnie dodano grę");
        }
      })
      .catch((err) => {
        if (err.response !== undefined)
          if (err.response.status === 404)
            createNotification("error", "Użytkownik albo gra nie została znaleziona!");
          else if(err.response.status === 409)
            createNotification("error", "Uzytkownik już posiada wybraną grę!");
          else
            createNotification("error", err.response.status);
      });
  };

  const handleDeleteGame = () => {
    AxiosClient()
      .post('deleteGame', props.game)
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
      {user ? (
        <Button.Group>
          <Button primary onClick={handleAddUserGame}>
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
                          <Dropdown
                              placeholder="Gatunek"
                              fluid
                              selection
                              options={TYPES}
                              onChange={handleGameTypeChange}
                              value={gameData.type}
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Platforma</label>
                          <Dropdown
                              placeholder="Platforma"
                              fluid
                              selection
                              options={PLATFORMS}
                              onChange={handlePlatformChange}
                              value={gameData.platform}
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Url zdjęcia</label>
                          <input
                              placeholder="Url"
                              name="url"
                              onChange={handleChange}
                              value={gameData.url}
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
