import { Injectable } from '@angular/core';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { Observable } from 'rxjs';

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

  public allHabits: Habit[];

  constructor() {
    this.allHabits = [];
    this.getHabits();
}

  public saveHabit(habit: Habit) {
    firebase.database().ref(`habits/id${(+new Date()).toString(16)}`).set(habit);
  }

  public removeHabit(habit: Habit) {
    const database = firebase.database();
    database.ref('habits').on('value', snapshot => {
      const keys = Object.keys(snapshot.val());
      const index = Object.values(snapshot.val()).findIndex(item => item['name'] == habit.name && item['frequency'] == habit.frequency && item['description'] == habit.description);
      database.ref(`habits/${keys[index]}`).remove();
    });
  }

  public updateHabit(habitNew: Habit, index: number) {
    const habit = this.allHabits[index];
    const database = firebase.database();
    database.ref('habits').on('value', snapshot => {
      const keys = Object.keys(snapshot.val());
      const indx = Object.values(snapshot.val()).findIndex(item => item['name'] == habit.name && item['frequency'] == habit.frequency && item['description'] == habit.description);
      if (keys[indx] != 'undefined') {
        database.ref(`habits/${keys[indx]}`).update(habitNew);
      }
    });
  }

  public getHabits() {
    let arr: Habit[];
    firebase.database().ref('habits').on('value', snapshot => {
      const data = snapshot.val() || [];
      Object.values(data).forEach(item => {
        const habit: Habit = <Habit>{
          name: item['name'],
          frequency: item['frequency'],
          description: item['description'],
        };
        if (!this.allHabits.includes(habit)) {
          this.allHabits.push(habit);
        }
      });
    })
  }

}
