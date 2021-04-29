import { Injectable } from '@angular/core';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/database";
import "firebase/firestore";

import { Skill } from '../models/skill';

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
export const fb_main = firebase.initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class FbService {

  public fbase = fb_main.database();
  public allSkills: Skill[] = [];

  constructor() {}

  public saveSkill(skill: Skill) {
    this.fbase.ref(`skills/id${(+new Date()).toString(16)}`).set(skill);
  }

  public removeSkill(index: number) {
    this.fbase.ref('skills').get().then(snapshot => {
      const keys = Object.keys(snapshot.val()).sort(this.sortDesc);
      this.fbase.ref(`skills/${keys[index]}`).remove();
    });
  }

  public updateSkill(habitNew: Skill, index: number) {
    this.fbase.ref('skills').once('value', snapshot => {
      const keys = Object.keys(snapshot.val());
      this.fbase.ref(`skills/${keys[index]}`).update(habitNew);
    });
  }

  public getSkills() {
    try {
      this.fbase.ref('skills').get().then(snapshot => {
      const data: Skill[] = Object.values(snapshot.val()) || [];
      data.sort(this.sortDesc);
      data.forEach(item => this.allSkills.push(item));
    })
    } catch {
      console.log('Database empty...');
    } 
  }

  sortDesc(a, b): number {
    return a < b ? 1 : -1;
  }
  
}
