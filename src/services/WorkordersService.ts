/* eslint-disable import/no-anonymous-default-export */
import { WorkorderDTO } from "../dto/WorkorderDTO";
import { Get, Put } from "./BaseService";

export default {

    GetWorkorders: () => {
        return Get<WorkorderDTO[]>(`/workorders`);
    },

    PutWorkorder: (data: WorkorderDTO) => {
        return Put<WorkorderDTO, WorkorderDTO>(`/workorders/${data.id}`, data);
    }
    
}