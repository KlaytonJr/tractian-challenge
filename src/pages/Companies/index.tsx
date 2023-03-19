import React, { useEffect, useState } from "react";
import ListCompanies from "../../components/ListCompanies";
import { CompanyDTO } from "../../dto/CompanyDTO";
import CompaniesService from "../../services/CompaniesService";
import "./style.css";


function Companies() {
    const [companies, setCompanies] = useState<CompanyDTO[]>([]);

    async function getCompanies() {
        const response = await CompaniesService.GetCompanies()
        console.log(response);
        if(response) setCompanies(response);
    }

    useEffect(() => {
        getCompanies();
    }, []);

  return (
    <div className="Companies">
        <ListCompanies className="companies" title="Empresas" data={companies} resetGet={getCompanies} />
    </div>
  );
}

export default Companies;
