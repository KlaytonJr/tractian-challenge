import React, { useEffect, useState } from "react";
import ListUnits from "../../components/ListUnits";
import { UnitDTO } from "../../dto/UnitDTO";
import UnitsService from "../../services/UnitsService";
import "./style.css";


function Units() {
    const [units, setUnits] = useState<UnitDTO[]>([]);

    async function getUnits() {
        const response = await UnitsService.GetUnits()
        console.log(response);
        if(response) setUnits(response);
    }

    useEffect(() => {
        getUnits();
    }, []);

  return (
    <div className="Units">
        <ListUnits className="unit" title="Unidades" data={units} resetGet={() => getUnits()} />
    </div>
  );
}

export default Units;
