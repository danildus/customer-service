import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CustomersComponent } from './components/customers/customers.component';
import { Routes, RouterModule } from '@angular/router';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/modify', component: CustomerFormComponent },
  { path: 'customers/:customer_id/modify', component: CustomerFormComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomersComponent,
    CustomerFormComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatPaginatorModule,
    FormsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
