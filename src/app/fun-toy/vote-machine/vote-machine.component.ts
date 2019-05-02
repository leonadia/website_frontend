import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionBase } from './question-base';
import {QuestionService} from './question.service';
import { QuestionControlService } from './question-control.service';

@Component({
  selector: 'app-vote-machine',
  templateUrl: './vote-machine.component.html',
  styleUrls: ['./vote-machine.component.scss']
})
export class VoteMachineComponent implements OnInit {

  questions: any[]
 
  constructor(private qcs: QuestionControlService, private questionService:QuestionService) { 
    this.questions = questionService.getQuestions();
   }
 
  ngOnInit() {
  }
  
}
