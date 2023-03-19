/* eslint-disable import/no-anonymous-default-export */
import { AssetDTO } from "../dto/AssetDTO";
import { Get, Put } from "./BaseService";

export default {

    GetAssets: () => {
        return Get<AssetDTO[]>(`/assets`);
    },

    PutAsset: (data: AssetDTO) => {
        return Put<AssetDTO, AssetDTO>(`/assets/${data.id}`, data);
    }
    
}