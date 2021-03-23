import { Component, OnInit } from '@angular/core';
import { Customers, CustomersService } from '../customers.service';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {

  customers: Customers[] | undefined;
  errorMessage: string | undefined;
  isLoading = true;
  errors = '';

  constructor(private customersService: CustomersService) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getCustomers();
  }

  // tslint:disable-next-line:typedef
  getCustomers() {
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

  // tslint:disable-next-line:typedef
  appendCustomer(customers: Customers) {
    // @ts-ignore
    this.customers.push(customers);
  }

  // tslint:disable-next-line:typedef
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

  // tslint:disable-next-line:typedef
  deleteCustomer(customer: Customers, index: number) {
    this.customersService
      .deleteCustomer( {
        id: customer.id
      })
      .subscribe(
        () => {
          this.isLoading = false;
          // @ts-ignore
          this.customers.splice(index, 1);
        },
        error => {
          this.errors = error.json().errors;
          this.isLoading = false;
        }
      );
  }
}
