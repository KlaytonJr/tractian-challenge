import React from "react";
import "./App.css";
import ListAssets from "./components/ListAssets";
import { AssetDTO } from "./interfaces/AssetDTO";


function App() {
  const data: AssetDTO[] = Array.from({ length: 23 }).map((_, i) => ({
    assignedUserIds: [
        1,
        2,
        3
      ],
      companyId: 1,
      healthHistory: [
        {
          status: "inOperation",
          timestamp: new Date("2022-12-01T00:00:00.000Z")
        },
        {
          status: "inDowntime",
          timestamp: new Date("2022-12-08T00:00:00.000Z")
        },
        {
            status: "inOperation",
            timestamp: new Date("2022-12-15T00:00:00.000Z")
          },
          {
            status: "inAlert",
            timestamp: new Date("2022-12-22T00:00:00.000Z")
          },
          {
            status: "unplannedStop",
            timestamp: new Date("2022-12-29T00:00:00.000Z")
          }
      ],
      healthscore: 70,
      id: 1,
      image: "https://tractian-img.s3.amazonaws.com/6d5028682016cb43d02b857d4f1384ae.jpeg",
      metrics: {
        lastUptimeAt: new Date("2023-01-01T16:17:50.180Z"),
        totalCollectsUptime: 7516,
        totalUptime: 1419.620084999977
      },
      model: "motor",
      name: "Motor H13D-1",
      sensors: [
        "GSJ1535"
      ],
      specifications: {
        maxTemp: 80
      },
      status: "inAlert",
      unitId: 1
  }));

  return (
    <div className="App">
        <ListAssets data={data} />
    </div>
  );
}

export default App;
