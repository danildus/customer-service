import { Injectable } from '@angular/core';
import { Customers } from '../model/customer';

@Injectable({
  providedIn: 'root'
})

export class CustomerTransportService {
  customer: Customers | undefined;
}
