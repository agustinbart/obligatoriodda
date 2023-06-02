import React, { Component } from "react";
import ClienteDataService from "../../services/cliente.service";
import { Link } from "react-router-dom";

export default class ListaClientes extends Component {
    constructor(props) {
        super(props);
        this.onChangeBuscarCI = this.onChangeBuscarCI.bind(this);
        this.retrieveCliente = this.retrieveClientes.bind(this);
        this.refreshLista = this.refreshLista.bind(this);
        this.buscarCI = this.buscarCI.bind(this);

        this.state = {
            clientes: [],
            currentCliente: null,
            currentIndex: -1,
            buscarCI: ""
        };

    }

    componentDidMount() {
        this.retrieveClientes();
    }

    onChangeBuscarCI(e) {
        const busqueda = e.target.value;

        this.setState({
            buscarCI: busqueda
        });
    }

    retrieveClientes() {
        ClienteDataService.getAll().then(response => {
            this.setState({
                clientes: response.data
            });
            console.log(response.data);
        })
            .catch(e => {
                console.log(e);
            })
    }

    refreshLista() {
        this.retrieveClientes();
        this.setState({
            currentCliente: null,
            currentIndex: -1
        });
    }

    setActiveCliente(cliente, index) {
        this.setState({
            currentCliente: cliente,
            currentIndex: index
        });
    }

    buscarCI() {
        ClienteDataService.get(this.state.buscarCI).then(response => {
            this.setState({
                currentCliente: response.data,
                currentIndex: response.data.index
            });
            console.log(response.data);
        })
            .catch(e => {
                console.log(e);
            });
    }

    deleteCliente = () => {
        ClienteDataService.delete(this.state.currentCliente.ci)
            .then(response => {
                console.log(response.data);
                window.location.reload();
            }).catch(e => {
                console.log(e);
            })
    }

    render() {
        const { buscarCI, clientes, currentCliente, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            type="text"
                            className="form-control"
                            placeholder="Buscar por cédula"
                            value={buscarCI}
                            onChange={this.onChangeBuscarCI}
                            maxLength={8}
                        />

                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-dark"
                                type="button"
                                onClick={this.buscarCI}
                                style={{ borderTopLeftRadius: "0%", borderBottomLeftRadius: "0%", borderTopRightRadius: "9%", borderBottomRightRadius: "9%", }}
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Lista de Clientes</h4>

                    <Link to={"/agregarcliente"} className="btn btn-success" style={{ marginTop: "1%", marginBottom: "1%" }}>
                        Agregar nuevo
                    </Link>

                    <div>
                        {this.state.clientes.length == 0 ? <p style={{ fontSize: "1.5rem" }}>No hay clientes</p> : <p></p>}
                    </div>

                    <ul className="list-group">
                        {clientes && clientes.map((cliente, index) => (
                            <li
                                className={
                                    "list-group-item" +
                                    (index === currentIndex ? " active" : "")
                                }
                                onClick={() => this.setActiveCliente(cliente, index)}
                                key={index}
                                style={{ cursor: "pointer" }}>
                                {cliente.nombre} {cliente.apellido}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentCliente ? (
                        <div style={{ border: '1px solid #C7C8C9', padding: '5px', borderRadius: '1%' }}>
                            <h4 style={{ margin: "1%" }}>{currentCliente.nombre} {currentCliente.apellido}</h4>
                            <div style={{ margin: "1%" }}>
                                <label>
                                    <strong>Cédula:</strong>
                                </label>{" "}
                                {currentCliente.ci}
                            </div>
                            <div style={{ margin: "1%" }}>
                                <label>
                                    <strong>Email:</strong>
                                </label>{" "}
                                {currentCliente.email}
                            </div>
                            <div style={{ margin: "1%" }}>
                                <label>
                                    <strong>Tipo:</strong>
                                </label>{" "}
                                {currentCliente.tipo}
                            </div>

                            <div className="btn btn-primary" style={{ margin: "1%" }}>
                                <Link
                                    to={"/clientes/" + currentCliente.ci} style={{ textDecoration: 'none', color: 'white' }}>
                                    Editar
                                </Link>
                            </div>

                            <button
                                className="btn btn-danger"
                                onClick={this.deleteCliente}
                                style={{ margin: "1%" }}>
                                Borrar
                            </button>

                            <div className="btn btn-warning" style={{ margin: "1%", color: "white" }}>
                                <Link
                                    to={"/planescliente/" + currentCliente.ci} style={{ textDecoration: 'none', color: 'white' }}>
                                    Viajes
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h4 style={{ margin: "0" }}>Seleccione un cliente</h4>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}