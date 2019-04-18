import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { VoteMachineComponent } from './vote-machine/vote-machine.component';

@Component({
  selector: 'app-fun-toy',
  templateUrl: './fun-toy.component.html',
  styleUrls: ['./fun-toy.component.scss']
})
export class FunToyComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

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
