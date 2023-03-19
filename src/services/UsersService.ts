/* eslint-disable import/no-anonymous-default-export */
import { UserDTO } from "../dto/UserDTO";
import { Get, Put } from "./BaseService";

export default {

    GetUsers: () => {
        return Get<UserDTO[]>(`/users`);
    },

    PutUser: (data: UserDTO) => {
        return Put<UserDTO, UserDTO>(`/users/${data.id}`, data);
    }
    
}