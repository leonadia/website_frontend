import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayDataComponent } from './blog/display-data/display-data.component'
import { HttpClientModule } from '@angular/common/http';
import { DataCreateComponent } from './blog/data-create/data-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { ToolbarComponent } from './blog/display-data/toolbar/toolbar.component';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { IntroComponent } from './blog/intro/intro.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BlogComponent } from './blog/blog.component';
import { FunToyComponent } from './fun-toy/fun-toy.component';
import { VoteMachineComponent } from './fun-toy/vote-machine/vote-machine.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayDataComponent,
    DataCreateComponent,
    ToolbarComponent,
    IntroComponent,
    HeaderComponent,
    BlogComponent,
    FunToyComponent,
    VoteMachineComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule
  ],
  entryComponents: [
    DataCreateComponent,
    VoteMachineComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
