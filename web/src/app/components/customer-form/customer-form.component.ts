import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../service/customers.service';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customers } from '../../model/customer';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  errors = '';
  isLoading = false;
  myForm?: FormGroup;
  isCreate = false;
  isUpdate = false;
  customer: Customers = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  };

  constructor(private customersService: CustomersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): any {
    if (this.route.snapshot.params.customer_id) {
      this.isUpdate = true;
      this.customersService
        .getCustomer(this.route.snapshot.params.customer_id)
        .subscribe(
          customer => {
            this.customer = customer;
            this.getForm(customer);
            console.log('CUSTOMER', this.customer);
          },
          error => {
            this.errors = error.json();
            this.isLoading = false;
          }
        );
    } else {
      this.isCreate = true;
      this.getForm(this.customer);
    }
  }

  getForm(customer: Customers): any {
    this.myForm = new FormGroup({
      userFirstName: new FormControl(customer.firstName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      userLastName: new FormControl(customer.lastName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      userEmail: new FormControl(customer.email, [
        Validators.required,
        Validators.email
      ]),
      userPhone: new FormControl(customer.phoneNumber, [
        Validators.required,
        Validators.pattern(
          '^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$'
        ),
      ]),
    });
  }

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
          this.errors = error.json();
          this.isLoading = false;
        }
      );
  }

  editCustomer(id: number, firstName: string, lastName: string, email: string, phoneNumber: string): any {
    this.customersService
      .updateCustomer({
        // @ts-ignore
        id,
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
          this.errors = error.json();
          this.isLoading = false;
        }
      );
  }
}
