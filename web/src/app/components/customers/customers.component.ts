import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../service/customers.service';
import { Customers } from '../../model/customer';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {

  customers: Customers[] = [];
  errorMessage = '';
  isLoading = true;
  errors = '';
  isSorted = false;
  searchString = '';
  searchType = '';
  searchStringControl: FormControl = new FormControl();

  constructor(private customersService: CustomersService) { }

  ngOnInit(): any {
    this.getCustomers();
    this.searchStringControl.valueChanges.pipe(debounceTime(300)).subscribe(
      value => {
        if (value) {
          this.getCustomersBy(value, this.searchType);
        } else {
          this.getCustomers();
        }
      }
    );
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

  getCustomersBy(searchString: string, field: string): any {
    this.customersService
      .getCustomersBy(searchString, field)
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

  sortField(field: string): any {
    if (!this.isSorted) {
      // @ts-ignore
      this.customers?.sort((a, b) => a[field] > b[field] ? 1 : -1);
      this.isSorted = true;
    } else {
      this.customers?.reverse();
      this.isSorted = false;
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
