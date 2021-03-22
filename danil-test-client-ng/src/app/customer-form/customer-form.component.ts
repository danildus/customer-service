import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { Customers, CustomersService } from '../customers.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  errors: string = '';
  isLoading: boolean = false;

  constructor(private customersService: CustomersService) { }

  @Output()
  customerAdded: EventEmitter<Customers> = new EventEmitter<Customers>();

  ngOnInit() {
  }

  addCustomer(firstName: any, lastName: any, email: any, phoneNumber: any) {
    this.isLoading = true;
    this.customersService
      .addCustomer({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
      })
      .subscribe(
        customer => {
          this.isLoading = false;
          customer.isUpdating = false;
          this.customerAdded.emit(customer);
        },
        error => {
          this.errors = error.json().errors;
          this.isLoading = false;
        }
      );
  }

  updateCustomer(id: any ,firstName: any, lastName: any, email: any, phoneNumber: any) {
    console.log("POINT", firstName);
    this.isLoading = true;
    this.customersService
      .updateCustomer({
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber
      })
      .subscribe(
        customer => {
          this.isLoading = false;
          customer.isUpdating = false;
          this.customerAdded.emit(customer);
        },
        error => {
          this.errors = error.json().errors;
          this.isLoading = false;
        }
      );
  }

}
