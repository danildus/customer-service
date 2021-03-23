import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

export interface Customers {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  editable: boolean;
}

const API_URL = 'http://localhost:8098/';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: Http) { }

  getCustomers(): Observable<Customers[]> {
    return this.http.get(API_URL + 'api/customers').map(res => res.json());
  }

  addCustomer(customer: { firstName: string, lastName: string, email: string, phoneNumber: string; }): Observable<Customers> {
    return this.http.post(API_URL + 'api/customers/add', customer).map(res => res.json());
  }

  updateCustomer(customer: { firstName: string; lastName: string; phoneNumber: string; id: number; email: string }): Observable<Customers> {
    return this.http.put(API_URL + 'api/customers/update/' + customer.id, customer).map(res => res.json());
  }

  deleteCustomer(customer: { id: number; }): Observable<Customers> {
    return this.http.delete(API_URL + 'api/customers/delete/' + customer.id).map(res => res.json());
  }
}
