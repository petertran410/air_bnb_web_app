import { https } from "./configURL";
export const roomServ = {
  getDataBook: (id) => https.get(`/api/rooms/rooms-location?location_id=${id}`),
  getDataRoom: (id) => https.get(`/api/rooms/rooms-by-id/${id}`),
  getDataComment: () => https.get("/api/comments"),
  getAllInfoUser: () => https.get("/api/users"),
  postComment: (data) => https.post("/api/comments/new", data),
  postBooking: (data) => https.post("/api/reservations/new", data),
  getDataBooking: (id) => https.get(`/api/dat-phong/lay-theo-nguoi-dung/${id}`),
  getAllDataRoom: () => https.get("/api/rooms"),
  getStatusRoom: () => https.get(`/api/reservations`),
  getCommentRoom: (idRoom) =>
    https.get(`/api/binh-luan/lay-binh-luan-theo-phong/${idRoom}`),
  createRoom: (data) => https.post("/api/rooms/new", data),
  deleteRoom: (idRoom) => https.delete(`/api/rooms/delete/${idRoom}`),
  editRoom: (idRoom, data) => https.put(`/api/rooms/update/${idRoom}`, data),
};
