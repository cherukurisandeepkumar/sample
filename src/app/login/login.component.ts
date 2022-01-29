import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  userName:string = '';
  password:string = '';
  loginClicked:boolean = false;
  overlay:boolean = false;
  loader:boolean = false;
  id = 0;
  Messages:any[] = [];
  logindata = {
    Action: "VerifyLoginUser",
    Userid: "",
    Password: ""
  };

  constructor(private dataService: DataService,private router: Router,) { }

  ngOnInit() {}

  login() {
    this.loginClicked = true;
    this.logindata.Userid = this.userName;
    this.logindata.Password = this.password;
    if(this.userName != '' && this.password != ''){
      this.loader = true;
      this.overlay = true;
      this.dataService.login(this.logindata, 'AcerLogin').then ((result) => {
        // console.log(result);
        localStorage.setItem("samAccount", this.userName);
        this.router.navigate(["/fileupload"]);

        // if(result == 'Success') {
          // this.dataService.get('GetUserData?userName='+this.userName).then(result =>{
            // if(result == '{"Message" : "inavlid credentials"}'){
            //   this.loader = false;
            //   this.overlay = false;
            //   this.Messages = [];
            //   this.Messages.push({severity: 'error', summary: 'Invalid Credential!', details: ''});
            // } else {
              // localStorage.setItem("adAccount", result.adAccount);
              //     localStorage.setItem("companyId", result.companyId);
              //     localStorage.setItem("fullName", result.fullName);
              //     localStorage.setItem("samAccount", this.userName);
              //     localStorage.setItem("userId", result.userId);
                  localStorage.setItem("userName", this.userName);
              this.loader = false;
              this.overlay = false;
            // }
          // }, err => {
          //   this.loader = false;
          //   this.overlay = false;
          //   this.Messages = [];
          //   this.Messages.push({severity: 'error', summary: 'Some Error occoured! Kindly contact ISD.', details: ''});
          // });
        // } else {
        //   this.loader = false;
        //   this.overlay = false;
        //   this.Messages = [];
        //   this.Messages.push({severity: 'error', summary: 'Invalid credentials!', details: ''});
        // }
      }, err => {
        this.loader = false;
        this.overlay = false;
        this.Messages = [];
        this.Messages.push({severity: 'error', summary: 'Some Error occoured! Please contact ISD.', details: ''});
      });   
    }  
  }

}