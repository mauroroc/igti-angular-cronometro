import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Exercise } from '../exercise';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  timeInterval: NodeJS.Timeout;

  constructor(public tService: TimerService) {}

  ngOnInit(): void {
    this.tService.restart();
  }

  ngOnDestroy(): void {
    this.pause();
  }

  start() {
    if(!this.timeInterval) {
      let lastTime = Date.now();
      this.timeInterval = setInterval(()=>{
        let currTime = Date.now();
        let ellapsedTime = currTime - lastTime;
        lastTime = currTime;
       this.tService.decrementTimeLeft(ellapsedTime);
      }, 100);
    }
  }

  pause() {
    if(this.timeInterval) {
      clearInterval(this.timeInterval);
      this.timeInterval = undefined;
    }    
  }

  fotmatPhase(_phase:number): string {
    switch(_phase) {
      case 0: return "Preparacao"
      case 1: return "Exercicio"
      case 2: return "Descanso"
    }
  }

  restart() {
    this.tService.restart();
  }

  nextPhase() {
    this.tService.nextPhase();
  }
}
