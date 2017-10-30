import { SHORTEN_URL, SHORTEN_URL_SUCCESS, SHORTEN_URL_FAILURE } from '../constants';

const INITIAL_STATE = {
  shortUrl: '',
  longUrl: '',
  error: '',
  msg: ''
}

export default function urls(state=INITIAL_STATE, action) {
  switch(action.type) {
    case SHORTEN_URL:
      return Object.assign({}, state, {msg: 'Generating short URL...', longUrl: action.longUrl});

    case SHORTEN_URL_SUCCESS:
      return Object.assign({}, state, action);

    case SHORTEN_URL_FAILURE:
      return Object.assign({}, state, action);

    default:
      return state;
  }
}
