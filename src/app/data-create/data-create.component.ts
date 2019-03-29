import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import {DataService} from '../data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Data } from '../data.model';

@Component({
  selector: 'app-data-create',
  templateUrl: './data-create.component.html',
  styleUrls: ['./data-create.component.scss']
})
export class DataCreateComponent implements OnInit {

  form : FormGroup;
  data: Data;

  constructor(
    public ds: DataService
  ) { }

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
  }
}
