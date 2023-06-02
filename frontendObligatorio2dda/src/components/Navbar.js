import React, { Component } from "react";
import {Link, Routes, Route} from "react-router-dom";
import AgregarCliente from "./Cliente/AgregarCliente";
import ListaClientes from "./Cliente/ListaClientes";
import Cliente from "./Cliente/Cliente";
import AgregarPlan from "./Plan/AgregarPlan";
import ListaPlanes from "./Plan/ListaPlanes";
import Plan from "./Plan/Plan";
import ListaPlanesCliente from "./PlanesCliente/ListaPlanesCliente";
import AgregarPlanCliente from "./PlanesCliente/PlanesCliente";
import ListaPlanesEliminados from "./Plan/ListaPlanesEliminados";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand" style={{marginLeft: "1%"}}>
            Obligatorio
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/clientes"} className="nav-link">
                Clientes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/planes"} className="nav-link">
                Planes
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={"#"} />
            <Route path="/clientes" element={<ListaClientes/>} />
            <Route path="/planes" element={<ListaPlanes/>} />
            <Route path="/planeseliminados" element={<ListaPlanesEliminados/>} />
            <Route path="/agregarcliente" element={<AgregarCliente/>} />
            <Route path="/agregarplan" element={<AgregarPlan/>} />
            <Route path="/clientes/:id" element={<Cliente />} />
            <Route path="/planes/:id" element={<Plan />} />
            <Route path="/planescliente/:id" element={<ListaPlanesCliente/>} />
            <Route path="/agregarplanescliente/:id" element={<AgregarPlanCliente/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;