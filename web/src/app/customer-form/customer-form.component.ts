import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { Customers, CustomersService } from '../customers.service';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  errors = '';
  isLoading = false;

  constructor(private customersService: CustomersService) { }

  @Output()
  customerAdded: EventEmitter<Customers> = new EventEmitter<Customers>();

  // tslint:disable-next-line:typedef
  ngOnInit() { }

  // tslint:disable-next-line:typedef
  addCustomer(firstName: string, lastName: string, email: string, phoneNumber: string) {
    this.isLoading = true;
    this.customersService
      .addCustomer({
        firstName,
        lastName,
        email,
        phoneNumber,
      })
      .subscribe(
        customer => {
          this.isLoading = false;
          customer.firstName = firstName;
          customer.lastName = lastName;
          customer.email = email;
          customer.phoneNumber = phoneNumber;
          this.customerAdded.emit(customer);
        },
        error => {
          this.errors = error.json().errors;
          this.isLoading = false;
        }
      );
  }
}
