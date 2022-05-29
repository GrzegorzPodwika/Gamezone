import React, {useState} from "react";
import {Table, Modal, Button, Header, Icon} from "semantic-ui-react";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import UserDetails from "./UserDetails";
import {createNotification} from "../../helpers/Notification";
import {AxiosClient} from "../../helpers/AuthenticationService";

function UserItem(props) {
    const [openModal, setOpenModal] = useState(false);
    const [userData, setUserData] = useState(props.user);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeRole = (e, data) => {
        setUserData({
            ...userData,
            role: data.value,
        });
    };


    const deleteUser = () => {
        AxiosClient()
            .post("deleteUser", {
                id: props.user.id,
            })
            .then((res) => {
                if (res.status !== undefined && res.status === 200) {
                    props.handleDeleteUser(res.data.users);
                    createNotification("info", "Usunięto użytkowika");
                }
            })
            .catch((err) => {
                if (err.response !== undefined)
                    createNotification("error", err.response.data);
            });
    };

    const editUser = () => {
        AxiosClient()
            .post("editUser", {
                id: userData.id,
                username: userData.username,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                password: userData.password,
                games: userData.games,
                role: userData.role,
            })
            .then((res) => {
                if (res.status !== undefined && res.status === 200) {
                    props.handleEditUser(res.data.users);
                    createNotification("info", "Pomyślnie edytowano użytkownika");
                    setOpenModal(false);
                }
            })
            .catch((err) => {
                if (err.response !== undefined)
                    createNotification("error", err.response.data);
            });

    }

    return (
        <Table.Row>
            <Table.Cell>{props.user.id}</Table.Cell>
            <Table.Cell>{props.user.username}</Table.Cell>
            <Table.Cell>{props.user.email}</Table.Cell>
            <Table.Cell>{props.user.firstName}</Table.Cell>
            <Table.Cell>{props.user.lastName}</Table.Cell>
            <Table.Cell>{props.user.phone}</Table.Cell>
            <Table.Cell>
                <Modal
                    style={{
                        height: "auto",
                        width: "auto",
                        left: "auto",
                        bottom: "auto",
                        right: "auto",
                        top: "auto",
                    }}
                    closeIcon
                    open={openModal}
                    trigger={
                        <AiFillEdit
                            style={{
                                position: "relative",
                                bottom: "2px",
                                color: "green",
                                cursor: "pointer",
                            }}
                        />
                    }
                    onClose={() => setOpenModal(false)}
                    onOpen={() => setOpenModal(true)}>

                    <Header icon="user" content="Edycja użytkownika"/>
                    <Modal.Content>
                        <UserDetails user={userData} handleChange={handleChange} handleChangeRole={handleChangeRole}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="red" onClick={() => setOpenModal(false)}>
                            <Icon name="remove"/> Odrzuć zmiany
                        </Button>
                        <Button color="green" onClick={editUser}>
                            <Icon name="checkmark"/> Zatwierdź zmiany
                        </Button>
                    </Modal.Actions>
                </Modal>{" "}
                Edytuj{" "}
                <AiFillDelete
                    style={{
                        position: "relative",
                        bottom: "2px",
                        color: "red",
                        cursor: "pointer",
                    }}
                    onClick={deleteUser}
                />{" "}
                Usuń
            </Table.Cell>
        </Table.Row>
    );
}

export default UserItem;
