import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  vis: string = 'hidden';
  triggerEdit() {
    if(this.vis == 'hidden') {
      this.vis = "";
    }
    else {
      this.vis = 'hidden';
    }
  }
}
