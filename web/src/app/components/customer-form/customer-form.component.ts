import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../service/customers.service';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CustomerTransportService } from '../../service/customer-transport.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  errors = '';
  isLoading = false;
  myForm: FormGroup;
  isCreate: boolean | undefined;
  isUpdate: boolean | undefined;

  constructor(private customersService: CustomersService, private customerTransportService: CustomerTransportService, private router: Router) {
    console.log('CUSTOMER_CHECK', this.customerTransportService.customer);
    if (this.customerTransportService.customer) {
      this.isUpdate = true;
    } else {
      this.isCreate = true;
    }
    console.log('CUSTOMER_UPDATE', this.isUpdate);
    console.log('CUSTOMER_CREATE', this.isCreate);

    this.myForm = new FormGroup({
      userFirstName: new FormControl(this.customerTransportService.customer?.firstName, Validators.required),
      userLastName: new FormControl(this.customerTransportService.customer?.lastName, Validators.required),
      userEmail: new FormControl(this.customerTransportService.customer?.email, [
        Validators.required,
        Validators.pattern(
          '[a-zA-Z_]+@[a-zA-Z_]+?.[a-zA-Z]{2,3}'
        )
      ]),
      userPhone: new FormControl(this.customerTransportService.customer?.phoneNumber, [
        Validators.required,
        Validators.pattern(
          '[0-9]{10}'
        ),
      ]),
    });
  }

  ngOnInit(): any { }

  addCustomer(firstName: string, lastName: string, email: string, phoneNumber: string): any {
    this.isLoading = true;
    this.customersService
      .addCustomer({
        firstName,
        lastName,
        email,
        phoneNumber,
      })
      .subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['/customers']);
        },
        error => {
          this.errors = error.json().detail;
          this.isLoading = false;
        }
      );
  }

  editCustomer(firstName: string, lastName: string, email: string, phoneNumber: string): any {
    this.customersService
      .updateCustomer({
        // @ts-ignore
        id: this.customerTransportService.customer.id,
        firstName,
        lastName,
        email,
        phoneNumber
      })
      .subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['/customers']);
        },
        error => {
          this.errors = error.json().errors;
          this.isLoading = false;
        }
      );
  }
}
