import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

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
  name: string;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public auth:AuthService) {
    iconRegistry.addSvgIcon(
      'linkedin',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/images/download.png'));
   }

  portal: Portal[] = [
    {value:'LinkedIn', img: "../../assets/images/download.png", link:'https://www.linkedin.com/in/huaqing-liu-840b06176/'},
    {value:'LinkedIn', img: "../../assets/images/download (1).png", link:'https://github.com/leonadia/website_frontend'}
  ]

  ngOnInit() {
    this.auth.autoAuthUser();
    this.userIsAuthenticated = this.auth.getIsAuth();
    this.authStatusSub = this.auth
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.name = this.auth.getName();
      });

  }

  OnJump(link:string) {
    window.location.href = link;
  }

}
