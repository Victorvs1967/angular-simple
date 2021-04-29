import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Skill } from './models/skill';
import { User } from './models/user';
import { AuthService } from './service/auth.service';
import { FbService } from './service/fb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(public fb: FbService, public auth: AuthService) {
    this.fb.getSkills();
    this.skills = this.fb.allSkills;
  }

  ngOnInit(): void {
  }

  skills: Skill[];

  public adding = false;
  public editing = false;
  public editingIndex: number;
  logedIn = this.auth.logedIn;

  public loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  public skillForm = new FormGroup({
    name: new FormControl(''),
    frequency: new FormControl(''),
    description: new FormControl(''),
  });
  
  public onSubmit() {

    const skill  = this.skillForm.value as Skill;
    
    if (this.editing) {
      this.fb.updateSkill(skill, this.editingIndex);
      this.skills.splice(this.editingIndex, 1, skill);
    } else {
      this.fb.saveSkill(skill);
      this.skills = [skill, ...this.skills];
    }
    this.exitForm();
  }

  public onLoginSubmit() {

    const user  = this.loginForm.value as User;
    this.auth.logIn(user.email, user.password, this.loginForm);
    this.logedIn = true;
    this.loginForm.reset();
  }

  public onSignupSubmit() {

    const user  = this.loginForm.value as User;
    console.log(user);
    this.auth.signUp(user.email, user.password, null, this.loginForm);
    this.loginForm.reset();
  }

  public logout() {
    this.logedIn = false;
    this.auth.logOut();
  }

  public setEditForm(habit: Skill, index: number) {
    this.skillForm.patchValue({
      name: habit.name,
      frequency: habit.frequency,
      description: habit.description,
    });
    this.editing = true;
    this.editingIndex = index;
  }

  public onDelete(index: number) {
    this.fb.removeSkill(index);
    this.skills.splice(index, 1);
  }

  public exitForm() {
    this.adding = false;
    this.editing = false;
    this.skillForm.reset();
  }
}
