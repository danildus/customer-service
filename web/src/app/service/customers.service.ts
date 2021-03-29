import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Customers } from '../model/customer';
import { environment} from '../../environments/environment';
import 'rxjs/add/operator/map';

const API_URL = 'http://localhost:8098/';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: Http) { }

  getCustomer(id: number): Observable<Customers> {
    return this.http.get(environment.apiUrl + 'api/customers/' + id).map(res => res.json());
  }

  getCustomers(): Observable<Customers[]> {
    return this.http.get(environment.apiUrl + 'api/customers').map(res => res.json());
  }

  getCustomersBy(searchString: string, field: string): Observable<Customers[]> {
    return this.http.get(environment.apiUrl + 'api/customers/' + field + '/' + searchString).map(res => res.json());
  }

  addCustomer(customer: { firstName: string, lastName: string, email: string, phoneNumber: string; }): Observable<Customers> {
    return this.http.post(environment.apiUrl + 'api/customers', customer).map(res => res.json());
  }

  updateCustomer(customer: { firstName: string; lastName: string; phoneNumber: string; id: number; email: string }): Observable<Customers> {
    return this.http.put(environment.apiUrl + 'api/customers/' + customer.id, customer).map(res => res.json());
  }

  deleteCustomer(customer: { id: number; }): Observable<Customers> {
    return this.http.delete(environment.apiUrl + 'api/customers/' + customer.id).map(res => res.json());
  }
}
