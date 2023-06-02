import http from "../http-common";

class PlanesClienteDataService {
  getPlanInPlanesClientes(id){
    return http.get(`/planenplanesclientes/${id}`);
  }

  get(id) {
    return http.get(`/planescliente/${id}`);
  }

  create(data, id) {
    return http.post(`/planescliente/${id}/agregar`, data);
  }

  delete(id, data) {
    return http.delete(`/planescliente/${id}/borrar`, { data });
  }

  getAllNoAsignados(id){
    return http.get(`/planessinasignar/${id}`)
  }

  planMasCercanoAFecha(id, fecha){
    return http.get(`/planescliente/${id}/planmascercano`, { fecha })
  }
}

export default new PlanesClienteDataService();