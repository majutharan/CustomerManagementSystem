import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import {User} from '../_models/index';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  getAll() {
    console.log('man');
    return this.http.get(environment.baseUrl + '/user/alluser', this.jwt()).map((response: Response) => response.json());
  }

  create(user: User) {
    console.log('mandy');
    return this.http.post(environment.baseUrl + '/user/create', user, this.jwt())
      .map((response: Response) => response.json());
  }

  update(user: User) {
    return this.http.post(environment.baseUrl + '/user/update?uid=' + user.id, user, this.jwt()).map((response: Response) => response.json());
  }

  deleteUser(id: number) {
    return this.http.delete(environment.baseUrl + '/user/delete?id=' + id).map((response: Response) => response.json());
  }

  view(id: number) {
    console.log('man');
    return this.http.get(environment.baseUrl + '/user/view?id=' + id, this.jwt()).map((response: Response) => response.json());
  }

  private jwt() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers});
  }
}
