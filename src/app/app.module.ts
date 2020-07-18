import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { QueriesComponent } from './queries/queries.component';
import { QueryListComponent } from './queries/query-list/query-list.component';
import { QueryDetailsComponent } from './queries/query-details/query-details.component';
import { QueryEditComponent } from './queries/query-edit/query-edit.component';
import { QueryStartComponent } from './queries/query-start/query-start.component';
import { AppRoutingModule } from './app-router.module';
import { HomeComponent } from './home/home.component';
import { QueryItemComponent } from './queries/query-list/query-item/query-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import { SQSComponent } from './queries/sqs/sqs.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QueriesComponent,
    QueryListComponent,
    QueryDetailsComponent,
    QueryEditComponent,
    QueryStartComponent,
    HomeComponent,
    QueryItemComponent,
    SQSComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
