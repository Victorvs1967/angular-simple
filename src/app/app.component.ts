import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Habit } from './models/habit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public adding = false;
  public editing = false;
  public editingIndex: number;

  public habitForm = new FormGroup({
    name: new FormControl(''),
    frequency: new FormControl(''),
    description: new FormControl(''),
  });

  public habits: Habit[] = [
    <Habit>{
      name: '15 Minut Work',
      frequency: 'Daily',
      description: 'This habit makes my kitchen look nice and makes my day better the next morning.',
    },
    <Habit>{
        name: 'Weed the Garden',
        frequency: 'Weekly',
        description: 'The weeds get so out of hand if they wait any longer, and I like how nice our home looks with a clean lawn.',
    },
  ];

  public onSubmit() {

    const habit  = this.habitForm.value as Habit;
    
    if (this.editing) {
      this.habits.splice(this.editingIndex, 1, habit);
    } else {
      this.habits.push(habit);
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
    this.habits.splice(index, 1);
  }

  public exitForm() {
    this.adding = false;
    this.editing = false;
    this.habitForm.reset();
  }
}
