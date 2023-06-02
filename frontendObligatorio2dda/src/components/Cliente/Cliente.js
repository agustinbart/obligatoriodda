import React, { useState, useEffect } from "react";
import ClienteDataService from "../../services/cliente.service";
import { useParams, useNavigate } from 'react-router-dom';

const Cliente = props => {
    const { id } = useParams();
    let navigate = useNavigate();

    const initialClienteState = {
        ci: "",
        nombre: "",
        apellido: "",
        email: "",
        tipo: ""
    };

    const [currentCliente, setCurrentCliente] = useState(initialClienteState);
    const [message, setMessage] = useState("");

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

    useEffect(() => {
        if (id)
            getCliente(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentCliente({ ...currentCliente, [name]: value });
    };

    const updateCliente = () => {
        ClienteDataService.update(
            currentCliente.ci,
            currentCliente
        )
            .then(response => {
                console.log(response.data);
                setMessage("Cliente modificado con éxito");
                navigate("/clientes");
            }).catch(e => {
                console.log(e);
            })
    }

    return (
        <div>
            {currentCliente ? (
                <div className="edit-form">
                    <h4>Cliente</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="ci" style={{ marginTop: "0.5%" }}><strong>Cédula</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                id="ci"
                                name="ci"
                                placeholder="ci"
                                value={currentCliente.ci}
                                onChange={handleInputChange}
                                disabled
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nombre" style={{ marginTop: "0.5%" }}><strong>Nombre</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                name="nombre"
                                placeholder="nombre"
                                value={currentCliente.nombre}
                                onChange={handleInputChange}
                                maxLength={30}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="apellido" style={{ marginTop: "0.5%" }}><strong>Apellido</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                id="apellido"
                                name="apellido"
                                placeholder="apellido"
                                value={currentCliente.apellido}
                                onChange={handleInputChange}
                                maxLength={30}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" style={{ marginTop: "0.5%" }}><strong>Email</strong></label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="email"
                                value={currentCliente.email}
                                onChange={handleInputChange}
                                maxLength={30}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="tipo" style={{ marginTop: "0.5%" }}><strong>Tipo</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                id="tipo"
                                name="tipo"
                                placeholder="tipo"
                                value={currentCliente.tipo}
                                onChange={handleInputChange}
                                disabled
                            />
                        </div>
                    </form>

                    <br></br>
                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={updateCliente}>
                        Modificar
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br></br>
                    <p>Haga click en un cliente</p>
                </div>
            )}
        </div>
    )
}

export default Cliente;