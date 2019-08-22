import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

const httpOptions = {
    headers: new HttpHeaders({
      'enctype': 'multipart/formdata',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    })
  }

@Injectable()
export class PostProvider {
    server = "http://custom.com/"

    constructor(public http : HttpClient) {

    }

    postData(body, file) {
        return this.http.post(this.server + file, JSON.stringify(body), 
        httpOptions);
    }
}