import React, {useState} from "react";
import {Form, Icon, Button, Dropdown} from "semantic-ui-react";
import "antd/dist/antd.css";
import { DatePicker } from "antd";
import {TYPES} from "../../helpers/GameType";
import {PLATFORMS} from "../../helpers/Platform";

function GameFilter(props) {

  const [gameData, setGameData] = useState({
    title: "",
    type: "",
    platform: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleTitleChange = (e) => {
    setGameData({
      ...gameData,
      title: e.target.value,
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

  const handleFilterClick = () => {
    props.handleFilter(gameData);
  }

  const handleClearClick = () => {
    props.handleClear();
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        <Icon name="filter" /> Filtruj
      </h2>

      <Button style={{ width: "100%", marginBottom: "15px", fontSize: "16px"  }} color="teal" onClick={handleFilterClick}>
        <Icon name="search" /> Szukaj gier
      </Button>

      <Button style={{ width: "100%", marginBottom: "15px", fontSize: "16px" }} color="red" onClick={handleClearClick}>
        <Icon name="delete" /> Wyczyść wszystkie pola
      </Button>

      <Form>
        <Form.Field>
          <label style={{fontSize: "14px"}}>Tytuł</label>
          <input placeholder="Tytuł" name="title" onChange={handleTitleChange} />
        </Form.Field>
        <Form.Field>
          <label style={{fontSize: "14px"}}>Gatunek</label>
          <Dropdown
              placeholder="Gatunek"
              clearable
              fluid
              selection
              options={TYPES}
              onChange={handleGameTypeChange}
          />
        </Form.Field>
        <Form.Field>
          <label style={{fontSize: "14px"}}>Platforma</label>
          <Dropdown
              placeholder="Platforma"
              clearable
              fluid
              selection
              options={PLATFORMS}
              onChange={handlePlatformChange}
          />
        </Form.Field>

        <Form.Field>
          <label style={{fontSize: "14px"}}>Data wydania od</label>
          <DatePicker
            onChange={handleChangeDateFrom}
            style={{ width: "100%" }}
            placeholder="Data wydania od"
          />
        </Form.Field>
        <Form.Field>
          <label style={{fontSize: "14px"}}>Data wydania do</label>
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
