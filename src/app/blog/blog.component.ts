import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DataCreateComponent} from './data-create/data-create.component'
import { AuthService } from '../auth/auth.service';
import { QuestionControlService } from '../fun-toy/vote-machine/question-control.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  userIsAuthenticated = false;
  constructor(public dialog:MatDialog, public authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
    this.userIsAuthenticated = this.authService.getIsAuth()
    console.log(this.userIsAuthenticated)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DataCreateComponent, {
      width: '600px',
      data:{mode: 'create'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
