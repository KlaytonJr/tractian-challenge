export interface AssetDTO {
    assignedUserIds: number[],
    companyId: number,
    healthHistory: healthHistoryItem[],
    healthscore: number,
    id: number
    image: string,
    metrics: {
        lastUptimeAt: Date,
        totalCollectsUptime: number,
        totalUptime: number
    },
    model: string,
    name: string,
    sensors: string[],
    specifications: {
        maxTemp: number
    },
    status: Status | string,
    unitId: number
}

interface healthHistoryItem {
    status: Status | string,
    timestamp: Date
}

export enum Status {
    inOperation = "inOperation",
    inDowntime = "inDowntime",
    inAlert = "inAlert",
    unplannedStop = "unplannedStop",
    plannedStop = "plannedStop",
}