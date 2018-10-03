import { LOGIN_REQUEST, LOGIN_SUCCES, LOGIN_FAIL } from '../constants';

const query = {
    method: 'post',
    headers: {  
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    urlParams: 'login'
}

export const login = ( payload ) => {
    return {
        type: 'API',
        payload: {
            query: query,
            variables: payload,
            actions: [LOGIN_REQUEST, LOGIN_SUCCES, LOGIN_FAIL]
        }
    }
}
