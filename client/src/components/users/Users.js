import React, {useContext} from "react";
import {Table, Icon} from "semantic-ui-react";
import UserItem from "./UserItem";
import axios from "axios";
import {createNotification} from "../../helpers/Notification";
import { UserContext } from "../helpers/UserContext";

const { user } = useContext(UserContext);

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


    handleEditUser = (newUsers) => {
        this.setState({users : newUsers})
    }

    getUsers = () => {
        axios
            .get("getUsers",  {
                auth: {
                    username: user.login,
                    password: user.password
                }
            })
            .then((res) => {
                if (res.status !== undefined && res.status === 200) {
                    const fetchedUsers = JSON.parse(res.data);
                    console.log(fetchedUsers);
                    this.setState({users: fetchedUsers.users});
                }
            })
            .catch((err) => {
                console.log(err)

                if (err.response !== undefined)
                    createNotification("error", err.response.data);
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
