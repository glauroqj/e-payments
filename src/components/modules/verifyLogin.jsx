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