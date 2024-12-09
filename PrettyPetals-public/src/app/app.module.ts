import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; 

import { HomeListComponent } from './home-list/home-list.component';

// Define the application routes
const routes: Routes = [
  { path: '', component: HomeListComponent }, 
  { path: 'data', component: HomeListComponent },
];

@NgModule({
  declarations: [
    HomeListComponent, 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes) 
  ],
  providers: [],
  bootstrap: [HomeListComponent] 
})
export class AppModule { }
