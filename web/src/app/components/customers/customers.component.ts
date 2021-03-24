import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../service/customers.service';
import { Customers } from '../../model/customer';

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

  editCustomer(customer: Customers): any {
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
