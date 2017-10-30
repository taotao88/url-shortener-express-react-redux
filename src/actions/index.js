import axios from 'axios';
import { SHORTEN_URL, SHORTEN_URL_SUCCESS, SHORTEN_URL_FAILURE } from '../constants';

export const sendUrl = longUrl => ({
  type: SHORTEN_URL,
  longUrl,
  error: '',
  shortUrl: '',
  msg: '',
})

export default function shortenUrl(longUrl) {
  const API_URL = 'http://127.0.0.1:8000/api/v1';
  return dispatch => {
    dispatch(sendUrl(longUrl));
    axios.post(API_URL, {
      longUrl: longUrl
    })
    .then( response => {
      // console.log('then res' + JSON.stringify(response));
      // console.log('then res.data' + JSON.stringify(response.data));
      dispatch({
        type: SHORTEN_URL_SUCCESS,
        longUrl: response.data.longUrl,
        shortUrl: response.data.shortUrl,
        error: response.data.error,
        msg: response.data.msg,
      });
    })
    .catch( response => {
      dispatch({
        type: SHORTEN_URL_FAILURE,
        longUrl: '',
        shortUrl: '',
        error: '',
        msg: '',
      });
    });
  };
} 
