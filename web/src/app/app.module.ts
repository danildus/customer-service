import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { Routes, RouterModule } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'customers', component: CustomersComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomersComponent,
    CustomerFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
