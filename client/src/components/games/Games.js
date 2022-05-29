import React from "react";
import "../Style.css";
import GameFilter from "./GameFilter";
import {Card, Icon, Table} from "semantic-ui-react";
import GameCard from "./GameCard";
import axios from "axios";
import {createNotification} from "../../helpers/Notification";

class Games extends React.Component {
    //location = useLocation();

    constructor(props) {
        super(props);
        this.state = {
            games: []
        }
    }

    componentDidMount() {
        this.getAllGames();
    }

    getAllGames = () => {
        axios
            .get("getAllGames")
            .then((res) => {
                console.log("getAllGames typeof " + (typeof res.data));

                if (res.status !== undefined && res.status === 200) {
                    const fetchedGames = JSON.parse(res.data);
                    console.log("fetchedGames " + fetchedGames);
                    this.setState({games: fetchedGames.games});
                }
            })
            .catch((err) => {
                console.log(err)

                if (err.response !== undefined)
                    createNotification("error", err.response.data);
            });
    }

    handleFilteredGames = (filteredGames) => {
        this.setState({games: filteredGames});
    }

    handleDeleteGame = (updatedGames) => {
        this.setState({games: updatedGames});
    }

    handleEditGame = (newGames) => {
        this.setState({games: newGames});
    }

    render() {
        return (
            <div className="contener-games">
                <div className="filter-wrap-games">
                    <GameFilter handleFilteredGames={this.handleFilteredGames}/>
                </div>
                <div className="items-wrap-games">
                    <div>
                        <h2 style={{textAlign: "center"}}>
                            <Icon name="game"/> Dostępne gry
                        </h2>
                        <Card.Group centered={true}>
                            {this.state.games.map((item, index) => (
                                <GameCard game={item} key={index} handleDeleteGame={this.handleDeleteGame} handleEditGame={this.handleEditGame}/>
                            ))}
                        </Card.Group>
                    </div>
                </div>
            </div>
        );
    }
}

export default Games;
