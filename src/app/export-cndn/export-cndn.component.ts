import { Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
import * as moment from 'moment';

@Component({
  selector: 'app-export-cndn',
  templateUrl: './export-cndn.component.html',
  styleUrls: ['./export-cndn.component.scss']
})
export class ExportCndnComponent implements OnInit {
  // company:string = '';
  companyId: string = localStorage.getItem("companyId");
  status:string = '0';
  fromDate = '';
  toDate = '';
  strDate = '';
  enDate= ''
  ErrorModel:boolean = false;
  maxDate: Date; 
  dateValidation: boolean = false;
  filePath: string = '';
  submitClicked:boolean = false;
  validDate: boolean = false;
  emptyDate: boolean = false;
  customerList: any[];
  loader: boolean = false;
  overlay: boolean = false
  error: boolean = false;
  exported:boolean = false;
  submitDialog: boolean = false;
  emptyExpot: boolean = false;

  searchData = {
    "action": "ExportCNDN",
    "StartDate": "",
    "EndDate": "",
    "CompanyCode": "",
    "CompanyID": "7",
    "isExported": Number(this.status),
    "UserName": "aru"
  }

  companyData = {
    "action": "CustomerList"
  }
 
  constructor( private dataService: DataService)  {
    this.maxDate = new Date();
  }

  ngOnInit() {
    this.searchData.CompanyID = localStorage.getItem('companyId');
    this.loader = true;
    this.overlay = true;
    
    // this.dataService.post1(this.companyData, 'ExportCNDN').then ((result) => {
    //   this.customerList = result;
      
    //   this.loader = false;
    //   this.overlay = false;
    // }, err => {
    //   this.loader = false;
    //   this.overlay = false;
    //   this.error = true;
    //   this.ErrorModel = true;
    //   console.log(err);
    // });
    this.dataService.get("GetCustomerData?companyId=" + this.companyId).then((result) => { 
      this.loader= false;
      this.overlay = false;
        this.customerList = result;
      },
      (err) => {
        this.loader= false;
        this.overlay = false;
        this.ErrorModel = true;
      }
    );
  }

  changeCompany(e)  {
    this.searchData.CompanyCode = e.value.customerCode;
  }

  selectFromDate(e) {
    this.fromDate = moment(e).format('YYYY-MM-DD');
  }

  selecttoDate(e) {
    this.toDate = moment(e).format('YYYY-MM-DD');
  }

  search(e) {
    this.submitClicked = true
    if(this.status != '') {
      this.searchData.isExported = Number(this.status);
      this.searchData.StartDate = this.fromDate;
      this.searchData.EndDate = this.toDate;
      this.searchData.CompanyID = localStorage.getItem('companyId');
      this.searchData.UserName = localStorage.getItem('userName');

     if(this.fromDate != ''){
        if(this.toDate != '') {
          this.dateValidation = true;
        } else {
          this.dateValidation = false;
        }
      }
  
      if(this.toDate != ''){
        if(this.fromDate != '') {
          this.dateValidation = true;
        } else {
          this.dateValidation = false;
        }
      }
  
      if(this.toDate == '' && this.fromDate ==''){
        this.dateValidation = true;
        this.searchData.StartDate = "1900-01-01"
        this.searchData.EndDate = "1900-01-01"
      }

      if(this.dateValidation) {
        if(this.fromDate <= this.toDate) {
          this.loader = true;
          this.overlay = true;
          this.dataService.post(this.searchData, 'ExportCNDN').then ((result) => {
            this.loader = false;
            this.overlay = false;
            this.filePath = result[0].returnURL;
            if(this.filePath.length != 0) {
              window.open(this.filePath);
              this.exported = true;
              this.submitDialog = true;
            } else {
              this.exported = false;
              this.emptyExpot = true;
              this.ErrorModel = true;
            }
            this.reload(e);
          }, err => {
            this.loader = false;
            this.overlay = false;
            this.error = true;
            this.ErrorModel = true;
            this.reload(e);
          });
        } else {
          this.validDate = true;
          this.ErrorModel = true;
        }
      } else {
        this.emptyDate = true;
        this.ErrorModel =  true;
      }
    }
  }

  reload(e) {
    e.updateSelectedOption(null);
    this.fromDate = '';
    this.toDate = '';
    this.status = '0';
    this.dateValidation = false;
    this.strDate = '';
    this.enDate= ''
    this.searchData = {
      "action": "ExportCNDN",
      "StartDate": "1900-01-01",
      "EndDate": "1900-01-01",
      "CompanyCode": "",
      "CompanyID": "7",
      "isExported": 0,
      "UserName": "aru"
     }
     this.submitClicked = false;
     this.validDate = false;
     this.emptyDate = false;
  }

  cancelSubmitModal() {
    this.exported = false;
    this.submitDialog = false;
  }

  closeErrorModal() {
    this.ErrorModel = false;
    this.validDate = false;
    this.emptyDate = false;
    this.error = false;
    this.emptyExpot = false;
  }

}
