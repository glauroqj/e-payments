import * as firebase from 'firebase';

export function verify() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        console.log('User Loged')
         resolve(user)
      }
      if(!user) {
        console.log('Not Loged')
        reject(user)
      }
    });
  });
}