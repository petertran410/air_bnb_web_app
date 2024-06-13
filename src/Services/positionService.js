import { https } from "./configURL";
export const positionSer = {
  getPosition: () => https.get("/api/locations"),
  getPositionFamous: () =>
    https.get("/api/locations/location-search?pageIndex=1&pageSize=8"),
  getCurrentPosition: (id) => https.get(`/api/locations/location-by-id/${id}`),
  postPosition: (data) => https.post("/api/locations", data),
  deletePosition: (id) => https.delete(`/api/locations/${id}`),
  editPosition: (id, data) => https.put(`/api/locations/${id}`, data),
  getDataFromId: (id) => https.get(`/api/locations/${id}`),
};
