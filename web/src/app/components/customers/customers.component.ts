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
  searchTypeControl: FormControl = new FormControl('firstName');
  searchStringControl: FormControl = new FormControl('');

  constructor(private customersService: CustomersService) { }

  ngOnInit(): any {
    this.searchTypeControl.valueChanges.subscribe(
      () => {
        this.searchStringControl.setValue('');
      }
    );
    this.getCustomersBy(this.searchStringControl.value, this.searchTypeControl.value);
    this.searchStringControl.valueChanges.pipe(debounceTime(300)).subscribe(
      value => {
        this.getCustomersBy(value, this.searchTypeControl.value);
      }
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
        errors => {
          this.errors = errors.error.detail;
          this.isLoading = false;
        }
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
        errors => {
          this.errors = errors.error.detail;
          this.isLoading = false;
        }
      );
  }
}
