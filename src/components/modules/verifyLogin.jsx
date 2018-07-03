import * as firebase from 'firebase';

export function verify() {
  let user = null;
  firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      user = user;
      console.log('User Loged: ', user)
      return user
    }
    if(!user) {
      console.log('Not Loged', user)
      window.location.href = '/login'
    }
  });

  return user
}