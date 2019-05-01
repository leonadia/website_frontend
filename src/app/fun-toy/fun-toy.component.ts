import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { VoteMachineComponent } from './vote-machine/vote-machine.component';
import {QuestionService} from './vote-machine/question.service'

@Component({
  selector: 'app-fun-toy',
  templateUrl: './fun-toy.component.html',
  styleUrls: ['./fun-toy.component.scss'],
  providers: [QuestionService]
})
export class FunToyComponent implements OnInit {

  questions: any[]
  constructor(public dialog:MatDialog, public questionService: QuestionService) {
    this.questions = questionService.getQuestions();
   }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VoteMachineComponent, {
      width: '600px',
      data:{mode: 'create'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
