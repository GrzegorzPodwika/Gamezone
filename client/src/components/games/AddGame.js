import React, {useContext, useState} from "react";
import {Button, Dropdown, Form} from "semantic-ui-react";
import {createNotification} from "../../helpers/Notification";
import "antd/dist/antd.css";
import {DatePicker} from "antd";
import {TYPES} from "../../helpers/GameType";
import {PLATFORMS} from "../../helpers/Platform";
import {AxiosClient} from "../../helpers/AuthenticationService";

function AddGame() {

    const [gameData, setGameData] = useState({
        title: "",
        type: TYPES[0].text,
        platform: PLATFORMS[0].text,
        url: "",
        date: "",
    });

    const handleChange = (e) => {
        setGameData({
            ...gameData,
            [e.target.name]: e.target.value,
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
            AxiosClient()
                .post("addGame", JSON.stringify(gameData), {})
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
                    createNotification("error", "Error " + err);
                });
        }
    };

    return (
        <div className="card-app">
            <div style={{minWidth: "30vw"}}>
                <h3 style={{textAlign: "center"}}>Dodaj grę</h3>
                <Form>
                    <Form.Field>
                        <label>Tytuł</label>
                        <input placeholder="Tytuł" name="title" onChange={handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Gatunek</label>
                        <Dropdown
                            placeholder="Gatunek"
                            fluid
                            selection
                            options={TYPES}
                            onChange={handleGameTypeChange}
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
                            style={{width: "100%"}}
                            placeholder="Data wydania"
                        />
                    </Form.Field>
                    <Button
                        type="submit"
                        color="green"
                        onClick={handleAddGame}
                        style={{width: "100%"}}
                    >
                        Potwierdź dodanie
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default AddGame;
