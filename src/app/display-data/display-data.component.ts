import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Data} from '../data.model';
import { Subscription } from 'rxjs';

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

}
