import http from "../http-common";

class PlanDataService {
  getAll() {
    return http.get("/planes");
  }

  getAllPlanesEliminados(){
    return http.get("/planeseliminados");
  }

  get(id) {
    return http.get(`/planes/${id}`);
  }

  create(data) {
    return http.post("/agregarplan", data);
  }

  update(id, data) {
    return http.put(`/modificarplan/${id}`, data);
  }

  delete(id, data) {
    return http.delete(`/borrarplan/${id}`);
  }

  updatePlanEliminadoASi(id, data){
    return http.put(`/modificarplaneliminadoasi/${id}`, data);
  }

  updatePlanEliminadoANo(id, data){
    return http.put(`/modificarplaneliminadoano/${id}`, data);
  }
}

export default new PlanDataService();