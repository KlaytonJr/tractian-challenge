import React, { useEffect, useState } from "react";
import ListUsers from "../../components/ListUsers";
import { UserDTO } from "../../dto/UserDTO";
import UsersService from "../../services/UsersService";
import "./style.css";


function Users() {
    const [users, setUsers] = useState<UserDTO[]>([]);

    async function getUsers() {
        const response = await UsersService.GetUsers()
        console.log(response);
        if(response) setUsers(response);
    }

    useEffect(() => {
        getUsers();
    }, []);

  return (
    <div className="Users">
        <ListUsers className="user" title="Usuários" data={users} resetGet={() => getUsers()} />
    </div>
  );
}

export default Users;
