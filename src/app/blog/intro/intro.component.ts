import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

export interface Portal {
  value: string;
  img: string;
  link: string;
}

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'linkedin',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/images/download.png'));
   }

  portal: Portal[] = [
    {value:'LinkedIn', img: "../../assets/images/download.png", link:'https://www.linkedin.com/in/huaqing-liu-840b06176/'},
    {value:'LinkedIn', img: "../../assets/images/download (1).png", link:'https://github.com/leonadia/website_frontend'}
  ]

  ngOnInit() {
  }

  OnJump(link:string) {
    window.location.href = link;
  }

}
