import { Component, OnInit, Input } from '@angular/core';
import {DataService} from '../../data.service';
import {Data} from '../../data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() data: Data;

  constructor(public ds:DataService) { }

  ngOnInit() {
  }

    
  onDeleteData(id: string) {
    console.log(id);
    this.ds.deleteData(id).subscribe(() => {
      this.ds.getData();
    }, () => {});
  }

}
