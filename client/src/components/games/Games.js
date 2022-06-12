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
            games: [],
            originalGames: []
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
                    this.setState({originalGames: res.data});
                    this.setState({games: res.data});
                }
            })
            .catch((err) => {
                if (err.response !== undefined) {
                    if(err.response.data.message !== undefined)
                        createNotification(err.response.data.message);
                    else
                        createNotification("Nie udało się pobrać biblioteki gier " + err.response.status);
                }
            });
    }

    handleFilterClick = (filterParams) => {
        const filteredGames = this.state.originalGames.filter(game => {
            let filterValue = true;

            if (filterParams.title !== undefined && filterParams.title.length !== 0) {
                filterValue = filterValue && game.title.toLowerCase().includes(filterParams.title.toLowerCase())
            }
            if(filterParams.type !== undefined && filterParams.type.length !== 0) {
                filterValue = filterValue && game.type.toLowerCase().includes(filterParams.type.toLowerCase());
            }
            if(filterParams.platform !== undefined && filterParams.platform.length !== 0) {
                filterValue = filterValue && game.platform.toLowerCase().includes(filterParams.platform.toLowerCase());
            }
            if(filterParams.dateFrom !== undefined && filterParams.dateFrom.length !== 0) {
                filterValue = filterValue && Date.parse(game.date) >= Date.parse(filterParams.dateFrom)
            }
            if(filterParams.dateTo !== undefined && filterParams.dateTo.length !== 0) {
                filterValue = filterValue && Date.parse(game.date) <= Date.parse(filterParams.dateTo)
            }

            return filterValue;
        });

        this.setState({games: filteredGames});
    }


    handleDeleteGame = (updatedGames) => {
        this.setState({originalGames: updatedGames});
        this.setState({games: updatedGames});
    }

    handleEditGame = (updatedGames) => {
        this.setState({originalGames: updatedGames});
        this.setState({games: updatedGames});
    }

    render() {
        return (
            <div className="container-games">
                <div className="filter-wrap-games">
                    <GameFilter handleFilter={this.handleFilterClick}/>
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
