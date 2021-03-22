import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

export interface Customers {
  id: Number,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  isUpdating: boolean,
  editable: boolean
}

const API_URL: string = 'http://localhost:8098/';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: Http) { }

  getCustomers(): Observable<Customers[]> {
    console.log("CHECK");
    return this.http.get(API_URL + 'api/customers')
      .map(res => {
        let modifiedResult = res.json();
        modifiedResult = modifiedResult.map(function(customer: { isUpdating: boolean; }) {
          customer.isUpdating = false;
          return customer;
        });
        return modifiedResult;
      });
  }

  addCustomer(customer: { firstName: any, lastName: any, email: any, phoneNumber: any; }): Observable<Customers> {
    return this.http.post(API_URL + '/customers/add', customer).map(res => res.json());
  }

  updateCustomer(customer: { id: any, firstName: any, lastName: any, email: any, phoneNumber: any; }): Observable<Customers> {
    console.log("CHECKCHECK", customer);
    return this.http.put(API_URL + '/customers/update/' + customer.id, customer).map(res => res.json());
  }

  deleteCustomer(customer: { id: any; }): Observable<Customers> {
    return this.http.delete(API_URL + '/customers/delete/' + customer.id).map(res => res.json());
  }
}
