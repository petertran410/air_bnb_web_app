import { https } from "./configURL";

export const userServ = {
  postLogin: (data) => https.post("/api/auth/sign-in", data),
  postSign: (data) => https.post("/api/auth/sign-up", data),
  postRegister: (data) => {
    return https.post("/api/auth/signup", data);
  },
  editUser: (id, data) => https.put(`/api/users/update/${id}`, data),
  postAvatar: (data) => https.post("/api/users/upload-avatar", data),
  getInfo: (id) => https.get(`/api/users/${id}`),
  getDataUser: () => {
    return https.get("/api/users");
  },
  searchUser: (name) => https.get(`/api/users/search/${name}`),
  deleteUser: (id) => https.delete(`/api/users/delete/${id}`),
};
