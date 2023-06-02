import http from "../http-common";

class ClienteDataService {
  getAll() {
    return http.get("/clientes");
  }

  get(id) {
    return http.get(`/clientes/${id}`);
  }

  create(data){
    return http.post("/agregarcliente", data);
  }

  update(id, data) {
    return http.put(`/modificarcliente/${id}`, data);
  }

  delete(id){
    return http.delete(`/borrarcliente/${id}`);
  }

  updateClienteToPremium(cliente){
    return http.put("/clienteestandarapremium", cliente);
  }

  updateClienteToEstandar(cliente){
    return http.put("/clientepremiumaestandar", cliente);
  }
}

export default new ClienteDataService();