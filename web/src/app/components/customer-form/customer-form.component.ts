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
  customer = new Customers();

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
            this.getForm();
          },
          errors => {
            this.errors = errors.error.detail;
            this.isLoading = false;
          }
        );
    } else {
      this.isCreate = true;
      this.getForm();
    }
  }

  getForm(): any {
    this.myForm = new FormGroup({
      firstName: new FormControl(this.customer.firstName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      lastName: new FormControl(this.customer.lastName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      email: new FormControl(this.customer.email, [
        Validators.required,
        Validators.email
      ]),
      phoneNumber: new FormControl(this.customer.phoneNumber, [
        Validators.required,
        Validators.pattern(
          '^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$'
        ),
      ]),
    });
  }

  addCustomer(): any {
    this.isLoading = true;
    Object.assign(this.customer, this.myForm?.value);
    this.customersService
      .addCustomer(this.customer)
      .subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['/customers']);
        },
        errors => {
          this.errors = errors.error.detail;
          this.isLoading = false;
        }
      );
  }

  editCustomer(): any {
    Object.assign(this.customer, this.myForm?.value);
    this.customersService
      .updateCustomer(this.customer)
      .subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['/customers']);
        },
        errors => {
          this.errors = errors.error.detail;
          this.isLoading = false;
        }
      );
  }
}
