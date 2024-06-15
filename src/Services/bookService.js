import { https } from "./configURL";
export const bookSer = {
  getDataBook: (id) => https.get(`/api/rooms/rooms-location?location_id=${id}`),
  postBooking: (data) => https.post("/api/reservations/new", data),
  getDataBooking: (id) =>
    https.get(`/api/reservations/reservation-by-id/${id}`),
  getStatusRoom: () => https.get(`/api/reservations`),
  getData: () => https.get("/api/reservations"),
  deleteBooking: (id) => https.delete(`/api/reservations/delete/${id}`),
  getBookedFromId: (id) => https.get(`/api/reservations/${id}`),
  editBooked: (id, data) => https.put(`/api/reservations/update/${id}`, data),
};
