import * as actionTypes from "../ActionTypes";
import { updateObject } from "../../utils/helpers";

const initialState = {
  user: {},
  token: null,
  error: null,
  loading: false,
  path: "/",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { loading: true });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.token,
        user: { ...action.user },
        loading: false,
        error: null,
      });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, { user: null, token: null });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.AUTH_REDIRECT_PATH:
      return updateObject(state, { path: action.path });
    default:
      return state;
  }
};

export default reducer;
