import {Component, OnInit, ViewChild} from '@angular/core';
import { CustomersService } from '../../service/customers.service';
import { Customers } from '../../model/customer';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { CustomerFilter } from '../../model/customer-filter';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {

  customers: Customers[] = [];
  customerFilter = new CustomerFilter();
  errorMessage = '';
  isLoading = true;
  errors = '';
  isSorted = false;
  searchString = '';
  searchTypeControl: FormControl = new FormControl('firstName');
  searchStringControl: FormControl = new FormControl('');
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Customers>();
  pageEvent: PageEvent = new PageEvent();

  constructor(private customersService: CustomersService) { }

  ngOnInit(): any {
    this.searchTypeControl.valueChanges.subscribe(
      () => {
        this.searchStringControl.setValue('');
      }
    );
    this.getCustomersBy(this.pageEvent);
    this.searchStringControl.valueChanges.pipe(debounceTime(300)).subscribe(
      value => {
        this.customerFilter.setFieldName(this.searchTypeControl.value);
        this.customerFilter.setFieldValue(value);
        this.getCustomersBy(this.pageEvent);
      }
    );
  }

  getCustomersBy(event: PageEvent): any {
    if (Object.keys(event).length !== 0) {
      this.customerFilter.setPage(event.pageIndex);
      this.customerFilter.setLimit(event.pageSize);
    }
    this.customersService
      .getCustomersBy(this.customerFilter)
      .subscribe(
        customers => {
          this.customers = customers.items;
          this.customerFilter.setItemLength(customers.totalItemCount);
          this.dataSource = new MatTableDataSource<Customers>(this.customers);
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
    this.dataSource = new MatTableDataSource<Customers>(this.customers);
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
          this.dataSource = new MatTableDataSource<Customers>(this.customers);
        },
        errors => {
          this.errors = errors.error.detail;
          this.isLoading = false;
        }
      );
  }
}
