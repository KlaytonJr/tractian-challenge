/* eslint-disable import/no-anonymous-default-export */
import { UnitDTO } from "../dto/UnitDTO";
import { Get, Put } from "./BaseService";

export default {

    GetUnits: () => {
        return Get<UnitDTO[]>(`/units`);
    },

    PutUnit: (data: UnitDTO) => {
        return Put<UnitDTO, UnitDTO>(`/units/${data.id}`, data);
    }
    
}