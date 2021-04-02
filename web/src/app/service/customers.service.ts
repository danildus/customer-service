import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Customers } from '../model/customer';
import { CustomerFilter } from '../model/customer-filter';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  getCustomer(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'api/customers/' + id);
  }

  getCustomersBy(customerFilter: CustomerFilter): Observable<any> {
    let params = new HttpParams();

    if (customerFilter.getFieldName() && customerFilter.getFieldValue()) {
      params = params.set('field', customerFilter.getFieldName());
      params = params.set('value', customerFilter.getFieldValue());
    }
    params = params.set('limit', String(customerFilter.getLimit()));
    params = params.set('offset', String(customerFilter.getPage() + 1));

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
