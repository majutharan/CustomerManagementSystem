import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import {User} from '../_models/index';
import {environment} from '../../environments/environment';
import {Customer} from '../_models/customer';

@Injectable()
export class CustomerService {

  constructor(private http: Http) {
  }

  getAll() {
    console.log('man');
    return this.http.get(environment.baseUrl + '/customer/allCustomer', this.jwt()).map((response: Response) => response.json());
  }
  create(customer: Customer) {
    console.log('customer servive');
    return this.http.post(environment.baseUrl + '/customer/create', customer, this.jwt())
      .map((response: Response) => {
        console.log('Response..' + response);
        response.json();
      });
  }

  update(customer: Customer) {
    return this.http.post(environment.baseUrl + '/customer/update?cid=' + customer.cid, customer).map((response: Response) => response.json());
  }

  deleteUser(cid: number) {
    return this.http.delete(environment.baseUrl + '/customer/delete?cid=' + cid).map((response: Response) => response.json());
  }

  view(cid: number) {
    console.log('man');
    return this.http.get(environment.baseUrl + '/customer/view?cid=' + cid, this.jwt()).map((response: Response) => response.json());
  }

  myCustomer(cid: number) {
    return this.http.get(environment.baseUrl + '/customer/myCustomer?cid=' + cid, this.jwt()).map((response: Response) => response.json());
  }
  private jwt() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers});
  }
}
