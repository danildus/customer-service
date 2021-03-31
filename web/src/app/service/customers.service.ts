import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Customers } from '../model/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  getCustomer(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'api/customers/' + id);
  }

  getCustomersBy(searchString?: string, field?: string): Observable<any> {
    let params = new HttpParams();
    if (field && searchString) {
      params = params.set('field', field);
      params = params.set('value', searchString);
    }
    return this.http.get(environment.apiUrl + 'api/customers', {params});
  }

  addCustomer(customer: Customers): Observable<any> {
    return this.http.post(environment.apiUrl + 'api/customers', customer);
  }

  updateCustomer(customer: Customers): Observable<any> {
    return this.http.put(environment.apiUrl + 'api/customers/' + customer.id, customer);
  }

  deleteCustomer(customer: { id: number; }): Observable<any> {
    return this.http.delete(environment.apiUrl + 'api/customers/' + customer.id);
  }
}
