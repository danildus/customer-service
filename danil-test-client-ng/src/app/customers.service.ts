import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

export interface Customers {
  id: Number,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  editable: boolean
}

const API_URL: string = 'http://localhost:8098/';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: Http) { }

  getCustomers(): Observable<Customers[]> {
    return this.http.get(API_URL + 'api/customers').map(res => res.json());
  }

  addCustomer(customer: { firstName: String, lastName: String, email: String, phoneNumber: String; }): Observable<Customers> {
    return this.http.post(API_URL + 'api/customers/add', customer).map(res => res.json());
  }

  updateCustomer(customer: { firstName: String; lastName: String; phoneNumber: String; id: Number; email: String }): Observable<Customers> {
    return this.http.put(API_URL + 'api/customers/update/' + customer.id, customer).map(res => res.json());
  }

  deleteCustomer(customer: { id: Number; }): Observable<Customers> {
    return this.http.delete(API_URL + 'api/customers/delete/' + customer.id).map(res => res.json());
  }
}
