import {Injectable} from '@angular/core';
import { Exercise } from './exercise';

@Injectable({
    providedIn: 'root'
})
export class TimerService {
    exercises: Exercise[] =  [{
        name: 'Abdominal',
        duration: 30,
        repetition: 3,
        preparation: 15,
        rest: 30
      }];
    currEx: number;
    currRep: number;
    phase: number;    
    timeLeft: number;
       
    restart() {    
        this.currEx = 0;
        this.currRep = 0;
        this.phase = 0;
        this.timeLeft = this.getTimeOfCurrentPhase();
      }

    formatTime(time: number): string {
      return (time / 10).toString();
    }
          
    private getTimeOfCurrentPhase():number {
      const ex = this.exercises[this.currEx];
      switch(this.phase) {
        case 0: return ex.preparation * 1000;
        case 1: return ex.duration * 1000;
        case 2: return ex.rest * 1000;
      }
    }
  
    nextPhase() {
      const ex = this.exercises[this.currEx];
      //Testar se estamos antes da ultima fase
      if (this.phase < 2) {
        this.phase++;      
      } else {
        //Estamos na ultima fase. Testar se estamos antes da ultima repeticao
        if (this.currRep < ex.repetition - 1) {
          this.currRep++;
          this.phase = 1
        } else {
          //Testar se existe um proximo exercicio
          if(this.currEx < this.exercises.length - 1) {
            this.currEx++;
            this.currRep = 0;
            this.phase = 0;
          } else {
            return;
          }
        }
      }
      this.timeLeft = this.getTimeOfCurrentPhase();
    }
  
    constructor() { }
  
    decrementTimeLeft(ellapsedTimeMs) {
        if(ellapsedTimeMs >= this.timeLeft) {
            this.nextPhase();
        }else{
            this.timeLeft = this.timeLeft - ellapsedTimeMs;
        }         
    }

    add(exercise: Exercise) {
        this.exercises.push(exercise);        
      }
    
      del(ind: number) {
        this.exercises.splice(ind, 1);
      }

}