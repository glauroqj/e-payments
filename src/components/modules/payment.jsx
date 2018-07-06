import axios from 'axios';
import {payment} from '../../payment-auth'

export function getSessionId() {
  return new Promise((resolve, reject) => {
    // https://ws.pagseguro.uol.com.br
    axios.post('https://ws.sandbox.pagseguro.uol.com.br/v2/sessions?'+payment.token, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    .then(function (response) {
      console.log(response);
      resolve(response)
    })
    .catch(function (error) {
      console.log(error);
      reject(error)
    });
  });
}
