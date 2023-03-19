import { useEffect, useState } from "react";
import ListWorkorders from "../../components/ListWorkorders";
import { WorkorderDTO } from "../../dto/WorkorderDTO";
import WorkordersService from "../../services/WorkordersService";
import "./style.css";


function Workorders() {
    const [workorders, setWorkorders] = useState<WorkorderDTO[]>([]);

    async function getWorkorders() {
        const response = await WorkordersService.GetWorkorders()
        console.log(response);
        if(response) setWorkorders(response);
    }

    useEffect(() => {
        getWorkorders();
    }, []);

  return (
    <div className="Workorders">
        <ListWorkorders className="workorder" title="Ordens de trabalho" data={workorders} resetGet={() => getWorkorders()} />
    </div>
  );
}

export default Workorders;
