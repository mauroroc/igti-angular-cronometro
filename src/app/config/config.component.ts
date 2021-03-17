import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent  {

  exerciseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    duration: new FormControl(30, Validators.required),
    repetition: new FormControl(3, Validators.required),
    preparation: new FormControl(15, Validators.required),
    rest: new FormControl(30, Validators.required)
  });

  constructor(public tService: TimerService) { }

  add() {
    const ex = this.exerciseForm.value
    this.tService.add(ex);
    this.exerciseForm.reset({...ex, name: ''});
  }

  del(ind: number) {
    this.tService.del(ind);
  }

}
