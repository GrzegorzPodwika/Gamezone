import React, {useContext, useState} from "react";
import { Form, Icon, Button } from "semantic-ui-react";
import { createNotification } from "../../helpers/Notification";
import "antd/dist/antd.css";
import { DatePicker } from "antd";
import axios from "axios";
import {UserContext} from "../../helpers/UserContext";

function GameFilter(props) {
  const { user } = useContext(UserContext);

  const [gameData, setGameData] = useState({
    title: "",
    type: "",
    platform: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleChange = (e) => {
    setGameData({
      ...gameData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeDateFrom = (date, dateString) => {
    setGameData({
      ...gameData,
      dateFrom: dateString,
    });
  };

  const handleChangeDateTo = (date, dateString) => {
    setGameData({
      ...gameData,
      dateTo: dateString,
    });
  };

  //TODO handle filterGames  response
  // null something went wrong
  // undefined/emptyArray if no game matches filter params
  // filteredArray when success

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
    }
    return true;
  };

  const handleFilter = () => {
    axios
        .post("filterGames", {
          title: gameData.title,
          type: gameData.type,
          platform: gameData.platform,
          dateFrom: gameData.dateFrom,
          dateTo: gameData.dateTo
        }, {
          auth: {
            username: user.username,
            password: user.password
          }
        })
        .then((res) => {
          if (res.status !== undefined && res.status === 200) {
            props.handleFilteredGames(res.data);
          }
        })
        .catch((err) => {
          if (err.response !== undefined)
            createNotification("error", err.response.data);
        })
  }

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>
        <Icon name="filter" /> Filtuj
      </h3>
      <Button style={{ width: "100%", marginBottom: "15px" }} color="teal" onClick={handleFilter}>
        <Icon name="search" /> Szukaj gier
      </Button>
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
          <label>Data wydania od</label>
          <DatePicker
            onChange={handleChangeDateFrom}
            style={{ width: "100%" }}
            placeholder="Data wydania od"
          />
        </Form.Field>
        <Form.Field>
          <label>Data wydania do</label>
          <DatePicker
            onChange={handleChangeDateTo}
            style={{ width: "100%" }}
            placeholder="Data wydania do"
          />
        </Form.Field>
      </Form>
    </div>
  );
}

export default GameFilter;
