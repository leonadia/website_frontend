import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {DataService} from '../data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Data } from '../data.model';

export interface Emoji {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-data-create',
  templateUrl: './data-create.component.html',
  styleUrls: ['./data-create.component.scss']
})
export class DataCreateComponent implements OnInit {

  form : FormGroup;
  data: Data;

  constructor(
    public ds: DataService,
    public dialogRef: MatDialogRef<DataCreateComponent>
  ) { }

  emojis: Emoji[] = [
    {value: 'normal', viewValue: 'normal'},
    {value: 'happy', viewValue: 'happy'},
    {value: 'sad', viewValue: 'sad'},
    {value: 'excited', viewValue: 'excited'},
  ]

  ngOnInit() {
    this.form = new FormGroup({
      title : new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null,{validators: [Validators.required]}),
      status: new FormControl(null, {validators: [Validators.maxLength(15)]})
    })
  }

  onSaveData() {
    this.ds.addPost(
      this.form.value.title,
      this.form.value.content,

      this.form .value.status
    );
    this.form.reset();
    this.dialogRef.close();
  }

  cancelPost(): void {
    this.form.reset();
    this.dialogRef.close();
  }
}
