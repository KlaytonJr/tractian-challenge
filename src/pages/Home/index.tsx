import React, { useEffect, useState } from "react";
import ListAssets from "../../components/ListAssets";
import ListUnits from "../../components/ListUnits";
import ListUsers from "../../components/ListUsers";
import ListCompanies from "../../components/ListCompanies";
import { AssetDTO } from "../../dto/AssetDTO";
import AssetsService from "../../services/AssetsService";
import CompaniesService from "../../services/CompaniesService";
import UnitsService from "../../services/UnitsService";
import UsersService from "../../services/UsersService";
import "./style.css";
import { UnitDTO } from "../../dto/UnitDTO";
import { UserDTO } from "../../dto/UserDTO";
import { CompanyDTO } from "../../dto/CompanyDTO";


function Home() {

    const [assets, setAssets] = useState<AssetDTO[]>([]);
    const [units, setUnits] = useState<UnitDTO[]>([]);
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [companies, setCompanies] = useState<CompanyDTO[]>([]);

    // const data: AssetDTO[] = Array.from({ length: 23 }).map((_, i) => ({
    //     assignedUserIds: [
    //         1,
    //         2,
    //         3
    //       ],
    //       companyId: 1,
    //       healthHistory: [
    //         {
    //           status: "inOperation",
    //           timestamp: new Date("2022-12-01T00:00:00.000Z")
    //         },
    //         {
    //           status: "inDowntime",
    //           timestamp: new Date("2022-12-08T00:00:00.000Z")
    //         },
    //         {
    //             status: "inOperation",
    //             timestamp: new Date("2022-12-15T00:00:00.000Z")
    //           },
    //           {
    //             status: "inAlert",
    //             timestamp: new Date("2022-12-22T00:00:00.000Z")
    //           },
    //           {
    //             status: "unplannedStop",
    //             timestamp: new Date("2022-12-29T00:00:00.000Z")
    //           }
    //       ],
    //       healthscore: 70,
    //       id: 1,
    //       image: "https://tractian-img.s3.amazonaws.com/6d5028682016cb43d02b857d4f1384ae.jpeg",
    //       metrics: {
    //         lastUptimeAt: new Date("2023-01-01T16:17:50.180Z"),
    //         totalCollectsUptime: 7516,
    //         totalUptime: 1419.620084999977
    //       },
    //       model: "motor",
    //       name: "Motor H13D-1",
    //       sensors: [
    //         "GSJ1535"
    //       ],
    //       specifications: {
    //         maxTemp: 80
    //       },
    //       status: "inAlert",
    //       unitId: 1
    //   }));

    async function getAssets() {
        const response = await AssetsService.GetAssets()
        console.log(response);
        if(response) setAssets(response);
    }

    async function getCompanies() {
        const response = await CompaniesService.GetCompanies()
        console.log(response);
        if(response) setCompanies(response);
    }

    async function getUnits() {
        const response = await UnitsService.GetUnits()
        console.log(response);
        if(response) setUnits(response);
    }

    async function getUsers() {
        const response = await UsersService.GetUsers()
        console.log(response);
        if(response) setUsers(response);
    }

    useEffect(() => {
        getAssets();
        getCompanies();
        getUnits();
        getUsers();
    }, []);
      
  return (
    <div className="Home">
        <div className="principal-content">
            <ListAssets className="assets-list" data={assets} resetGet={() => getAssets()} />
        </div>
        <div className="secondary-content">
            <ListUsers className="user" title="Usuários" data={users} resetGet={() => getUsers()} />
            <ListCompanies className="companies" title="Empresas" data={companies} resetGet={() => getCompanies()} />
            <ListUnits className="unit" title="Unidades" data={units} resetGet={() => getUnits()} />
        </div>
    </div>
  );
}

export default Home;
