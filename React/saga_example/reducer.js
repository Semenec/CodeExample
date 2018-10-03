import { LOGIN_REQUEST, LOGIN_SUCCES, LOGIN_FAIL, LOGOUT } from '../constants';

let initialState = {
  isLoading: false,
  user: {}
}

export default function login(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        Error: null,
        isLoading: true
      }
    case LOGIN_SUCCES:
      return {
        ...state,
        isLoading: false,
        user: action.payload
      }
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case LOGOUT:
      return state = initialState;
    default:
      return state;
  }
}
