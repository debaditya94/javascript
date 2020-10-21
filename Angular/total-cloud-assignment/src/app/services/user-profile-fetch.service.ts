import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ServiceConstants } from '../config/Endpoints';

@Injectable({
  providedIn: 'root'
})
export class UserProfileFetchService {

  constructor(private httpClient: HttpClient) { }

  fetchUsersList() {
    return this.httpClient.get(ServiceConstants.FETCH_USER_INFO + '?delay=3');
  }
  fetchUserDetail(id) {
    return this.httpClient.get(ServiceConstants.FETCH_USER_INFO + '/' + id);
  }
}
