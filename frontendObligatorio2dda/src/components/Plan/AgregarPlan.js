import React, { useState } from "react";
import PlanDataService from "../../services/plan.service";
import { useNavigate } from 'react-router-dom';

const AgregarPlan = () => {
    let navigate = useNavigate();

    const initialPlanState = {
        id: "",
        destino: "",
        fecha: "",
        modalidad: "",
        precio: "",
        eliminado: "No"
    };

    const [plan, setPlan] = useState(initialPlanState);
    const [message, setMessage] = useState("");

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPlan({ ...plan, [name]: value });
    };

    const savePlan = () => {
        var data = {
            destino: plan.destino,
            fecha: plan.fecha,
            modalidad: plan.modalidad,
            precio: plan.precio,
            eliminado: plan.eliminado
        };

        if (data.modalidad === "Aérea" || data.modalidad === "Marítima" || data.modalidad === "Terrestre") {
            PlanDataService.create(data).then(response => {
                setPlan({
                    destino: response.data.destino,
                    fecha: response.data.fecha,
                    modalidad: response.data.modalidad,
                    precio: response.data.precio,
                    eliminado: response.data.eliminado
                });
                console.log(response.data);
                navigate("/planes")
            })
                .catch(e => {
                    console.log(e.response.data);
                })
        } else {
            setMessage("Modalidad no válida, solo se permite 'Marítima', 'Terrestre' o 'Aérea'")
            return message;
        }
    }

    return (
        <div className="submit-form">
            <div>
                <div className="form-group">
                    <label htmlFor="destino" style={{ marginTop: "0.5%" }}>Destino</label>
                    <input
                        type="text"
                        className="form-control"
                        id="destino"
                        required
                        value={plan.destino}
                        onChange={handleInputChange}
                        name="destino"
                        maxLength={20}
                    />

                    <label htmlFor="fecha" style={{ marginTop: "0.5%" }}>Fecha</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fecha"
                        required
                        value={plan.fecha}
                        onChange={handleInputChange}
                        name="fecha"
                        min={new Date().toISOString().split('T')[0]}
                    />

                    <label htmlFor="modalidad" style={{ marginTop: "0.5%" }}>Modalidad (Aérea, Marítima o Terrestre)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="modalidad"
                        required
                        value={plan.modalidad}
                        onChange={handleInputChange}
                        name="modalidad"
                    />

                    <label htmlFor="precio" style={{ marginTop: "0.5%" }}>Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        id="precio"
                        required
                        value={plan.precio}
                        onChange={handleInputChange}
                        name="precio"
                    />

                </div>

                <p style={{ color: "red", marginTop: "1%" }}>{message}</p>
                <button onClick={savePlan} className="btn btn-success">
                    Agregar
                </button>
            </div>
        </div>
    )
}

export default AgregarPlan;