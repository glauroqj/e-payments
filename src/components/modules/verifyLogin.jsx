import * as firebase from 'firebase';

export function verify() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
         resolve(user)
      }
      if(!user) {
        reject(user)
      }
    });
  });
}

export function getDataUser(id) {
  return new Promise((resolve, reject) => {
    firebase.database().ref('users/').once('value')
    .then((snapshot) => {
      let data = snapshot.val()
      console.log(data.cpf)
      let cpf = Object.keys(data.cpf)
      let cnpj = Object.keys(data.cnpj)

      // console.log('CPF: ', cpf.indexOf(id))
      if( cpf.indexOf(id) !== -1 ) {
        console.log(data.cpf[id].information)
        data.cpf[id].information.accountType = 'CPF'
        resolve(data.cpf[id].information)
      }
      
      // console.log('CNPJ: ', cnpj.indexOf(id))
      if( cnpj.indexOf(id) !== -1 ) {
        console.log(data.cnpj[id])
        data.cnpj[id].information.accountType = 'CNPJ'
        resolve(data.cnpj[id].information)
      }

    })
    .catch((error) => {
      reject(error)
    });

  });
}