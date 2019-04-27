import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service'
import {Data} from '../../data.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.scss']
})
export class DisplayDataComponent implements OnInit {
  
  capOfData: number
  datas: Data[] = [];
  private datasSub: Subscription;
  isLoading: boolean = false;
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId: string;
  

  constructor(public ds: DataService, public authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.authService.autoAuthUser();
    this.ds.getData();
    this.datasSub = this.ds
      .getPostUpdateListener()
      .subscribe((postData: { datas: Data[]; max: number }) => {
        this.datas = postData.datas;
        this.capOfData = postData.max;
        this.isLoading = false;
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
        });
  }

}
