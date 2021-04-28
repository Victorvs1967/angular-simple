import { Injectable } from '@angular/core';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

import { Habit } from '../models/habit';

const firebaseConfig = {
  apiKey: "AIzaSyD-OcKTvsc1uMb-A2xDr0aTCASVn_2p1Xk",
  authDomain: "angular-habit-tracker-vvs.firebaseapp.com",
  databaseURL: "https://angular-habit-tracker-vvs-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "angular-habit-tracker-vvs",
  storageBucket: "angular-habit-tracker-vvs.appspot.com",
  messagingSenderId: "3918306004",
  appId: "1:3918306004:web:c9190887df0fca1e27f941"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class FbService {

  public fbase = firebase.database();
  public allHabits: Habit[] = [];

  constructor() {
}

  public saveHabit(habit: Habit) {
    firebase.database().ref(`habits/id${(+new Date()).toString(16)}`).set(habit);
  }

  public removeHabit(index: number) {
    this.fbase.ref('habits').on('value', snapshot => {
      const keys = Object.keys(snapshot.val());
      this.fbase.ref(`habits/${keys[index]}`).remove();
    });
  }

  public updateHabit(habitNew: Habit, index: number) {
    this.fbase.ref('habits').once('value', snapshot => {
      const keys = Object.keys(snapshot.val());
      this.fbase.ref(`habits/${keys[index]}`).update(habitNew);
    });
  }

  public getHabits() {
    this.fbase.ref('habits').get().then(snapshot => {
      const data: Habit[] = Object.values(snapshot.val()) || [];
      data.forEach(item => this.allHabits.push(item));
    })
  }
  
}
