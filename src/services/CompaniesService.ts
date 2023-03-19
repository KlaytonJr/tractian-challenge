/* eslint-disable import/no-anonymous-default-export */
import { CompanyDTO } from "../dto/CompanyDTO";
import { Get, Put } from "./BaseService";

export default {

    GetCompanies: () => {
        return Get<CompanyDTO[]>(`/companies`);
    },

    PutCompany: (data: CompanyDTO) => {
        return Put<CompanyDTO, CompanyDTO>(`/companies/${data.id}`, data);
    }
    
}