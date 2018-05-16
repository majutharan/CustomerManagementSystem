import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../_services/user.service';
import {User} from '../_models/user';
import {ActivatedRoute, Router} from '@angular/router';
import * as jsPDF from 'jspdf';
import {Location} from '@angular/common';

@Component({
  templateUrl: 'user-view.component.html',
  providers: [UserService],
  styleUrls: ['user.style.css']
})
export class UserViewComponent implements OnInit {
  model: User = new User();
  disabled = true;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private _location: Location) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = +params['id']; // (+) converts string 'id' to a number
      console.log('Id..........' + id);
      this.userService.view(id).subscribe(data => {
        this.model = data;
      });
    });

  }
  backLoc() {
    this._location.back();
  }
}
