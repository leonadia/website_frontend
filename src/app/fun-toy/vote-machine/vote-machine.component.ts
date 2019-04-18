import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-vote-machine',
  templateUrl: './vote-machine.component.html',
  styleUrls: ['./vote-machine.component.scss']
})
export class VoteMachineComponent implements OnInit {

  form:FormGroup;
  optionCount:string;
  count: number = 0

  constructor() { }

  ngOnInit() {
  }

  addOption() {
    this.optionCount = this.optionCount + count.toString;
  }
}
