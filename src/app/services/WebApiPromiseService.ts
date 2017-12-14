import { Injectable } from "@angular/core";
import {
  Http,
  Response,
  Headers,
  RequestOptions
} from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class WebApiPromiseService {
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({
      "Content-Type": "application/json",
      Accept: "q=0.8;application/json;q=0.9"
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getService(url: string): Promise<any> {
    return this.http
      .get(url, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  // getService(
  //   url: string,
  //   options: RequestOptions,
  //   headers: Headers
  // ): Promise<any> {
  //   return this._http
  //     .get(url, this.options)
  //     .toPromise()
  //     .then(this.extractData)
  //     .catch(this.handleError);
  // }
  postService(
    url: string,
    options: RequestOptions,
    headers: Headers
  ): Promise<any> {
    return this.http
      .post(url, options, { headers })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }
}
