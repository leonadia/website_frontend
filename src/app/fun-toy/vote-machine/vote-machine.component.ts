import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { count } from 'rxjs/operators';
import { strictEqual } from 'assert';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-vote-machine',
  templateUrl: './vote-machine.component.html',
  styleUrls: ['./vote-machine.component.scss']
})
export class VoteMachineComponent implements OnInit {

  form:FormGroup;
  count: number = 0;
  htmlItem:string;

  constructor() { }

  ngOnInit() {
  }

  addOption() {
    let label:string = "option";
    label = label + this.count.toString();
    this.count++;
  }
}
