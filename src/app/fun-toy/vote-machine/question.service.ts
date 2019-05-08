import { Injectable } from '@angular/core';
import { QuestionBase } from './question-base';
import { DropdownQuestion } from './question-dropdown';
import { TextboxQuestion } from './question-textbox';
import { _countGroupLabelsBeforeOption } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questions: QuestionBase<any>[];
  private order: number = 3;
  private labelStr: String = 'Option' + (this.order -1).toString();
  
  constructor() { }

  initQuestion() {
    this.questions = [
 
      new TextboxQuestion({
        key: 'Question',
        label: 'Question',
        value: '',
        required: true,
        order: 1
      }),
 
      new TextboxQuestion({
        key: 'Option1',
        label: 'Option1',
        type: 'text',
        order: 2
      })
    ];
    this.questions.sort((a, b) => a.order - b.order);
  }

  addQuestion () {
    let question = new TextboxQuestion({
      key:this.labelStr,
      label:this.labelStr,
      value:'',
      required: true,
      order: this.order,
      type: 'text'
    })
    this.order++;
    this.questions.push(question);
    this.questions.sort((a, b) => a.order - b.order);
  }

  saveValue() {
    
  }

  getQuestions() {
    return this.questions;
  }
}
