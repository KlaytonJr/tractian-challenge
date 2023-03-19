import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import Companies from "../pages/Companies";

import Home from "../pages/Home";
import Units from "../pages/Units";
import Users from "../pages/Users";
import Workorders from "../pages/Workorders";

const RoutesView = () => {
   return(
       <BrowserRouter>
           <Header  className="header" />
            <Routes>
                <Route element={<Home />}  path="/" />
                <Route element={<Companies />}  path="/companies" />
                <Route element={<Units />}  path="/units" />
                <Route element={<Users />}  path="/users" />
                <Route element={<Workorders />}  path="/workorders" />
            </Routes>
       </BrowserRouter>
   )
}

export default RoutesView;