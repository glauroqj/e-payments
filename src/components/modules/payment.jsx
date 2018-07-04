import axios from 'axios';
import {payment} from '../../payment-auth'

export function getSessionId() {
  return new Promise((resolve, reject) => {
    axios.post('https://ws.pagseguro.uol.com.br/v2/sessions?'+payment.token, {
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  });
}
