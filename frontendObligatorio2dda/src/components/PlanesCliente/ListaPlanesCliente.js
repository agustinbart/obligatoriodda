import React, { useState, useEffect } from "react";
import PlanesClienteDataService from "../../services/planescliente.service";
import PlanDataService from "../../services/plan.service"
import ClienteDataService from "../../services/cliente.service"
import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';

const ListaPlanes = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const initialClienteState = {
        ci: "",
        nombre: "",
        apellido: "",
        email: "",
        tipo: ""
    };

    const [planes, setPlanes] = useState([]);
    const [planesFiltrados, setPlanesFiltrados] = useState([]);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchPlan, setSearchPlan] = useState("");
    const [currentCliente, setCurrentCliente] = useState(initialClienteState);
    const [fecha, setFecha] = useState("");

    useEffect(() => {
        getCliente(id);
        retrievePlanes();
    }, []);

    const getCliente = id => {
        ClienteDataService.get(id)
            .then(response => {
                setCurrentCliente(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrievePlanes = () => {
        PlanesClienteDataService.get(id).then(response => {
            setPlanes(response.data);
            setPlanesFiltrados(response.data);
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    };

    const setActivePlan = (plan, index) => {
        setCurrentPlan(plan);
        setCurrentIndex(index);
    }

    const buscarPlan = (e) => {
        if (e.target.value === "") {
            try {
                PlanesClienteDataService.get(id).then(response => {
                    setPlanes(response.data)
                });
            } catch (e) {
                console.log(e);
            }
        }
        const searchResult = planes.filter(plan => plan.destino.toLowerCase().includes(e.target.value.toLowerCase()))
        setSearchPlan(e.target.value);
        setPlanes(searchResult);
    }

    const deletePlanCliente = () => {
        var data = {
            id: currentPlan.id
        };

        PlanesClienteDataService.delete(id, data)
            .then(response => {
                console.log(response.data);
                window.location.reload();
            }).catch(e => {
                console.log(e);
            })
        navigate("/planescliente/" + id);
        window.location.reload();
    }

    const changeFecha = e => {
        setFecha(e.target.value);
    };

    const buscarFecha = () => {
        planesFiltrados.sort(((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()));
        setPlanesFiltrados(planes.filter(plan => plan.fecha > fecha));
        setCurrentPlan(planesFiltrados[0]);
        setCurrentIndex(-1);
    }

    const verificarClientePremium = () => {
        if (planes.length >= 3) {
            ClienteDataService.updateClienteToPremium(
                currentCliente
            )
                .then(response => {
                    console.log(response.data);
                }).catch(e => {
                    console.log(e);
                })
        } else if (planes.length < 3) {
            ClienteDataService.updateClienteToEstandar(
                currentCliente
            )
                .then(response => {
                    console.log(response.data);
                }).catch(e => {
                    console.log(e);
                })
        }
    }

    window.onbeforeunload = function () {
        verificarClientePremium(currentCliente);
    };

    const reloadPage = () => {
        window.location.reload();
    }

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por destino"
                        value={searchPlan}
                        onChange={buscarPlan}
                    />
                </div>
            </div>
            <div className="col-md-6">
                <h4>Lista de planes de {currentCliente.nombre} {currentCliente.apellido}</h4>
                <Link to={"/agregarplanescliente/" + id} className="btn btn-success" style={{ marginTop: "1%", marginBottom: "1%" }}>
                    Agregar nuevo
                </Link>


                <button className="btn btn-secondary" style={{ marginLeft: "2%" }} onClick={reloadPage}>
                    Actualizar cliente
                </button>

                <h5>Primer viaje después de:</h5>

                <div className="input-group mb-3">
                    <input
                        type="date"
                        className="form-control"
                        id="fecha"
                        required
                        value={fecha}
                        onChange={changeFecha}
                        name="fecha"
                    />

                    <div className="input-group-append">
                        <button onClick={buscarFecha} className="btn btn-outline-dark">
                            Buscar
                        </button>
                    </div>
                </div>

                <div>
                    {planes.length == 0 ? <p style={{ fontSize: "1.5rem" }}>No hay planes</p> : <p></p>}
                </div>

                {currentCliente.tipo == "Estandar" ? (
                    <ul className="list-group">
                        {planes && planes.map((plan, index) => (
                            <li
                                className={
                                    "list-group-item" +
                                    (index === currentIndex ? " active" : "")
                                }
                                onClick={() => setActivePlan(plan, index)}
                                key={index}
                                style={{ cursor: "pointer" }}>
                                {plan.destino} <strong>U$S</strong>{plan.precio}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ul className="list-group">
                        {planes && planes.map((plan, index) => (
                            <li
                                className={
                                    "list-group-item" +
                                    (index === currentIndex ? " active" : "")
                                }
                                onClick={() => setActivePlan(plan, index)}
                                key={index}
                                style={{ cursor: "pointer" }}>
                                {plan.destino} <strong>U$S</strong>{plan.precio * 0.80} <strong>-20%</strong>
                            </li>
                        ))}
                    </ul>)}
            </div>
            {currentCliente.tipo == "Estandar" ? (
                <div className="col-md-6">
                    {currentPlan ? (
                        <div style={{ border: '1px solid #C7C8C9', padding: '5px', borderRadius: '1%' }}>
                            <h4 style={{ margin: "1%" }}>{currentPlan.destino}</h4>
                            <div style={{ margin: "1%" }}>
                                <label>
                                    <strong>Modalidad:</strong>
                                </label>{" "}
                                {currentPlan.modalidad}
                            </div>
                            <div style={{ margin: "1%" }}>
                                <label>
                                    <strong>Fecha:</strong>
                                </label>{" "}
                                {currentPlan.fecha}
                            </div>
                            <div style={{ margin: "1%" }}>
                                <label>
                                    <strong>Precio:</strong>
                                </label>{" "}
                                U$S{currentPlan.precio}
                            </div>

                            <button
                                className="btn btn-danger"
                                onClick={deletePlanCliente}
                                style={{ margin: "1%" }}>
                                Borrar
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h4>Seleccione un plan</h4>
                        </div>
                    )}
                </div>
            ) : (
                <div className="col-md-6">
                    {currentPlan ? (
                        <div style={{ border: '1px solid #C7C8C9', padding: '5px', borderRadius: '1%' }}>
                            <h4 style={{ margin: "1%" }}>{currentPlan.destino}</h4>
                            <div style={{ margin: "1%" }}>
                                <label>
                                    <strong>Modalidad:</strong>
                                </label>{" "}
                                {currentPlan.modalidad}
                            </div>
                            <div style={{ margin: "1%" }}>
                                <label>
                                    <strong>Fecha:</strong>
                                </label>{" "}
                                {currentPlan.fecha}
                            </div>
                            <div style={{ margin: "1%" }}>
                                <label>
                                    <strong>Precio:</strong>
                                </label>{" "}U$S{currentPlan.precio * 0.80} <strong>-20%</strong>
                            </div>

                            <button
                                className="btn btn-danger"
                                onClick={deletePlanCliente}
                                style={{ margin: "1%" }}>
                                Borrar
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h4>Seleccione un plan</h4>
                        </div>
                    )}
                </div>)}
        </div>
    );
}

export default ListaPlanes;