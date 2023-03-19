export interface WorkorderDTO {
    id: number;
    assetId: number;
    assignedUserIds: number[];
    checklist: Checklist[]; 
    title: string;
    description: string;
    priority: string;
    status: string;
}

interface Checklist {
    completed: boolean;
    task: string;
}