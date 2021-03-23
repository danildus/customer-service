import { Component, OnInit } from '@angular/core';
import { Customers, CustomersService } from '../customers.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {

  customers: Customers[] | undefined;
  errorMessage: string | undefined;
  isLoading: boolean = true;
  errors: string = '';

  constructor(private customersService: CustomersService) {}

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.customersService
      .getCustomers()
      .subscribe(
        customers => {
          this.customers = customers;
          this.isLoading = false;
        },
        error => this.errorMessage = <any>error
      );
  }

  appendCustomer(customers: Customers) {
    // @ts-ignore
    this.customers.push(customers);
  }

  editCustomer(customer: Customers) {
    customer.editable = !customer.editable;

    if (!customer.editable) {
      this.customersService
        .updateCustomer({
          id: customer.id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phoneNumber: customer.phoneNumber
        })
        .subscribe(
          () => {
            this.isLoading = false;
          },
          error => {
            this.errors = error.json().errors;
            this.isLoading = false;
          }
        );
    }
  }

  deleteCustomer(customer: Customers, number: Number) {
    this.customersService
      .deleteCustomer( {
        id: customer.id
      })
      .subscribe(
        customer => {
          this.isLoading = false;
          // @ts-ignore
          this.customers.splice(number, 1);
        },
        error => {
          this.errors = error.json().errors;
          this.isLoading = false;
        }
      )
  }
}
