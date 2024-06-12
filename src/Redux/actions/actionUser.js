import { SET_DATA_USER, SET_USER } from "../constant/constantUser";
import { userServ } from "../../Services/userService";
import { localServ } from "../../Services/localService";
// import { getDataUser } from "../../Components/utils/fetchFromAPIs.js";

const setUserSuccess = (successValue) => {
  return {
    type: SET_USER,
    payload: successValue,
  };
};

export const setLogin = (dataLogin, onSuccess, onFailed) => {
  return (dispatch) => {
    userServ
      .postLogin(dataLogin)
      .then((res) => {
        localServ.user.set(res.data);
        dispatch(setUserSuccess(res.data));
        onSuccess();
      })
      .catch((err) => {
        onFailed();
        console.log(err);
      });
  };
};
const setDataListUserSucdess = (successValue) => {
  return {
    type: SET_DATA_USER,
    payload: successValue,
  };
};
export const setDataListUser = () => {
  return (dispatch) => {
    userServ
      .getDataUser()
      .then((res) => {
        dispatch(setDataListUserSucdess(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const searchUser = (values) => {
  return (dispatch) => {
    if (!values) {
      userServ
        .getDataUser()
        .then((res) => {
          dispatch(setDataListUserSucdess(res.data.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      userServ
        .searchUser(values)
        .then((res) => {
          dispatch(setDataListUserSucdess(res.data.data));
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};
