import React, {useContext, useState} from "react";
import {Button, Dropdown, Form} from "semantic-ui-react";
import { createNotification } from "../../helpers/Notification";
import "antd/dist/antd.css";
import { DatePicker } from "antd";
import axios from "axios";
import {UserContext} from "../../helpers/UserContext";
import {TYPES} from "../../helpers/GameType";
import {PLATFORMS} from "../../helpers/Platform";

function AddGame() {
  const { user } = useContext(UserContext);

  const [gameData, setGameData] = useState({
    title: "",
    type: "",
    platform: "",
    url: "",
    date: "",
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

  const validateGameData = () => {
    if (gameData.title.length <= 0) {
      createNotification("error", "Tytuł jest wymagany");
      return false;
    } else if (gameData.type.length <= 0) {
      createNotification("error", "Gatunek jest wymagany");
      return false;
    } else if (gameData.platform.length <= 0) {
      createNotification("error", "Platforma jest wymagana");
      return false;
    } else if (gameData.date.length <= 0) {
      createNotification("error", "Data jest wymagana");
      return false;
    } else if (gameData.url.length <= 0) {
      createNotification("error", "Url zdjęcia jest wymagany!");
      return false;
    }
    return true;
  };

  const handleAddGame = () => {
    if (validateGameData()) {
      axios
          .post("addGame", JSON.stringify(gameData), {
            auth: {
              username: user.username,
              password: user.password
            }
          })
          .then((res) => res.data)
          .then((res) => {
            if (res !== null) {
              createNotification("info", "Gra została pomyślnie dodana");
            } else {
              createNotification("error", "Wystąpił błąd");
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };

  return (
    <div className="card-app">
      <div style={{ minWidth: "30vw" }}>
        <h3 style={{ textAlign: "center" }}>Dodaj grę</h3>
        <Form>
          <Form.Field>
            <label>Tytuł</label>
            <input placeholder="Tytuł" name="title" onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Gatunek</label>
            <Dropdown
                name="type"
                placeholder="Gatunek"
                fluid
                selection
                options={TYPES}
                defaultValue={TYPES[0].text}
                onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Platforma</label>
            <Dropdown
                name="platform"
                placeholder="Platforma"
                fluid
                selection
                options={PLATFORMS}
                defaultValue={PLATFORMS[0].text}
                onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Url Zdjęcia</label>
            <input
                placeholder="Url Zdjęcia"
                name="url"
                onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Data wydania</label>
            <DatePicker
              onChange={handleChangeDate}
              style={{ width: "100%" }}
              placeholder="Data wydania"
            />
          </Form.Field>
          <Button
            type="submit"
            color="green"
            onClick={handleAddGame}
            style={{ width: "100%" }}
          >
            Potwierdź dodanie
          </Button>
        </Form>
      </div>
      {/*  {location.state !== undefined ? <div style={{ minWidth: "30vw" }}>
        <h3 style={{ textAlign: "center" }}>Dodaj grę</h3>
        <Form>
          <Form.Field>
            <label>Tytuł</label>
            <input placeholder="Tytuł" name="title" onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Gatunek</label>
            <input placeholder="Gatunek" name="type" onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Platforma</label>
            <input
                placeholder="Platforma"
                name="platform"
                onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Data wydania</label>
            <DatePicker
                onChange={handleChangeDate}
                style={{ width: "100%" }}
                placeholder="Data wydania"
            />
          </Form.Field>
          <Button
              type="submit"
              color="green"
              onClick={handleAddGame}
              style={{ width: "100%" }}
          >
            Potwierdź dodanie
          </Button>
        </Form>
      </div> : <div>
        <Box>
       <h3 style={{color: '#a32626'}}>
        Odmowa dostępu
      </h3 >
          <Text>
            Aby uzyskać dostęp do tej funkcjonalności potrzebujesz uprawnień administratora.
          </Text>
        </Box>
      </div>}*/}
    </div>
  );
}

export default AddGame;
