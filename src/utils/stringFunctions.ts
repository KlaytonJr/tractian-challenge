import { Status } from "../dto/AssetDTO";

export function defineColor(status: Status | string) {
    switch(status) {
        case Status.inOperation:
        case Status.plannedStop:
            return "green";
        case Status.inDowntime:
            return "blue";
        case Status.inAlert:
        case Status.unplannedStop:
            return "red";
        default:
            return "grey";
    }
}

export function defineStatus(status: Status | string) {
    switch(status) {
        case Status.inOperation:
            return "Em operação";
        case Status.inDowntime:
            return "Inativo";
            case Status.inAlert:
            return "Em alerta";
        case Status.unplannedStop:
            return "Parada inesperada";
            case Status.plannedStop:
            return "Parada planejada";
        default:
            return "Status não definido";
    }
}