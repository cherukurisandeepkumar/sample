import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Http, Headers, RequestOptions, Request, RequestMethod, ResponseContentType } from '@angular/http';
import { Message } from 'primeng/components/common/api';



let apiurl = "https://partner.acer.com.my/AcerFileUploadAPI/api/";

let apiurl1 ='https://partner.acer.com.my/LoginServices/api/';




@Injectable({
  providedIn: 'root'
})

export class DataService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  private headers1 = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  private options1 = new RequestOptions({ headers: this.headers1 });

  msgs: Message[] = [];
  public loading;
  loginToken;
  loginPassword;
  loginUserId;
  loginUserName;
  roleName;
  tempVar;
  loginUserType;
  public isAccepted;
  public errorCode: number;
  messages;
  show = false;
  quotationNo:string = '';

  redirect:boolean = false;

  constructor(
    private http: Http,
    private httpclient: HttpClient,
    private router: Router
  ) { }

  public ReturnErrorStatusmessage(err): any {​
    this.messages = [];
    if (err === 0) {​
      this.messages.push({​
        severity: 'error',
        summary: 'Some Error occoured! Please contact ISD.',
        detail: ''
      }​);
      return this.messages;
    }​
    else if(err === 401) {
      this.messages.push({​
        severity: 'error',
        summary: 'Some Error occoured! Please contact ISD.'
      }​);
      return this.messages;
    }​
    else if(err === 500) {​
      this.messages.push({​
        severity: 'error',
        summary: 'Some Error occoured! Please contact ISD.',
        detail: ''
      }​);
      return this.messages;
    }​
    else if(err === 400) {
      this.router.navigate(['/']);
      this.messages.push({​
        severity: 'error',
        summary: 'Some Error occoured! Please contact ISD.',
        detail: ''
      }​); 
      return this.messages;    ​
    }​
    else if(err === 503) {​
      this.messages.push({​
        severity: 'error',
        summary: 'Some Error occoured! Please contact ISD.',
        detail: ''
      }​);
      return this.messages;
    }​
    else {​
      this.messages.push({​
        severity: 'error',
        summary: 'Some Error occoured! Please contact ISD.',
        detail: ''
      }​);
      return this.messages;
    }​
  }​

  
  get(url: string = ''): Promise<any> {
    return this.http.get(apiurl + url, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

	login(data: any, url: string = ''): Promise<any> {
		return this.http.post(apiurl1 + url, JSON.stringify(data), this.options)
			.toPromise()
			.then(response => response.text())
			.catch(this.handleError);
	}

  post(data: any, url: string = ''): Promise<any> {
    this.options.headers.set('Authorization', "bearer" + " " + this.loginToken);
    return this.http.post(apiurl + url, JSON.stringify(data), this.options)
      .toPromise()
      .then((response: any) => response.json())
      .catch(this.handleError);
  }

  post1(data: any, url: string = ''): Promise<any> {
    this.options.headers.set('Authorization', "bearer" + " " + this.loginToken);
    return this.http.post(apiurl + url, JSON.stringify(data), this.options)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  // get1(url: string = ''): Promise<any> {
  //   return this.http.get(exporturl + url, this.options)
  //     .toPromise()
  //     .then(response => response.json())
  //     .catch(this.handleError);
  // }

  // post1(data: any, url: string = ''): Promise<any> {
  //   this.options.headers.set('Authorization', "bearer" + " " + this.loginToken);
  //   return this.http.post(exporturl + url, JSON.stringify(data), this.options)
  //     .toPromise()
  //     .then(response => response.json())
  //     .catch(this.handleError);
  // }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.json());
  }
  private handleError1(error: any): Promise<any> {
    return Promise.reject(error);
  }

  getinputs(url: string = ''): Promise<any> {
    return this.http.get(url, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  validation1 = { 
    isNumber: function (str) {
      var pattern = /^\d*\.?\d*$/;
      // /^\d+$/;
			return pattern.test(str);  // returns a boolean
		},
  }
  validateNum(event, value) {
		const newValue = event.target.value;
		if (this.validation1.isNumber(value) === false) {
		  event.target.value = newValue.slice(0, (newValue.length - 1));
		  value = event.target.value;
		} else {
		  //value.isRequired = false;
		  value = event.target.value;
		}
    }



}
