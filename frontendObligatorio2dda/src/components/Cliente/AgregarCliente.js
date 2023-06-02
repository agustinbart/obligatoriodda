import React, { useState } from "react";
import ClienteDataService from "../../services/cliente.service";
import { useNavigate } from 'react-router-dom';

const AgregarCliente = () => {
    let navigate = useNavigate();

    const initialClienteState = {
        ci: "",
        apellido: "",
        email: "",
        nombre: "",
        tipo: ""
    };

    const [cliente, setCliente] = useState(initialClienteState);
    const [message, setMessage] = useState("");

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCliente({ ...cliente, [name]: value });
    };

    const saveCliente = () => {
        var data = {
            ci: cliente.ci,
            apellido: cliente.apellido,
            email: cliente.email,
            nombre: cliente.nombre,
            tipo: "Estandar"
        };

        if (data.ci.length < 8) {
            setMessage("Cédula no válida");
            return message;
        } else {
            ClienteDataService.create(data).then(response => {
                setCliente({
                    ci: response.data.ci,
                    apellido: response.data.apellido,
                    email: response.data.email,
                    nombre: response.data.nombre,
                    tipo: response.data.tipo
                });
                console.log(response.data);
                navigate("/clientes")
            })
                .catch(e => {
                    console.log(e.response.data);
                })
        }
    }

    return (
        <div className="submit-form">
            <div>
                <div className="form-group">
                    <label htmlFor="ci" style={{ marginTop: "0.5%" }}>Cédula</label>
                    <input
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        type="text"
                        className="form-control"
                        id="ci"
                        required
                        value={cliente.ci}
                        onChange={handleInputChange}
                        name="ci"
                        maxLength={8}
                    />

                    <label htmlFor="nombre" style={{ marginTop: "0.5%" }}>Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        required
                        value={cliente.nombre}
                        onChange={handleInputChange}
                        name="nombre"
                        maxLength={30}
                    />

                    <label htmlFor="apellido" style={{ marginTop: "0.5%" }}>Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        id="apellido"
                        required
                        value={cliente.apellido}
                        onChange={handleInputChange}
                        name="apellido"
                        maxLength={30}
                    />

                    <label htmlFor="email" style={{ marginTop: "0.5%" }}>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                        value={cliente.email}
                        onChange={handleInputChange}
                        name="email"
                        maxLength={30}
                    />

                </div>
                <p style={{ color: "red", marginTop: "1%" }}>{message}</p>
                <button onClick={saveCliente} className="btn btn-success">
                    Agregar
                </button>
            </div>
        </div>
    )
}

export default AgregarCliente;