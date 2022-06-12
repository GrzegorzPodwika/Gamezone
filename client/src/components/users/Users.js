import React from "react";
import {Table, Icon} from "semantic-ui-react";
import UserItem from "./UserItem";
import axios from "axios";
import {createNotification} from "../../helpers/Notification";
import {AxiosClient} from "../../helpers/AuthenticationService";

class Users extends React.Component {

    constructor() {
        super();
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    handleDeleteUser = (newUsers) => {
       this.setState({users : newUsers})
    }


    handleEditUser = (updatedUser) => {
        this.getUsers()
    }

    getUsers = () => {
        AxiosClient()
            .get("getUsers")
            .then((res) => {
                if (res.status !== undefined && res.status === 200) {
                    this.setState({users: res.data});
                }
            })
            .catch((err) => {
                if (err.response !== undefined) {
                    if(err.response.data.message !== undefined)
                        createNotification(err.response.data.message);
                    else
                        createNotification("Nie udało się pobrać listy użytkowników " + err.response.status);
                }
            });
    }

    render() {
        return (
            <div className="card-app" style={{fontSize: "17px", width: "100%"}}>
                <h2 style={{textAlign: "center"}}>
                    <Icon name="users"/> Baza użytkowników
                </h2>
                <Table singleLine>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Login</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Imię</Table.HeaderCell>
                                <Table.HeaderCell>Nazwisko</Table.HeaderCell>
                                <Table.HeaderCell>Telefon</Table.HeaderCell>
                                <Table.HeaderCell>Akcja</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.state.users.map((item) => {
                                return (<UserItem key={item.id} user={item} handleDeleteUser={this.handleDeleteUser} handleEditUser={this.handleEditUser}/>);
                                })
                            }
                        </Table.Body>
                    </Table>
            </div>
        );
    }
}

export default Users;
