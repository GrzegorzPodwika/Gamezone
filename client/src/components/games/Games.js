import React from "react";
import "../Style.css";
import GameFilter from "./GameFilter";
import {Card, Icon} from "semantic-ui-react";
import GameCard from "./GameCard";
import {createNotification} from "../../helpers/Notification";
import {AxiosClient} from "../../helpers/AuthenticationService";

class Games extends React.Component {

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
        AxiosClient()
            .get("getAllGames")
            .then((res) => {
                if (res.status !== undefined && res.status === 200) {
                    this.setState({games: res.data});
                }
            })
            .catch((err) => {
                console.log(err)

                if (err.response !== undefined)
                    createNotification("error", err.response.status);
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
