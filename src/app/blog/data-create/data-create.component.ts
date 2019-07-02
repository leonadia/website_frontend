import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {DataService} from '../data.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Data } from '../data.model';
import { mimeType } from './mime_type_validator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from "../../auth/auth.service";
import { Subscription } from 'rxjs';

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
  mode: string;
  top: boolean = true;
  isLoading = false;
  imagePreview: string;
  private dataId: string;
  private authStatusSub: Subscription;

  constructor(
    public ds: DataService,
    public route: ActivatedRoute,
    public dialogRef: MatDialogRef<DataCreateComponent>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public toUpdataData: any) { }

  emojis: Emoji[] = [
    {value: 'normal', viewValue: 'normal'},
    {value: 'happy', viewValue: 'happy'},
    {value: 'sad', viewValue: 'sad'},
    {value: 'excited', viewValue: 'excited'},
  ]

  ngOnInit() {
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });

    this.form = new FormGroup({
      title : new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null,{validators: [Validators.required]}),
      status: new FormControl(null, {validators: [Validators.maxLength(15)]}),
      top: new FormControl(null),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    })
    this.mode = this.toUpdataData.mode;
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveData() {
    if(this.mode==='create') {
      this.ds.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form .value.status,
        this.form.value.top,
        this.form.value.image
      );
      this.form.reset();
      this.dialogRef.close();
    }
    else {
      this.ds.updataData(
        this.toUpdataData.data.id,
        this.form.value.title,
        this.form.value.content,
        this.form .value.status,
        this.form.value.top,
        this.form.value.image
      );

      this.form.reset();
      this.dialogRef.close();
      }  
  }

  onCancel() {
    this.dialogRef.close();
  }
  
}
