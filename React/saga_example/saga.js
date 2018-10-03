import { actionChannel, call, takeEvery, put } from 'redux-saga/effects';
import { client } from '../services/API';

export function* sagaWatch({ payload }) {

  const {
    actions,
    variables,
    query
  } = payload;

  const requestAction = actions[0];
  const successAction = actions[1];
  const failedAction = actions[2];

  try {
    yield put({ type: requestAction })

    const data = yield call(client, variables, query);

    yield put({ type: successAction, payload: data });
  }

  catch (err) {
    console.log('ERROR FETCH', err)
    yield put({ type: failedAction });
  }

}

export default function* () {
  const requestChan = yield actionChannel('API');
  yield takeEvery(requestChan, sagaWatch);

}
