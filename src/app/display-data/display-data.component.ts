import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Data} from '../data.model';
import { Subscription } from 'rxjs';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.scss']
})
export class DisplayDataComponent implements OnInit {
  
  capOfData: number
  datas: Data[] = [];
  private datasSub: Subscription;

  constructor(public ds: DataService) { }

  ngOnInit() {
    this.ds.getData();
    this.datasSub = this.ds
      .getPostUpdateListener()
      .subscribe((postData: { datas: Data[]; max: number }) => {
        this.datas = postData.datas;
        this.capOfData = postData.max;
      });
  }

  
  onDeleteData(id: string) {
    console.log(id);
    this.ds.deleteData(id).subscribe(() => {
      this.ds.getData();
    }, () => {});
  }

}
