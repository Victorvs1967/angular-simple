import "firebase/auth";

import { Injectable } from '@angular/core';
import { FbService, fb_main } from './fb.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  auth;

  constructor(public fb: FbService) { 
    this.auth = fb_main.auth()
  }

  setUsers = {
  user: null,
  initUser(handler) {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;    
      } else {
        this.user = null;
      }
      if (handler) handler();
    });    
  },

  logIn(email, password) {
    // Sign in with email and pass.
    // [START authwithemail]
    this.auth.signInWithEmailAndPassword(email, password)
    .then(data => {
      loginForm.reset();
    })
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      document.getElementById('quickstart-sign-in').disabled = false;
      // [END_EXCLUDE]
    });
    // [END authwithemail]
  },

  logOut() {
    this.auth.signOut();
  },

  signUp(email, password, handler) {
    // Create user with email and pass.
    // [START createwithemail]
    this.auth.createUserWithEmailAndPassword(email, password)
    .then(data => {
      loginForm.reset();
      this.editUser(email.split('@')[0], null, handler);
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    // [END createwithemail]
  },

  editUser(displayName, photoURL, handler) {
    const user = this.auth.currentUser;
    if (displayName) {
      if (photoURL) {
        user.updateProfile({
          displayName,
          photoURL
        }).then(handler)
      } else {
        user.updateProfile({
          displayName
        }).then(handler)
      }
    }
    editElem.reset();
  },

  sendForget(email) {
    this.auth.sendPasswordResetEmail(email)
    .then(() => {
      alert('Email send')
    }).catch(error => {
      alert('Error')
    });        
  }
} 


}
