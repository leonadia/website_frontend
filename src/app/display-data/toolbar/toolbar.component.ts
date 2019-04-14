import { Component, OnInit, Input } from '@angular/core';
import {DataService} from '../../data.service';
import {Data} from '../../data.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DataCreateComponent} from '../../data-create/data-create.component';  

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() data: Data;

  constructor(public ds:DataService, public dialog: MatDialog) { }

  ngOnInit() {
  }

    
  onDeleteData(id: string) {
    console.log(id);
    this.ds.deleteData(id).subscribe(() => {
      this.ds.getData();
    }, () => {});
  }

  openDialog(toUpdataData: Data): void {
    const dialogRef = this.dialog.open(DataCreateComponent, {
      width: '600px',
      data: {data: toUpdataData, mode:'edit'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
