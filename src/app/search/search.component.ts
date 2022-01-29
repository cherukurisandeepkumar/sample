import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})

export class SearchComponent implements OnInit {
  companyId: string = localStorage.getItem("companyId");
  loginId: string = localStorage.getItem("userId");
  loader: boolean = false;
  overlay: boolean = false;
  ErrorModel: boolean = false;
  upadateDetailsDialog: boolean = false;
  customerList: any[] = [];
  searchCols: any[];
  searchData: any[] = [];
  purposeList: any[];
  appliedList: any[];
  approvedList: any[];
  id: number;
  cndnNumber: string = "";
  purpose = 0;
  appliedBy: number = 0;
  approvedBy: number = 0;
  customer: string = "";
  cnStatus: string = "";
  bpmpStatus: string = '';
  appliedDate: string = "";
  cndnDate: string = "";
  customRadio = null;
  showTable: boolean = false;
  showSuccessDialog: boolean = false;
  successMessage: string = "";
  intial: boolean = false;
  datechanged:boolean = false;
  file: File = null;
  fileName: string = "";
  base64data;
  files = [];
  successfileUpload:boolean = false;
  emptyFile:boolean = false;
  updateClicked:boolean = false;
  
  singlesubmitData = [
    {
      DnCnId: 0,
      FileName: "",
      EncodeFile: "",
    },
  ];

  searchdata = {
    CnStatus: "",
    Customer: "",
    AppliedBy: 0,
    ApprovedBy: 0,
    DateApplied: "",
    Type: "",
    PurPoseId: 0,
    CompanyId: this.companyId,
    BpMpStatus: ''
  };

  companyData = {
    "action": "CustomerList"
  }

  updateData = {
    customer: "",
    purpose: "",
    cnAmount: "",
    dateApplied: "",
  };

  constructor(private dataService: DataService, private router: Router, private route:ActivatedRoute) {}

  ngOnInit() {
    this.searchCols = [
      { field: "dnCnId", header: "Id " },
      { field: "site", header: "Site" },
      { field: "customer", header: "Customer" },
      { field: "originalInvNo", header: "Original INV" },
      { field: "dnCnAmount", header: "Amount" },
      { field: "type", header: "Type" },
      { field: "purpose", header: "Purpose" },
      { field: 'vendorCn', header: 'Vendor CN' },
      { field: "dateApplied", header: "Date Applied" },
      { field: "appliedBy", header: "Applied By" },
      { field: "approvedBy", header: "Approved By(Level 1)" },
      { field: "bpMpId", header: "BPMP Id" },
      { field: "bpMpStatus", header: "BPMP Status(Final)" },
      { field: "financeAccountCode", header: "Finance Account Code" },
      { field: "cnNumber", header: "CN Number" },
      { field: "cnDate", header: "CN Date" },
      { field: "cnStatus", header: "CN Status" },
      { field: "source", header: "Source Ref ID" },
      { field: "detail", header: "Details" },
      { field: "remarks", header: "Remarks" },
      { field: "Print", header: "Print" },
      { field: "Update", header: "Update" },
      { field: "document", header: "Support Document" },
      { field: "Upload", header: "Upload Support Document" },
    ];

    this.searchData = [];

    this.getTableData();
    this.getPurpose();
    this.getappliedList();
    this.getapprovdList();
    this.getCustomers();
  }
  
  numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  getTableData() {
    this.loader = true;
    this.overlay = true;
    this.dataService.get("GetDnCnDetails?compnayId=" + this.companyId).then(
      (result) => {
        this.loader = false;
        this.overlay = false;
        this.searchData = result;
        this.searchData.map((e, index) => {
          e.index = index;
          e.Print = "print",
          e.Update = 'update';
          e.document = "doc",
          e.Upload = "upload";
          e.dnCnAmount = e.dnCnAmount;
          
          if(e.Update = 'update' && (e.cnStatus == 'Open' || e.cnStatus == 'closed' ) && e.bpMpStatus== 'Approved' ) {
            e.edit = true;
             e.Update = "update";
          }
          else {
            e.edit = false;
             e.Update = ""
          }
          
        });
        this.showTable = true;
        if(this.customerList.length > 0 && this.searchData.length > 0){
          this.loader = false;
          this.overlay = false;
        }
      },
      (err) => {
        this.loader = false;
        this.overlay = false;
        this.ErrorModel = true;
        this.emptyFile = false;
      }
    );
  }

  getCustomers() {
    this.loader= true;
    this.overlay = true;
    // this.dataService.post1(this.companyData, 'ExportCNDN').then ((result) => {
    //   this.customerList = result; 
    //   this.loader = false;
    //   this.overlay = false;
    // }, err => {
    //   this.loader = false;
    //   this.overlay = false;
    //   this.ErrorModel = true;
    //   console.log(err);
    // });
    this.dataService.get("GetCustomerData?companyId=" + this.companyId).then((result) => { 
      // this.loader= false;
      // this.overlay = false;
        this.customerList = result;
      },
      (err) => {
        this.loader= false;
        this.overlay = false;
        this.ErrorModel = true;
      }
    );
  }

  getPurpose() {
    // this.loader = true;
    // this.overlay = true;
    this.dataService.get("GetPurposeMasterData?companyId=" + this.companyId).then(
      (result) => { 
      // this.loader= false;
      // this.overlay = false;
        this.purposeList = result;
      },
      (err) => {
        this.loader= false;
        this.overlay = false;
        this.ErrorModel = true;
      }
    );
  }

  getappliedList() {
    // this.loader= true;
    // this.overlay = true;
    this.dataService.get("GetAppliedData?companyId=" + this.companyId).then(
      (result) => {
        // this.loader= false;
        // this.overlay = false;
        this.appliedList = result;
      },
      (err) => {
        this.loader= false;
        this.overlay = false;
        this.ErrorModel = true;
      }
    );
  }

  getapprovdList() {
    // this.loader= true;
    // this.overlay = true;
    this.dataService.get("GetApprovalData?companyId=" + this.companyId).then(
      (result) => {
        // this.loader= false;
        // this.overlay = false;
        this.approvedList = result;
      },
      (err) => {
        this.loader= false;
        this.overlay = false;
        this.ErrorModel = true;
      }
    );
  }

  search() {
    this.loader= true;
    this.overlay = true;
    this.dataService.post(this.searchdata, "SearchDnCn").then(
      (result) => {
        this.searchData = result;
        this.searchData.map((e, index) => {
          e.index = index;
          e.Print = "print",
          e.Update = 'update';
          e.document = "doc",
          e.Upload = "upload";
          e.dnCnAmount = e.dnCnAmount;
          
          if(e.Update = 'update' && (e.cnStatus == 'Open' || e.cnStatus == 'closed' ) && e.bpMpStatus== 'Approved' ) {
            e.edit = true;
             e.Update = "update";
          }
          else {
            e.edit = false;
             e.Update = ""
          }
          
        });
        this.loader= false;
        this.overlay = false;
        this.showTable = true;
      },
      (err) => {
        this.loader= false;
        this.overlay = false;
        this.ErrorModel = true;
        this.emptyFile = false;
      }
    );
  }

  _doUpdate(data) {
    this.id = data.dnCnId;
    this.updateData.customer = data.customer;
    this.updateData.purpose = data.purpose;
    this.updateData.cnAmount = data.dnCnAmount;
    this.updateData.dateApplied = data.dateApplied;
    this.cndnNumber = data.cnNumber;
    this.cndnDate = data.cnDate;
    this.upadateDetailsDialog = true;
  }

  UpdateCN() {
    // if(this.cndnNumber == null) {
    //   this.cndnNumber = '';
    // } 
    // if(this.cndnDate == null) {
    //   this.cndnDate = ''
    // }
    this.updateClicked = true;
    
    if (this.cndnNumber != "" && this.cndnDate != "") {
      if (this.datechanged === false) {
        this.cndnDate = this.dateFormat(this.cndnDate);
      }
      this.dataService.get(
          "UpdateDnCn?dncnId=" +this.id +"&cnNumber=" +this.cndnNumber +"&cnDate=" +this.cndnDate +"&loginId=" +this.loginId
        )
        .then(
          (result) => {
            // this.loader = false;
            // this.overlay = false;
            this.datechanged = false;
            this.upadateDetailsDialog = false;
            this.getTableData();
            this.cndnDate = "";
            this.cndnNumber = "";
            this.showSuccessDialog = true;
            this.updateClicked = false;
          },
          (err) => {
            this.updateClicked = false;
            this.loader = true;
            this.overlay = true;
            this.upadateDetailsDialog = false;
            this.getTableData();
            this.cndnDate = "";
            this.cndnNumber = "";
            this.ErrorModel = true;
          }
        );
    } else {
      this.loader = false;
      this.overlay = false;
    }
  }

  coloseUpdateModal() {
    this.cndnDate = "";
    this.cndnNumber = "";
    this.upadateDetailsDialog = false;
    this.updateClicked = false;
  }

  _doPrint(rowData) {
    this.id = rowData.dnCnId;
  }

  changePurpose(val) {
    this.searchdata.PurPoseId = val;
  }

  changeAppliedBy(val) {
    this.searchdata.AppliedBy = val;
  }

  changeApprovedBy(e) {
    this.searchdata.ApprovedBy = Number(e);
  }

  changeCustomer(val) {
    this.searchdata.Customer = val;
  }

  changeCompany(e) {
    this.searchdata.Customer = e.value.customerCode;
  }

  changecnStatus(val) {
    this.searchdata.CnStatus = val;
  }

  changeDate(val) {
    this.searchdata.DateApplied = moment(val).format('DD/MM/YYYY');
  }

  changeCndnDate(val) {
    this.datechanged = true;
    this.cndnDate = moment(val).format('MM/DD/YYYY');
  }

  dateFormat(val) {
    var datearray = val.split("/");
    var newdate = datearray[1] + "/" + datearray[0] + "/" + datearray[2];
    return newdate;
  }

  changeType(e) {
    this.searchdata.Type = e.target.value;
  }

  _uploadFile(event: any, data) {
    
    var cndn = data.dnCnId;
    this.singlesubmitData[0].DnCnId = cndn;
    var that=this;
    if(event.target.files && event.target.files.length > 0){
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        var data=reader.result.toString()
        var splited=data.split(",")[1];
        //name.push(file.name);
        that.singlesubmitData[0].FileName = file.name.replace(" ", "_");
        that.singlesubmitData[0].EncodeFile = splited;
      };
      reader.onerror = function (error) {
      };
    }



    // var cndn = data.dnCnId;
    // this.singlesubmitData[0].DnCnId = cndn;
    // var name = [];
    // var fileData: any;
    // var that = this;
    // if (event.target.files && event.target.files.length > 0) {
    //   fileData = event.target.files;

    //   $(fileData).each(function (i, obj) {
    //     name.push(obj.name);
    //   });

    //   $.each(fileData, function (index, val) {
    //     let reader = new FileReader();
    //     reader.readAsDataURL(val);
    //     reader.onload = () => {
    //       var data = reader.result.toString();
    //       var splited = data.split(",")[1];

    //       that.singlesubmitData[0].FileName = val.name.replace(" ", "_");
    //       that.singlesubmitData[0].EncodeFile = splited;
    //     };
    //   });
    // }
  }

  fileUpload(rowData) {
    if (this.singlesubmitData[0].EncodeFile == "") {
      this.ErrorModel = true;
      this.emptyFile = true;
    } else {
      this.loader = true;
      this.overlay = true;
      this.dataService.post(this.singlesubmitData, "UpdateSupportDocument").then(
          (result) => {
            this.singlesubmitData[0].DnCnId = 0;
            this.singlesubmitData[0].FileName = "";
            this.singlesubmitData[0].EncodeFile = "";
            this.getTableData();
            // this.loader = false;
            // this.overlay = false;
            this.successfileUpload = true;
            this.showSuccessDialog = true;
          },
          (err) => {
            this.loader = false;
            this.overlay = false;
            this.ErrorModel = true;
          }
        );
    }
  }

  refresh(e) {
    e.updateSelectedOption(null);
    this.purpose = 0;
    this.appliedBy = 0;
    this.approvedBy = 0;
    this.customer = "";
    this.searchdata.AppliedBy = 0;
    this.searchdata.ApprovedBy = 0;
    this.searchdata.CnStatus = "";
    this.searchdata.Customer = "";
    this.searchdata.PurPoseId = 0;
    this.searchdata.DateApplied = '';
    this.searchdata.BpMpStatus = '';
    this.cnStatus = "";
    this.bpmpStatus = '';
    this.appliedDate = "";
    this.cndnDate = "";
    this.intial = false;
    this.customRadio = null;
    this.getTableData();
    this.router.navigate(['/search'],{relativeTo:this.route})
  }

  removeFile() {
    this.singlesubmitData[0].EncodeFile = '';
    this.getTableData();
  }

  closeErrorModal() {
    this.ErrorModel = false;
    this.emptyFile = false;
  }

  closeSuccessModal() {
    this.showSuccessDialog = false;
    this.successfileUpload = false;
  }

}
