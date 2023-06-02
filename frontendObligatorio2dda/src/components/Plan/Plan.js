import React, { useState, useEffect } from "react";
import PlanDataService from "../../services/plan.service";
import { useParams, useNavigate } from 'react-router-dom';

const Plan = props => {
    const { id } = useParams();
    let navigate = useNavigate();

    const initialPlanState = {
        id: "",
        destino: "",
        fecha: "",
        modalidad: "",
        precio: "",
        eliminado: ""
    };

    const [currentPlan, setCurrentPlan] = useState(initialPlanState);
    const [message, setMessage] = useState("");

    const getPlan = id => {
        PlanDataService.get(id)
            .then(response => {
                setCurrentPlan(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getPlan(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentPlan({ ...currentPlan, [name]: value });
    };

    const updatePlan = () => {
        if(currentPlan.modalidad === "Aérea" || currentPlan.modalidad === "Terrestre" || currentPlan.modalidad === "Marítima"){
        PlanDataService.update(
            currentPlan.id,
            currentPlan
        )
            .then(response => {
                console.log(response.data);
                setMessage("Plan modificado con éxito");
                navigate("/planes");
            }).catch(e => {
                console.log(e);
            })
        }else{
            setMessage("Modalidad no válida, solo se permite 'Marítima', 'Terrestre' o 'Aérea'")
            return message;
        }
    }

    return (
        <div>
            {currentPlan ? (
                <div className="edit-form">
                    <h4>Plan</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="destino" style={{ marginTop: "0.5%" }}>Destino</label>
                            <input
                                type="text"
                                className="form-control"
                                id="destino"
                                required
                                value={currentPlan.destino}
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
                                value={currentPlan.fecha}
                                onChange={handleInputChange}
                                name="fecha"
                            />

                            <label htmlFor="modalidad" style={{ marginTop: "0.5%" }}>Modalidad</label>
                            <input
                                type="text"
                                className="form-control"
                                id="modalidad"
                                required
                                value={currentPlan.modalidad}
                                onChange={handleInputChange}
                                name="modalidad"
                            />

                            <label htmlFor="precio" style={{ marginTop: "0.5%" }}>Precio</label>
                            <input
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                type="text"
                                className="form-control"
                                id="precio"
                                required
                                value={currentPlan.precio}
                                onChange={handleInputChange}
                                name="precio"
                            />
                        </div>
                    </form>

                    <p style={{ color: "red", marginTop: "1%" }}>{message}</p>
                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={updatePlan}>
                        Modificar
                    </button>
                </div>
            ) : (
                <div>
                    <p>Seleccione un plan</p>
                </div>
            )}
        </div>
    )
}

export default Plan;