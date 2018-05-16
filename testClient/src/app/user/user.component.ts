import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';
import {Location} from '@angular/common';
import {AuthenticationService} from '../_services';
import {FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl} from '@angular/forms';


@Component({
  templateUrl: 'user.component.html',
  styleUrls: ['user.style.css'],
  providers: [UserService, AuthenticationService],
})

export class UserComponent implements OnInit {
  model: User = new User();
  allUser: User [];
  isCreateUser = false;
  isUpdateUser = false;
  isBackUser = false;
  alerts: any = [];
  checked = false;
  isSuperAdmin = false;
  disabledForUser = false;
  currentUser: User;
  editUser = true;
  addUser = true;
  form: FormGroup;
  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  @ViewChild('staticModal') public staticModal: ModalDirective;

  constructor(private router: Router,
              private userService: UserService,
              private location: Location,
              private authenticationService: AuthenticationService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.userValidation();
    this.loadAllUser();
  }

  userValidation() {
    this.form = this.fb.group({
      'firstName': [null, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      'lastName': [null, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      'email': [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      'password': [null, [Validators.required]],
    });
  }

  loadAllUser() {
    this.userService.getAll().subscribe(data => {
      console.log('user_details');
      console.log(data);
      this.allUser = data;
    });
  }

  deleteUser(id: number) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser.id === id) {
      console.log('you cannot delete');
    }else {
      this.userService.deleteUser(id).subscribe(data => {
          this.loadAllUser();
        },
        error => {
          console.log('error');
          console.log(error);
        });
      this.dangerModal.hide();
    }
  }

  openAddNewWindow() {
    this.model = new User();
    this.staticModal.show();
    this.isCreateUser = false;
    this.isBackUser = false;
    this.isUpdateUser = true;
    this.checked = false;
    this.addUser = false;
    this.editUser = true;
    this.disabledForUser = true;
  }


  update() {
    if (this.form.invalid) {
      console.log('error');
      this.loadError();
    } else {
      console.log('modal.................');
      console.log(this.model);
      this.userService.update(this.model)
        .subscribe(
          data => {
            console.log('data');
            // this.authenticationService.login(this.model.email, this.model.password).subscribe();
            this.loadAllUser();
            this.staticModal.hide();
            this.userAlertUpdate();
            this.form.reset();
          },
          error => {
            console.log('error.................');
            console.log(error);
            this.userError();
          });
    }
  }

  register() {
    if (this.form.invalid) {
      console.log('error');
      this.loadError();
    } else {
      console.log('modal.................');
      console.log(this.model);
      this.model.role = 'ADMIN';
      this.userService.create(this.model)
        .subscribe(
          data => {
            console.log('data');
            this.loadAllUser();
            this.staticModal.hide();
            this.form.reset();
          },
          error => {
            console.log('error.................');
            console.log(error);
          });
    }
  }

  updateUser(user: User) {
    this.editUser = false;
    this.addUser = true;
    this.model = user;
    this.staticModal.show();
    this.disabledForUser = true;
    this.isCreateUser = true;
    this.isBackUser = true;
    this.isUpdateUser = false;
  }

  userError() {
    this.alerts.push({
      type: 'danger',
      msg: `User Server ERROR`,
      timeout: 1500
    });
  }

  userAlertUpdate() {
    this.alerts.push({
      type: 'info',
      msg: `successfully Updated`,
      timeout: 1500
    });
  }

  openDropDown() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser.role);
    if (this.currentUser.role === 'SUPER_ADMIN') {
      this.isSuperAdmin = false;
    } else {
      this.isSuperAdmin = true;
    }
  }

  loadError() {
    this.alerts.push({
      type: 'danger',
      msg: `Please fill the required field`,
      timeout: 2000
    });
  }

  closeUserForm() {
    this.staticModal.hide();
    this.form.reset();
    this.loadAllUser();
  }

}
