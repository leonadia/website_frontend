import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from '../question-base';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../question-control.service';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
  vis:boolean = true;
  constructor(private qcs: QuestionControlService, private questionService:QuestionService) {  }
 
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }
  
  addOption() {
    this.questionService.addQuestion();
    this.questions = this.questionService.getQuestions();
    this.form = this.qcs.toFormGroup(this.questions);
  }
 
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    this.vis = false;
  }

}
