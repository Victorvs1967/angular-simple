import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Habit } from './models/habit';
import { FbService } from './service/fb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(public fb: FbService) {
  }

  ngOnInit(): void {
  }

  habits: Habit[] = this.fb.allHabits;

  public adding = false;
  public editing = false;
  public editingIndex: number;

  public habitForm = new FormGroup({
    name: new FormControl(''),
    frequency: new FormControl(''),
    description: new FormControl(''),
  });
  
  public onSubmit() {

    const habit  = this.habitForm.value as Habit;
    
    if (this.editing) {
      this.fb.updateHabit(habit, this.editingIndex);
    } else {
      this.fb.saveHabit(habit);
    }
    this.exitForm();
  }

  public setEditForm(habit: Habit, index: number) {
    this.habitForm.patchValue({
      name: habit.name,
      frequency: habit.frequency,
      description: habit.description,
    });
    this.editing = true;
    this.editingIndex = index;
  }

  public onDelete(index: number) {
    this.fb.removeHabit(this.fb.allHabits[index]);
  }

  public exitForm() {
    this.adding = false;
    this.editing = false;
    this.habitForm.reset();
  }
}
