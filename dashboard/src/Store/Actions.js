import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";

export const addComment = async (dispatch, user, comment) => {
  return new Promise(async (resolve) => {
    axios({
      method: "POST",
      url: "addComment",
      data: { user: user, comment: comment },
    })
      .then((res) => {
        if (res && res.data && res.data !== -1) {
          dispatch({ type: "ADD_COMMENT", payload: res.data });
          resolve(1);
          return;
        }
        dispatch({
          type: "ERROR",
          payload: { type: "error", error: "unknown error" },
        });
        resolve(-1);
      })
      .catch((e) => {
        dispatch({ type: "ERROR", payload: e });
        resolve(-1);
      });
  });
};

export const getComments = async (dispatch) => {
  axios({
    method: "GET",
    url: "getComments",
    json: true,
  })
    .then((res) => {
      dispatch({ type: "GET_COMMENTS", payload: res.data });
    })
    .catch((e) => console.log(e));
};

export const setModalItem = async (dispatch, item) => {
  dispatch({ type: "SET_MODAL_ITEM", payload: item });
};
