import React, {useContext, useState, useEffect} from "react";
import UserGameCard from "./UserGameCard";
import {Card, Icon} from "semantic-ui-react";
import {UserContext} from "../../helpers/UserContext";
import {createNotification} from "../../helpers/Notification";
import {AxiosClient} from "../../helpers/AuthenticationService";

function UserGames() {
    const [userGames, setUserGames] = useState([]);
    const {user} = useContext(UserContext);

    const handleDeleteGame = (newGames) => {
        setUserGames(newGames)
    }

    useEffect(() => {
        AxiosClient()
            .get(`getUserGames/${user.id}`)
            .then((res) => {
                if (res.status !== undefined && res.status === 200) {
                    setUserGames(res.data);
                }
            })
            .catch((err) => {
                if (err.response !== undefined) {
                    if(err.response.data.message !== undefined)
                        createNotification(err.response.data.message);
                    else
                        createNotification("Nie udało się pobrać gier użytkownika " + err.response.status);
                }
            });
    }, []);

    return (
        <div className="card-app">
            <h2 style={{textAlign: "center"}}>
                <Icon name="game"/> Moje gry
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
