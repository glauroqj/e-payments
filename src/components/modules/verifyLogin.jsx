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

    firebase.database().ref('users/cpf/'+id).once('value')
    .then((snapshot) => {
      if(snapshot) {
        let data = snapshot.val().information;
        data.accountType = 'cpf'
        resolve(data)
      }
    })
    .catch((error) => {
      reject(error)
    });

    firebase.database().ref('users/cnpj/'+id).once('value')
    .then((snapshot) => {
      if(snapshot) {
        let data = snapshot.val().information;
        data.accountType = 'cnpj'
        resolve(data)
      }
    })
    .catch((error) => {
      reject(error)
    });

  });
}