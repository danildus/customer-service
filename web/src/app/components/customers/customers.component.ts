import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../service/customers.service';
import { Customers } from '../../model/customer';
import { CustomerTransportService } from '../../service/customer-transport.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {

  customers: Customers[] = [];
  errorMessage: string | undefined;
  isLoading = true;
  errors = '';
  isSorted = false;
  searchString = '';
  searchType = '';

  constructor(private customersService: CustomersService, private customerTransportService: CustomerTransportService) {}

  ngOnInit(): any {
    this.getCustomers();
  }

  getCustomers(): any {
    this.customersService
      .getCustomers()
      .subscribe(
        customers => {
          this.customers = customers;
          this.isLoading = false;
        },
        error => this.errorMessage = (error as any)
      );
  }

  appendCustomer(customers: Customers): any {
    this.customers?.push(customers);
  }

  redirectToForm(customer: Customers): any {
    this.customerTransportService.customer = customer;
  }

  sortField(field: string): any {
    if (!this.isSorted) {
      // @ts-ignore
      this.customers?.sort((a, b) => a[field] > b[field] ? 1 : -1);
      this.isSorted = true;
    } else {
      this.customers?.reverse();
    }

  }

  deleteCustomer(customer: Customers, index: number): any {
    this.customersService
      .deleteCustomer( {
        id: customer.id
      })
      .subscribe(
        () => {
          this.isLoading = false;
          this.customers?.splice(index, 1);
        },
        error => {
          this.errors = error.json().errors;
          this.isLoading = false;
        }
      );
  }
}
