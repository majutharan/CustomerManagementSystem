import {Component, OnInit, ViewChild} from '@angular/core';
import {Customer} from '../_models/customer';
import {ModalDirective} from 'ngx-bootstrap';
import {CustomerService} from '../_services/customer.service';
import {User} from '../_models';
import {FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl} from '@angular/forms';

@Component({
  templateUrl: 'customer.component.html',
  styleUrls: ['customer.style.css'],
  providers: []
})
export class CustomerComponent implements OnInit {
  model: Customer = new Customer();
  isCreateUser = false;
  isUpdateUser = false;
  isBackUser = false;
  allCustomer: Customer[];
  currentUser: User;
  isCustomerShow = false;
  isCustomerDelete = true;
  phoneNumber = [];
  public date: Date = new Date();
  public check;
  public checkOk;
  customerAdd = true;
  customerEdit = true;
  form: FormGroup;
  public alerts: any = [];

  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  @ViewChild('staticModal') public staticModal: ModalDirective;

  constructor(private customerServive: CustomerService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    console.log('customercomponent');
    this.formValidate();
    this.loadAllCustomer();
    setInterval(() => {
      this.date = new Date();
    }, 1);
    console.log('date');
    this.check = this.date.getDate() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getFullYear();
    console.log(this.check.toString());
  }

  formValidate() {
    this.form = this.formBuilder.group({
      'firstName': [null, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      'lastName': [null],
      'email': [null, [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      'phoneNumber': [null, [Validators.required]],
    });
  }
  openAddNewWindow() {
    this.customerAdd = false;
    this.customerEdit = true;
    this.model = new Customer();
    this.staticModal.show();
    this.isCreateUser = false;
    this.isBackUser = false;
    this.isUpdateUser = true;
    console.log('all customers real time');
    console.log(this.allCustomer);
    let i;
    for (i = 0; i < this.allCustomer.length; i++) {
      this.phoneNumber.push({'phoneNumber': this.allCustomer[i].phoneNumber});
    }
    console.log('phone numbers');
    console.log(this.phoneNumber);
  }

  loadAllCustomer() {
    this.customerServive.getAll().subscribe(data => {
      console.log('allcustomers');
      console.log(data);
      this.allCustomer = data;
    });
  }

  registerCustomer() {
    this.checkPhoneNumber();
    console.log(this.checkOk);
    if (this.form.invalid) {
      console.log('error');
      this.loadError();
    }else {
    if (this.checkOk !== 'incorrect') {
      this.model.createdDate = this.check;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.model.createdBy = this.currentUser.firstName;
      this.customerServive.create(this.model).subscribe(data => {
        console.log(data);
        this.loadAllCustomer();
        this.staticModal.hide();
        this.form.reset();
      });
    } else {
      console.log('phone no already exists');
    }}
  }

  updateCustomer(customer: Customer) {
    this.customerEdit = false;
    this.customerAdd = true;
    this.model = customer;
    this.staticModal.show();
    this.isCreateUser = true;
    this.isBackUser = true;
    this.isUpdateUser = false;
  }

  update() {
    if (this.form.invalid) {
      console.log('error');
      this.loadError();
      this.loadAllCustomer();
    }else {
      this.customerServive.update(this.model).subscribe(data => {
      this.staticModal.hide();
      this.form.reset();
      this.loadAllCustomer();
    });
    }
  }

  deleteCustomer(cid: number) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.customerServive.myCustomer(cid).subscribe(data => {
      if (this.currentUser.role === 'SUPER_ADMIN' || this.currentUser.firstName === data.createdBy) {
        this.customerServive.deleteUser(cid).subscribe(() => {
          this.loadAllCustomer();
          this.dangerModal.hide();
        });
      } else {
        this.dangerModal.hide();
        console.log('error delete');
      }
    });
  }

  openCustomerDrop(cid: number) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.customerServive.myCustomer(cid).subscribe(data => {
      if (this.currentUser.role === 'SUPER_ADMIN') {
        this.isCustomerDelete = false;
      }
      if (this.currentUser.role === 'SUPER_ADMIN' || this.currentUser.firstName === data.createdBy) {
        this.isCustomerShow = false;
      } else {
        this.isCustomerShow = true;
        console.log('error delete ppppppppp');
      }
    });
  }

  checkPhoneNumber() {
    for (let x = 0; x < this.phoneNumber.length; x++) {
      console.log(this.phoneNumber[x].phoneNumber);
      if (this.phoneNumber[x].phoneNumber === this.model.phoneNumber) {
        this.checkOk = 'incorrect';
      }
    }
  }
  loadError() {
    this.alerts.push({
      type: 'danger',
      msg: `Please fill the required field`,
      timeout: 2000
    });
  }

  closeBtn() {
    this.staticModal.hide();
    this.form.reset();
  }
}

