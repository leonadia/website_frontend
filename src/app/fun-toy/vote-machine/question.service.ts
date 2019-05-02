import { Injectable } from '@angular/core';
import { QuestionBase } from './question-base';
import { DropdownQuestion } from './question-dropdown';
import { TextboxQuestion } from './question-textbox';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questions: QuestionBase<any>[];
  private order: number = 4;
  
  constructor() { }

  addQuestion () {
    let question = new TextboxQuestion({
      key:'new',
      label:'new question',
      value:'new question',
      required: true,
      order: this.order,
      type: 'text'
    })
    this.order++;
    this.questions.push(question);

    return this.questions.sort((a, b) => a.order - b.order);

  }

  getQuestions() {
 
      this.questions = [
 
      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),
 
      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),
 
      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];
 
    return this.questions.sort((a, b) => a.order - b.order);
  }
}
