import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'app-upload-cndn',
  templateUrl: './upload-cndn.component.html',
  styleUrls: ['./upload-cndn.component.scss']
})
export class UploadCndnComponent implements OnInit {
  configDataCols = [];
  configData = [];
  fileUploadData = {
    "EncodeBase64": "",
    "FileName": "",
    "CreatedBy": 0,
    "CompanyId": 0
  }
  // fileUploadMain = {
  //   "EncodeBase64":"",
  //   "FileName":"DNCNUpload.xlsx",
  //   "CreatedBy": '',
  //   "CompanyId": ''
  // }
  gst = false; // can be replaced by gstapplied
  Incentive: boolean = false;
  totall = 0;
  id = 0;//change name
  userid = Number(localStorage.getItem('userId'));
  purPoseMasterId = 0;
  companyId = localStorage.getItem('companyId');
  createdBy = localStorage.getItem('userId');
  isSelectAll=false;

  //multiple -------------------------
  mutipleInvoiceNumber: string = '';
  invalidMultipleIncoice: boolean = false;
  existInvoice: boolean = false;
  multipleDetailsDialog = false;
  multipleInvoiceSearchClicked: boolean = false;
  showTable: boolean = false;
  invoicelist = [];
  userData3: any[];
  userData2: any[];
  multisubmitList;
  multipleModalData: any = {
    customer: '',
    customerCode: '',
    fob: '',
    invoiceNumber: '',
    location: '',
    productsList: [],
    site: '',
    soNumber: ''

    
  };
  multipleInvoice: boolean;
  multiSearch: boolean = false;
  mutipleSubmitClicked: boolean = false;
  programId = '';
  purposeData = {
    financeAccountCode: '',
    template: '',
    CreditDebit: false,


  }
  cols = [];
  cols2 = [
    { field: "partNumber", header: "Part No " },
    { field: "pGroup", header: "PGroup" },
    { field: "pLine", header: "Pline" },
    { field: "description", header: "Description" },
    { field: "unitPrice", header: "Unit Price" },
    { field: "invoiceQuantity", header: "Inv Qty" },
    { field: "currentCNAmount", header: "Curr CN Amount" },
  ];

  multiplesubmitData = {
    "CustomerCode": '',
    "Location": '',
    "Site": '',
    "Fob": '',
    "GstApplied": this.gst,
    "Incentive": this.Incentive,
    "Type": 'credit',
    "DnCnAMount": this.totall,
    "Remarks": '',
    "Detail": '',
    "ApprovedBy": this.id,
    "AppliedBy": this.userid,
    "PurPose": this.purPoseMasterId,
    "CompanyId": this.companyId,
    "SoNumber": '',
    "ProgramId": '',
    "InvoiceNumber": '',
    "DnCnProductsADataList": [],
    "FileList": []
  };

  // AccordiansSubmit: any[] = [
  //   {
  //     submitclicked : false,
  //     invoiceSerarchClicked: false,
  //     disabledAfterSubmit: false,
  //     "programId": "",
  //     "programIdMandatory": false,
  //     price : 0,
  //     "dncnId": 4920,
  //     "customerCode": null,
  //     "customer": null,
  //     "detail": null,
  //     "remarks": null,
  //     "gstApplied": true,
  //     "incentive": true,
  //     "site": "",
  //     "type": "credit",
  //     "location": "",
  //     "fob": "",
  //     "soNumber": "",
  //     "invoiceNumber": "",
  //     "purpose": "Under Charged/OverCharged Request",
  //     "purposeId": 2010,
  //     "financeAccountCode": "CNDN_UOCH_REQ_Finance",
  //     "template": "Under Charged/OverCharged Request",
  //     "purInvType": "multiple",
  //     "errorFlag": 0,
  //     "applicantEmail": "vadivelu.krishnamoorthy@ACER.COM",
  //     "approverEmail": "vadivelu.krishnamoorthy@ACER.COM",
  //     "approvedBy": 3052,
  //     "appliedBy": 3052,
  //     "companyId": 12,
  //     "invoiceList": [
  //       {
  //         "invoiceNumber": "I20X00065900"
  //       },
  //       {
  //         "invoiceNumber": "I20X00065995"
  //       },
  //       {
  //         "invoiceNumber": "I20X00065996"
  //       }
  //     ],
  //     "webTransactionId": "CD004920",
  //     "dnCnProductsADataList": [
  //       {
  //         "partNumber": "5M.MOS01.A264",
  //         "pGroup": "OL",
  //         "pLine": 5042,
  //         "quantity": 1.0,
  //         "unitPrice": 373.0,
  //         "invoiceQuantity": 10.0,
  //         "cN_Dn_PricePerUnit": 12.0,
  //         "cN_DN_Total": 12.0,
  //         "description": "NONE",
  //         "currentCNAmount": 3730.0,
  //         totalUnitPrice: 0

  //       },
  //       {
  //         "partNumber": "5M.T2M01.S003A",
  //         "pGroup": "OC",
  //         "pLine": 5004,
  //         "quantity": 2.0,
  //         "unitPrice": 9.7,
  //         "invoiceQuantity": 100.0,
  //         "cN_Dn_PricePerUnit": 13.0,
  //         "cN_DN_Total": 26.0,
  //         "description": "NONE",
  //         "currentCNAmount": 970.0,
  //         totalUnitPrice: 0

  //       },
  //       {
  //         "partNumber": "5M.T2M01.S003B",
  //         "pGroup": "OC",
  //         "pLine": 5004,
  //         "quantity": 3.0,
  //         "unitPrice": 4.85,
  //         "invoiceQuantity": 200.0,
  //         "cN_Dn_PricePerUnit": 14.0,
  //         "cN_DN_Total": 42.0,
  //         "description": "NONE",
  //         "currentCNAmount": 970.0,
  //         totalUnitPrice: 0

  //       },
  //       {
  //         "partNumber": "5M.T2M01.S095",
  //         "pGroup": "OC",
  //         "pLine": 5004,
  //         "quantity": 4.0,
  //         "unitPrice": 5.0,
  //         "invoiceQuantity": 50.0,
  //         "cN_Dn_PricePerUnit": 15.0,
  //         "cN_DN_Total": 60.0,
  //         "description": "SIMPACK",
  //         "currentCNAmount": 250.0,
  //         totalUnitPrice: 0

  //       }
  //     ]
  //   },
  //   {
  //     submitclicked : false,
  //     invoiceSerarchClicked: false,
  //     disabledAfterSubmit: false,
  //     price : 0,
  //     "programId": "",
  //     "programIdMandatory": true,
  //     "dncnId": 4921,
  //     "customerCode": "10796254",
  //     "customer": "SPEED PHONE SERVICE CENTRE",
  //     "detail": null,
  //     "remarks": null,
  //     "gstApplied": true,
  //     "incentive": true,
  //     "site": "SMA-BP",
  //     "type": "credit",
  //     "location": "BP-T-N",
  //     "fob": "",
  //     "soNumber": "SQSO20065462",
  //     "invoiceNumber": "I20X00066002",
  //     "purpose": "Deduct Park fund CN to dealers Request",
  //     "purposeId": 3022,
  //     "financeAccountCode": "123",
  //     "template": "Deduct Park fund CN to dealers Request",
  //     "purInvType": "single",
  //     "errorFlag": 0,
  //     "applicantEmail": "vadivelu.krishnamoorthy@ACER.COM",
  //     "approverEmail": "vadivelu.krishnamoorthy@ACER.COM",
  //     "approvedBy": 3052,
  //     "appliedBy": 3052,
  //     "companyId": 12,
  //     "invoiceList": [],
  //     "webTransactionId": "CD004921",
  //     "dnCnProductsADataList": [
  //       {
  //         "partNumber": "5M.T2M01.S108",
  //         "pGroup": "OC",
  //         "pLine": 5004,
  //         "quantity": 1.0,
  //         "unitPrice": 0.97,
  //         "invoiceQuantity": 3000.0,
  //         "cN_Dn_PricePerUnit": 10.0,
  //         "cN_DN_Total": 10.0,
  //         "description": "NONE",
  //         "currentCNAmount": 2904.0,
  //         totalUnitPrice: 0

  //       }
  //     ]
  //   },
  //   {
  //     submitclicked : false,
  //     invoiceSerarchClicked: false,
  //     disabledAfterSubmit: false,
  //     price : 0,
  //     "programId": "",
  //     "programIdMandatory": true,
  //     "dncnId": 4922,
  //     "customerCode": "10041279",
  //     "customer": "ACER SALES AND SERVICES SDN BHD",
  //     "detail": null,
  //     "remarks": null,
  //     "gstApplied": true,
  //     "incentive": false,
  //     "site": "rebate_site",
  //     "type": "credit",
  //     "location": "rebate_loc",
  //     "fob": "rebate_fob",
  //     "soNumber": "",
  //     "invoiceNumber": "",
  //     "purpose": "Rebate",
  //     "purposeId": 3024,
  //     "financeAccountCode": "Rebate _1234",
  //     "template": "Rebate ",
  //     "purInvType": "withoutinv",
  //     "errorFlag": 0,
  //     "applicantEmail": "vadivelu.krishnamoorthy@ACER.COM",
  //     "approverEmail": "vadivelu.krishnamoorthy@ACER.COM",
  //     "approvedBy": 3052,
  //     "appliedBy": 3052,
  //     "companyId": 12,
  //     "invoiceList": [],
  //     "webTransactionId": "CD004922",
  //     "dnCnProductsADataList": [
  //       {
  //         "partNumber": "",
  //         "pGroup": "",
  //         "pLine": 0,
  //         "quantity": 1.0,
  //         "unitPrice": 0.0,
  //         "invoiceQuantity": 0.0,
  //         "cN_Dn_PricePerUnit": 20.0,
  //         "cN_DN_Total": 20.0,
  //         "description": "",
  //         "currentCNAmount": 0.0,
  //         totalUnitPrice: 0
  //       }
  //     ]
  //   }
  // ]

  AccordiansSubmit: any[] = [];





  companyList = [
    // {
    //   customer: '1',
    //   customerCode: 'P.C IMAGE ELECTRONIC SDN BHD'
    // },
    // {
    //   customer: '2',
    //   customerCode: 'CYNETECH TRADING'
    // }
  ]

  userList = [
    {
      id: '1',
      name: 'Arumuga@acer.com'
    },
    {
      id: '1',
      name: 'vadi@acer.com'
    }
  ]
  loader = false;
  overlay = false;
  ErrorModel = false;
  purposeList = [];
  displayingProductsTotalinTable = [];
  changedCompany: boolean;
  fileSelected = '';
  constructor(
    private dataService: DataService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.loader = true;
    this.overlay = true;
    this.configDataCols = [
      { field: 'purpose', header: 'Purpose' },
      { field: 'template', header: 'Template' },
      { field: 'financeAccountCode', header: 'Finance Account' },
      { field: 'remarks', header: 'Remarks' },
      { field: 'invoiceManadatory', header: 'Invoice Mandatory' },
      { field: 'multipleInvoice', header: 'Multiple Invoice' },
      { field: 'incentiveMandatory', header: 'Incentive Mandatory' },
      { field: 'programIdMandatory', header: 'ProgramId Mandatory' },
      { field: 'channelCode', header: 'channel Code' },
      { field: 'taxId', header: 'Tax ID' },
      { field: 'valueOnlyPartNumber', header: 'Value Only Part Number' },
      { field: 'partNumber', header: 'Part Number' },
      { field: 'productLine', header: 'Product Line' },
      { field: 'taxCode', header: 'Tax Code' },
      { field: 'costCenter', header: 'Cost Center' }
    ];

    this.cols = [
      { field: "serialNo", header: "#" },
      { field: "partNumber", header: "Part No " },
      { field: "pGroup", header: "PGroup" },
      { field: "pLine", header: "Pline" },
      { field: "description", header: "Description" },
      { field: "unitPrice", header: "Unit Price" },
      { field: "invoiceQuantity", header: "Inv Qty" },
      { field: "currentCNAmount", header: "Curr CN Amount" },
      { field: "quantity", header: "Qty" },
      { field: "cN_Dn_PricePerUnit", header: "CN/DN Price Per Unit" },
      { field: "cN_DN_Total", header: "CN/DN Total" },
    ];

    this.displayingProductsTotalinTable = [
      {
        "partNumber": "",
        "pGroup": "",
        "pLine": '',
        "quantity": '000',
        "unitPrice": 0,
        "invoiceQuantity": '',
        "cN_Dn_PricePerUnit": '000',
        "cN_DN_Total": 0,
        "description": "Total Debit/Credit Amt (w/o gst):",
        "currentCNAmount": '',
        totalUnitPrice: 0
      },
      {
        "partNumber": "",
        "pGroup": "",
        "pLine": '',
        "quantity": '000',
        "unitPrice": 0,
        "invoiceQuantity": '',
        "cN_Dn_PricePerUnit": '000',
        "cN_DN_Total": 0,
        "description": "GST @ 0%:",
        "currentCNAmount": '',
        totalUnitPrice: 0
      },
      {
        "partNumber": "",
        "pGroup": "",
        "pLine": '',
        "quantity": '000',
        "unitPrice": 0,
        "invoiceQuantity": '',
        "cN_Dn_PricePerUnit": '000',
        "cN_DN_Total": 0,
        "description": "Debit/Credit Amt (w gst):",
        "currentCNAmount": '',
        totalUnitPrice: 0
      },

    ]
    this.getCustomers();
    this.getPurpose();
    this.getUsers();
    this.previousExcellData();
  }

  showErrors = false;
  errorMessages=[];
  _doShowErrors(index, item) {
    let dncnId = item.dncnId;
    this.dataService.get("GetUploadDncnStatus?dncnId=" + dncnId).then(res => {
      this.errorMessages = res;
      this.showErrors = true;
    }, err => {
    })
  }
  closeStatusErrorModalNew() {
    this.showErrors = false;
  }

  _doBulkUpload() {

    
    let array = [];
    array = this.AccordiansSubmit.filter(res => res.isChecked == true);

      
    if(array.length!=0){
    this.confirmationService.confirm({
        message: "Are you sure that you want to update bulk? all the selected success cndn's i.e green items will be updated",
        header: 'Confirmation for bulk update',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
           this._doBulkUploadData();
        },
        reject: () => {

        }
    });
  
  }else{
    let dncnIds="";
    dncnIds=this.AccordiansSubmit.filter(res => res.isChecked == true && res.errorFlag == 1).map(ele=>ele.dncnId).toString();
         this.errorModel_New = true;
          this.successorerror = 'Error';
          this.message="Please Check The CheckBoxes"
          this.AccordiansSubmit.forEach(element => {
            element.isChecked=false;
          });
          this.isSelectAll=false;
       
        }
}

errorModel_New1 = false;
  _doBulkUploadData() {
   
    let array = [];
    
    array = this.AccordiansSubmit.filter(res => res.errorFlag == 0 && res.isChecked == true);
    if(array.length != 0) {
      this.loader = true;
      this.overlay = true;
    this.dataService.post(array, 'UploadDNCnUpdate').then ((result) => {
      this.loader = false;
      this.overlay = false;
       this.message = result.message;
      if(this.message.includes('Successfully')) {
        // this.AccordiansSubmit = this.AccordiansSubmit.slice(this.AccordiansSubmit[index]);
        //  item.disabledAfterSubmit = true;
        //  item.closeAccordian = true;
        // console.log(this.message);
        // this.errorModel_New = true;
        // this.successorerror = 'Success';

        
        let dncnIds="";
        dncnIds=this.AccordiansSubmit.filter(res => res.isChecked == true && res.errorFlag == 1).map(ele=>ele.dncnId).toString();
        if(dncnIds != '' ) {

        
        this.errorModel_New1 = true;
        this.successorerror = 'Error';
        this.message=dncnIds+": These DNCN having errors, please resolve and upload again"
        }
        else {
          this.errorModel_New1 = true;
         this.successorerror = 'Success';
        }

        this.AccordiansSubmit.forEach(element => {
          element.isChecked=false;
        });
        this.isSelectAll=false;
        
        // this.multiClearAllFile();
        // this.multipleDivCancel();
        // if(this.AccordiansSubmit.filter(fl => fl.disabledAfterSubmit == false).length == 0) {
          // window.location.reload();
        // }
      }
    
    
    }
  , err => {
      this.ErrorModel = true;
      this.loader = false;
      this.overlay = false;
    });
  }
  else if(this.AccordiansSubmit.filter(res => res.isChecked == true && res.errorFlag == 1).length!=0){
    let dncnIds="";
    dncnIds=this.AccordiansSubmit.filter(res => res.isChecked == true && res.errorFlag == 1).map(ele=>ele.dncnId).toString();
  
    this.errorModel_New = true;
          this.successorerror = 'Error';
          this.message=dncnIds+": These Dncn having errors, please resolve and upload again"
          this.AccordiansSubmit.forEach(element => {
            element.isChecked=false;
          });
          this.isSelectAll=false;
          
        
}

  }

  closeErrorModalNew1() {
    this.errorModel_New1 = false;
    window.location.reload();
  }

  showDeleteDialog:boolean=false;
  remarks :string="";
  _doBulkDelete() {
    let array = "";
    array = this.AccordiansSubmit.filter(res=>res.isChecked == true).map(ele=>ele.dncnId).toString();
    if(array.length!=0){
    this.confirmationService.confirm({
        message: 'Are you sure that you want to Delete bulk?',
        header: 'Confirmation for bulk delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          // alert("hi")
          // window.location.reload();
          this.showDeleteDialog=true;

          // this._doBulkDeleteData();
        },
        reject: () => {

        }

    });


  }else{
    this.errorModel_New = true;
    this.successorerror = 'Error';
  this.message="Please check The CheckBoxes"
  }

}

cancelCn(){
this._doBulkDeleteData();

}
cancelModal(){
  this.showDeleteDialog=false;

}
  _doBulkDeleteData() {
   
    let array = "";
    array = this.AccordiansSubmit.filter(res=>res.isChecked == true).map(ele=>ele.dncnId).toString();
    
    if(array.length != 0) {
      this.loader = true;
      this.overlay = true;

    this.dataService.get('CancelDnCn?dncnId='+array+'&remarks='+this.remarks+'&CreatedBy='+this.userid).then ((result) => {
      this.loader = false;
      this.overlay = false;
       this.message = result.message;
      // if(this.message.includes('Successfully')) {

        // this.AccordiansSubmit = this.AccordiansSubmit.slice(this.AccordiansSubmit[index]);
        //  item.disabledAfterSubmit = true;
        //  item.closeAccordian = true;
        this.errorModel_New = true;
        this.successorerror = 'Success';

        // this.multiClearAllFile();
        // this.multipleDivCancel();
        // if(this.AccordiansSubmit.filter(fl => fl.disabledAfterSubmit == false).length == 0) {
          window.location.reload();
        // }
      //}
    
    
    }
  , err => {
      this.ErrorModel = true;
      this.loader = false;
      this.overlay = false;
    });
  
}
  }

  _bulkSelect(){
    
    this.isSelectAll =! this.isSelectAll
    if(this.isSelectAll==true){
      this.AccordiansSubmit.forEach(element => {
        element.isChecked=true;
      });

    }else{
this.AccordiansSubmit.forEach(element => {
        element.isChecked=false;
      });
      
    }
  }

  showSingleDeleteDialog:boolean=false;

  dncnIdtodelete = '';
  _doDelete(item){
  this.showSingleDeleteDialog=true;
  // this.cancelSingleCn(item);
    this.dncnIdtodelete = item.dncnId;
  }


  cancelSingleCn(){
    let dncnId = this.dncnIdtodelete;
    this.dataService.get('CancelDnCn?dncnId='+dncnId+'&remarks='+this.remarks+'&CreatedBy='+this.userid).then ((result) => {
      this.loader = false;
      this.overlay = false;
       this.message = result.message;
        this.dncnIdtodelete = '';
        this.errorModel_New = true;
        this.successorerror = 'Success';

          window.location.reload();
    
    
    }
    
  , err => {
      this.ErrorModel = true;
      this.loader = false;
      this.overlay = false;
    });
  

  }

  cancelSingleModal(){
    this.showSingleDeleteDialog=false;
  }
  _isSelectUnSelectAll(item){
     item.isChecked=!item.isChecked;
     
    if(this.AccordiansSubmit.filter(ele=>ele.isChecked==false).length!=0){
      this.isSelectAll=false;
    }else{
      this.isSelectAll=true;

    }
  }
  previousExcellData() {
   
    let successCount = 0;
    let errrorCount = 0;
    let createdby = Number(this.createdBy);
    this.dataService.get('GetUploadDNCnInfo?createdBy=' + createdby).then((res: any) => {
      successCount = res.filter(res => res.errorFlag == 0).length;
      errrorCount = res.filter(res => res.errorFlag == 1).length;
       this.AccordiansSubmit = res;
      this.hide = false;
      if(this.AccordiansSubmit.length != 0) {
      this.successorerror = "Success";
      this.message = "Pending records are there<br> Kindly verify and update or confirm the records as shown in current page";
      this.errorModel_New = true;
      }
      let count = 0;
      this.AccordiansSubmit.forEach((ele, i) => {
        let price = 0;
        let cndnTotal=0;
        ele.fileList = [];
        ele.submitclicked = false;
        ele.invoiceSerarchClicked= false;
        ele.disabledAfterSubmit = false;
        ele.closeAccordian = false;
        ele.company = {customerCode: ele.customerCode, customer: ele.customer + '|' +ele.customerCode};
        this.AccordiansSubmit[i].dnCnProductsADataList.forEach((item, index) => {
          price += item.unitPrice;
          ele.price = price;
          cndnTotal += item.cN_DN_Total;
          ele.DnCnAMount = cndnTotal;
        })
  
      })
      this.loader = false;
      this.overlay = false;
    }, err => {
    })
  }

  getPurpose() {
    // this.loader = true;
    // this.overlay = true
    this.dataService.get("GetPurposeMasterData?companyId=" + this.companyId).then((result) => {
      this.purposeList = result;
      // this.loader = false;
      // this.overlay = false
    }, err => {
      this.ErrorModel = true;
      this.loader = false;
      this.overlay = false
    });
  }
  getUsers() {
    // this.loader = true;
    // this.overlay = true;
    this.dataService.get("GetApprovalData?companyId=" + this.companyId).then((result) => {
      this.userList = result;
      // this.loader = false;
      // this.overlay = false
    }, err => {
      this.ErrorModel = true;
      this.loader = false;
      this.overlay = false
    });
  }

  getCustomers() {
    // this.loader = true;
    // this.overlay = true
    this.dataService.get("GetCustomerData?companyId=" + this.companyId).then((result) => {
      this.companyList = result;
      // this.loader = false;
      // this.overlay = false
    }, err => {
      this.ErrorModel = true;
      this.loader = false;
      this.overlay = false
    });
  }



  downloadFile() {
    let link = document.createElement("a");
    link.download = "new_CNDNS";
    // link.href = "assets/dncnuploadTestdata.xlsx";
   link.href = "https://partner.acer.com.my/dncn_api/TemplateFile/dncnuploadTemplate.xlsx";

    link.click();
  }

  _uploadFile(event: any) {
    var that = this;
    let file = event.target.files[0];
    // this.fileSelected = event.target.files[0].name;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      var data = reader.result.toString()
      var splited = data.split(",")[1];
      that.fileUploadData.EncodeBase64 = splited;
      that.fileUploadData.FileName = file.name;
    };
    reader.onerror = function (error) {
    };
  }

  changeCompany(e, item, i) {
    this.changedCompany = true;
    item.dnCnProductsADataList[0].quantity = 0;
    item.dnCnProductsADataList[0].cN_Dn_PricePerUnit = 0;
    item.dnCnProductsADataList[0].cN_DN_Total = 0;
    let customerCode = Number(e.value.customerCode);
    this.dataService.get("GetCustomerInfo?customerCode="+customerCode+"&companyId="+this.companyId).then((result) => {
      item.site = result.site;
      item.location = result.location;
      item.fob = result.fob;
      item.customerCode = result.customerCode;
    }, err => {
      this.ErrorModel = true;
    });
  }
  
  fileselectError = false;
  async UploadFile() {
    // this.hide = false;
    // ---------------
    let count = 0;
    this.AccordiansSubmit.forEach((ele, i) => {
      let price = 0;
      let cndnTotal=0;
      ele.fileList = [];
      ele.submitclicked = false;
      ele.invoiceSerarchClicked= false;
      ele.disabledAfterSubmit = false;
      ele.closeAccordian = false;
      ele.company = {customerCode: ele.customerCode, customer: ele.customer + '|' +ele.customerCode};
      this.AccordiansSubmit[i].dnCnProductsADataList.forEach((item, index) => {
        price += item.unitPrice;
        ele.price = price;
        cndnTotal += item.cN_DN_Total;
        ele.DnCnAMount = cndnTotal;
      })

    })

// -----------------------
    //   // this.displayingProductsTotalinTable[].unitPrice = price;

    //   //  ele.dnCnProductsADataList.push(...this.displayingProductsTotalinTable);
    //   //  this.displayingProductsTotalinTable[0].unitPrice = 0;
    //   // console.log(this.displayingProductsTotalinTable, 'CHECK');
    //   console.log(this.AccordiansSubmit[i], 'SEE me');
    //   // if(this.AccordiansSubmit[i].dnCnProductsADataList.filter(fil => fil.description == 'Total Debit/Credit Amt (w/o gst):')[0].description == 'Total Debit/Credit Amt (w/o gst):') {
    //     this.displayingProductsTotalinTable[i].unitPrice = price;

    //   // }
    //   console.log(this.displayingProductsTotalinTable, 'CHECKING==========');

    //    console.log(this.AccordiansSubmit, 'CHECKING');
    //   // for (let index = 0; index < this.displayingProductsTotalinTable.length; ++index) {
    //   //   console.log(index, 'index');
        
    //   //   if (index == count) {
    //   //     this.displayingProductsTotalinTable[count].unitPrice = price;
    //   //     console.log(this.displayingProductsTotalinTable, '[0]');
    //   //   }
    //   // }
    //   // ++count;

    //   console.log(this.displayingProductsTotalinTable, 'Mahesh babu')

    // })

    // }
    // console.log('hi')
    // console.log(this.AccordiansSubmit)
    // console.log('hello')
    // this.AccordiansSubmit.forEach((ele, i) => {
    //   let a = 0;
    //   // this.AccordiansSubmit[i].dnCnProductsADataList.filter(f => f.description == 'Total Debit/Credit Amt (w/o gst):')[0].unitPrice;
    //   ele.dnCnProductsADataList.forEach((iiiii, n) => {

    //     if (iiiii.description == 'Total Debit/Credit Amt (w/o gst):') {
    //       let aa = this.AccordiansSubmit[i].dnCnProductsADataList.filter(f => f.description != 'Total Debit/Credit Amt (w/o gst):');
    //       console.log(aa.length)
    //       aa.forEach(res => {
    //         // this.displayingProductsTotalinTable[0].unitPrice = this.displayingProductsTotalinTable[0].unitPrice + res.unitPrice;
    //         // this.AccordiansSubmit[i].dnCnProductsADataList.filter(f => f.description == 'Total Debit/Credit Amt (w/o gst):')[0].unitPrice = 
    //         // this.AccordiansSubmit[i].dnCnProductsADataList.filter(f => f.description == 'Total Debit/Credit Amt (w/o gst):')[0].unitPrice 
    //         // + Number(res.unitPrice);
    //         a = a + Number(res.unitPrice);
    //       })
    //       console.log(a, this.AccordiansSubmit[i].dnCnProductsADataList.filter(f => f.description == 'Total Debit/Credit Amt (w/o gst):')[0].unitPrice)
    //       this.AccordiansSubmit[i].dnCnProductsADataList.forEach(res => {
    //         if (res.description == 'Total Debit/Credit Amt (w/o gst):') {
    //           // this.AccordiansSubmit[i].dnCnProductsADataList.filter(f => f.description == 'Total Debit/Credit Amt (w/o gst):')[0].totalUnitPrice =
    //           // this.AccordiansSubmit[i].dnCnProductsADataList.filter(f => f.description == 'Total Debit/Credit Amt (w/o gst):')[0].unitPrice;
    //           this.AccordiansSubmit[i].dnCnProductsADataList[n].unitPrice = Number(a);
    //           //  this.AccordiansSubmit[i].dnCnProductsADataList.filter(f => f.description == 'Total Debit/Credit Amt (w/o gst):')[0].unitPrice;
    //           console.log(this.AccordiansSubmit[i].dnCnProductsADataList[n].unitPrice, 'mainnnnnn')
    //           console.log(res.unitPrice, 'ressssssssssssss');
    //         }
    //         // else {
    //         //   res.unitPrice = res.unitPrice;
    //         // }

    //       })
    //     }
    //   })
    // })
    // console.log("============")
    // console.log(this.AccordiansSubmit);
    // console.log("============")

    let total = 0;
    // this.AccordiansSubmit.forEach((ele, i) => {
    //   for(let i=0; i<this.AccordiansSubmit.length; i++) {
    //   total = 0
    //   this.AccordiansSubmit[i].dnCnProductsADataList.forEach((item,j) => {
    //     // item.totalUnitPrice = item.totalUnitPrice + Number(item.unitPrice);
    //      total = total + Number(item.unitPrice);
    //     // if(item.description == 'Total Debit/Credit Amt (w/o gst):') {
    //     //   this.AccordiansSubmit[i].dnCnProductsADataList[j].totalUnitPrice = total;

    //     // }
    //   })
    //   // console.log(this.AccordiansSubmit[i].dnCnProductsADataList.filter(f => f.description == 'Total Debit/Credit Amt (w/o gst):')[0].unitPrice = total)
    //   // this.AccordiansSubmit[i].dnCnProductsADataList.filter(f => f.description == 'Total Debit/Credit Amt (w/o gst):')[0].unitPrice = total;

    //   //  if(this.AccordiansSubmit[i].dnCnProductsADataList.filter(f => f.description == 'Total Debit/Credit Amt (w/o gst):')[0].unitPrice = total)
    //   this.AccordiansSubmit[i].dnCnProductsADataList.forEach((f,k) => {
    //     if(f.description == 'Total Debit/Credit Amt (w/o gst):') {
    //       this.AccordiansSubmit[i].dnCnProductsADataList[k].unitPrice = total;
    //     }
    //     else {
    //       this.AccordiansSubmit[i].dnCnProductsADataList[k].unitPrice = this.AccordiansSubmit[i].dnCnProductsADataList[k].unitPrice;

    //     }
    //     //  f.unitPrice = total;
    //    })
    // //     // total = 0;

    //   console.log(total);
    //    console.log(this.AccordiansSubmit[i].dnCnProductsADataList);
    // // }
    // //  )
    //   }
    // return
   
    let successCount = 0;
    let errrorCount = 0;
    this.fileUploadData.CompanyId = Number(this.companyId);
    this.fileUploadData.CreatedBy = Number(this.createdBy);
    if(this.fileSelected == '') {
      this.fileselectError = true;
      this.message = 'Please select file';
      // alert('Please select file');
      // this.successorerror = "Error";
      // this.message ='Please select file';
      // this.errorModel_New = true;
    }
    if(this.fileSelected != '') {
      this.loader = true;
      this.overlay = true;
    this.dataService.post(this.fileUploadData, 'UploadCnDn').then((res: any) => {
      successCount = res.filter(res => res.errorFlag == 0).length;
      errrorCount = res.filter(res => res.errorFlag == 1).length;
       this.AccordiansSubmit = res;
      this.hide = false;
      this.successorerror = "Success";
      this.message = "Uploaded successfully <br> " + successCount + " records uploded successfully <br> " + errrorCount + " records failed <br> Kindly verify and update or confirm the records as shown in current page";
      this.errorModel_New = true;
      let count = 0;
      this.AccordiansSubmit.forEach((ele, i) => {
        let price = 0;
        let cndnTotal=0;
        ele.fileList = [];
        ele.submitclicked = false;
        ele.invoiceSerarchClicked= false;
        ele.disabledAfterSubmit = false;
        ele.closeAccordian = false;
        // ele.isChecked = false;
        ele.company = {customerCode: ele.customerCode, customer: ele.customer + '|' +ele.customerCode};
        this.AccordiansSubmit[i].dnCnProductsADataList.forEach((item, index) => {
          price += item.unitPrice;
          ele.price = price;
          cndnTotal += item.cN_DN_Total;
          ele.DnCnAMount = cndnTotal;
        })
  
      })
      this.loader = false;
      this.overlay = false;
    }, err => {
    })
  }
  }

  changeIncentive2(e) {
    this.multiplesubmitData.Incentive = e.target.value;
  }

  insertMultipleInvoice() {
    this.invalidMultipleIncoice = false;
  }
  onTabOpen(e) {

         this.mutipleSubmitClicked = true;

  }
  accordianIndex: number;
  toggle(i, item) {
    this.accordianIndex = i;
    // item.invoiceSerarchClicked = false;
    //  this.mutipleSubmitClicked = false;
    let total = 0
    // item.dnCnProductsADataList.forEach((element, j) => {
    //   if (element.description == 'Total Debit/Credit Amt (w/o gst):')
    //     item.dnCnProductsADataList[j].totalUnitPrice = element.totalUnitPrice + Number(element.unitPrice);
    //   else {
    //     item.dnCnProductsADataList[j].totalUnitPrice = element.totalUnitPrice + Number(element.unitPrice);
    //   }
    // });
    // this.AccordiansSubmit[i].dnCnProductsADataList
  }
  changePurpose(event) {
  }
  fileData: any[] = [];
  filesList = []
  _uploadmultipleFile(event, index, item) {
    var that = this;
    if (event.target.files && event.target.files.length > 0) {
      that.fileData = event.target.files;
      let files = [].slice.call(event.target.files);
      files.forEach(val => {
        let reader = new FileReader();
        reader.readAsDataURL(val);
        reader.onload = () => {
          var data = reader.result.toString()
          var splited = data.split(",")[1];
          item.fileList.push(...[{ FileName: val.name, EncodeFile: splited }]);
        };
      });
    }
  }

  hide = true;
  successorerror = "Success";
  errorModel_New = false;
  message = '';

  multisubmitData(index, item) {
    
     this.mutipleSubmitClicked = true;
     item.submitclicked = true;
    let finalArray = [];
    if(item.programId.trim() =='' && item.programIdMandatory ){
      this.errorModel_New = true;
      this.successorerror = 'Error';
      this.message ='Kindly enter program id';
      this.mutipleSubmitClicked = true;
    } 
    
    else if((item.customerCode == '' || item.customerCode == null) &&  item.purInvType == "withoutinv") {
      this.errorModel_New = true;
      this.successorerror = 'Error';
      this.message ='Please select company';
    }
    else if(item.type == '') {
      this.errorModel_New = true;
      this.successorerror = 'Error';
      this.message ='Please select type';
    }
    else if(item.dnCnProductsADataList == undefined || item.dnCnProductsADataList.length == 0){
      // this.ErrorModel = true;
      // this.invalidPerUnit = true;
      this.mutipleSubmitClicked = true;
      this.errorModel_New = true;
      this.successorerror = 'Error';
      this.message ='Kindly enter QTY and CN/DN Price Per Unit value';
    }
    else if(item.dnCnProductsADataList.filter(res => res.cN_DN_Total == 0).length != 0) {
      this.errorModel_New = true;
      this.mutipleSubmitClicked = true;
      this.successorerror = 'Error';
      this.message ='Kindly enter QTY and CN/DN Price Per Unit value';
    }
    else if(item.DnCnAMount == 0){
      // this.invalidTotal = true;
      this.mutipleSubmitClicked = true;
      this.errorModel_New = true;
      this.successorerror = 'Error';
      this.message ='Kindly enter QTY and CN/DN Price Per Unit value';
      // this.ErrorModel = true;
    }
    else if(item.invoiceNumber == '' && item.purInvType == "single"){
      // this.invalidTotal = true;
      item.invoiceSerarchClicked = true;
      this.errorModel_New = true;
      this.successorerror = 'Error';
      this.message ='Please enter invoice number';
      // this.ErrorModel = true;
    }
     else if (item.approvedBy != 0) {
      this.loader = true;
      this.overlay = true;
      if(item.purInvType == "multiple") {
        item.invoiceNumber = '';
        item.invoiceList.forEach(element => {
          item.invoiceNumber += element.invoiceNumber + ',';
        });
      }
      finalArray.push(item);
      this.dataService.post(finalArray, 'UploadDNCnUpdate').then ((result) => {
        this.loader = false;
        this.overlay = false;
        this.message = result.message + " " + item.dncnId;
        if(this.message.includes('Successfully')) {
          // this.AccordiansSubmit = this.AccordiansSubmit.slice(this.AccordiansSubmit[index]);
           item.disabledAfterSubmit = true;
           item.closeAccordian = true;
          this.errorModel_New1 = true;
          this.successorerror = 'Success';
          // this.multiClearAllFile();
          // this.multipleDivCancel();
          // if(this.AccordiansSubmit.filter(fl => fl.disabledAfterSubmit == false).length == 0) {
            // window.location.reload();
          // }
        }
      }, err => {
        this.ErrorModel = true;
        this.loader = false;
        this.overlay = false;
      });
    } 
    // this.successorerror = "Success";
    // this.message = "Updated successfully";
    // this.errorModel_New = true;
  }
  onTabClose(i) {
    this.AccordiansSubmit[i].disabledAfterSubmit = true;
  }
  closeErrorModalNew() {
    this.hide = false;
    this.errorModel_New = false;
  }
  closefileErrorModalNew() {
    this.fileselectError = false;
  }
  _doGoBack() {
    this.hide = true;
  }

  multiRemoveFile(index, item) {
    item.filesList.splice(index, 1)
  }
  multipleDivCancel(index, item) {
    
      item.submitclicked = false,
      item.invoiceSerarchClicked= false,
      item.disabledAfterSubmit= false,
      item.price = 0,
      item.programId= "",
      item.programIdMandatory= true,
      item.dncnId= 0,
      item.customerCode= "",
      item.customer= "",
      item.detail= null,
      item.remarks= null,
      item.gstApplied= true,
      item.incentive= false,
      item.site= "",
      item.type= "",
      item.location= "",
      item.fob= "",
      item.soNumber= "",
      item.invoiceNumber= "",
      item.financeAccountCode= "",
      item.template= " ",
     item.DnCnAMount = 0
     
      item.applicantEmail= "",
      item.approverEmail= "",
      item.approvedBy= 0,
      item.appliedBy= 0,
      item.companyId= 0,
      item.invoiceList= [],
      item.webTransactionId= "",
      item.dnCnProductsADataList= [
      ]
    
  }

  cancelMultiInvoiceModal() {
    this.multipleInvoiceSearchClicked = false;
    this.multipleDetailsDialog = false;
    this.mutipleInvoiceNumber = "";
  }


  multiClearAllFile() {
    this.filesList = []
  }
  validateNumber(event, value) {
    this.dataService.validateNum(event, value);
  }


  changeMultipleQty(x, e) {
    x.quantity = Number(e.target.value);
    x.quantity = e.target.value == '' ? 0 : e.target.value;
    if (x.quantity <= x.invoiceQuantity) {
      x.cN_DN_Total = parseInt(x.cN_Dn_PricePerUnit) * parseInt(x.quantity);
      // this.userData3 = [...new Set(this.userData3)]
      this.totall = 0;
      // this.userData3.forEach(e => {
      //   if(e.Cn_Dn_Total!=0){
      //   this.totall = this.totall+e.Cn_Dn_Total;
      //   }
      // })
      this.AccordiansSubmit.forEach((ele, i) => {
        let price = 0;
        let cndnTotal=0;
        this.AccordiansSubmit[i].dnCnProductsADataList.forEach((item, index) => {
          price += item.unitPrice;
          ele.price = price;
          cndnTotal += item.cN_DN_Total;
          ele.DnCnAMount = cndnTotal;
        })
  
      })
    }
    else {
      // this.invalidQty = true;
      this.errorModel_New = true;
      x.quantity = 0;
      // x.cN_Dn_PricePerUnit = 0;
      x.cN_DN_Total = parseInt(x.cN_Dn_PricePerUnit) * parseInt(x.quantity);
      this.AccordiansSubmit.forEach((ele, i) => {
        let price = 0;
        let cndnTotal=0;
        this.AccordiansSubmit[i].dnCnProductsADataList.forEach((item, index) => {
          price += item.unitPrice;
           ele.price = price;
          cndnTotal += item.cN_DN_Total;
          ele.DnCnAMount = cndnTotal;
        })
  
      })
      this.successorerror = 'Error';
      this.message = 'Qty can not be greater than Inv Qty!';
      this.ErrorModel = true;
    }
  }
  changeQty(x, e, i) {
    x.quantity = Number(e.target.value);
    x.quantity = e.target.value == '' ? 0 : e.target.value;
    // if (x.quantity <= x.invoiceQuantity) {
      x.cN_DN_Total = parseInt(x.cN_Dn_PricePerUnit) * parseInt(x.quantity);
      this.AccordiansSubmit.forEach((ele, i) => {
        let price = 0;
        let cndnTotal=0;
        this.AccordiansSubmit[i].dnCnProductsADataList.forEach((item, index) => {
          price += item.unitPrice;
           ele.price = price;
          cndnTotal += item.cN_DN_Total;
          ele.DnCnAMount = cndnTotal;
        })
  
      })
    // }
  }
  changePerUnit(x, e, i) {
    x.cN_Dn_PricePerUnit = Number(e.target.value);
    x.cN_Dn_PricePerUnit = e.target.value == '' ? 0 : e.target.value;
    // if (x.quantity <= x.invoiceQuantity) {
      x.cN_DN_Total = parseInt(x.cN_Dn_PricePerUnit) * parseInt(x.quantity);
      this.AccordiansSubmit.forEach((ele, i) => {
        let price = 0;
        let cndnTotal=0;
        this.AccordiansSubmit[i].dnCnProductsADataList.forEach((item, index) => {
          price += item.unitPrice;
           ele.price = price;
          cndnTotal += item.cN_DN_Total;
          ele.DnCnAMount = cndnTotal;
        })
  
      })
    // }
  }
  changeMultiplePerUnit(x, e) {
    x.cN_Dn_PricePerUnit = Number(e.target.value);
    if (x.cN_Dn_PricePerUnit == '') {
      x.cN_Dn_PricePerUnit = 0
    }
    if (x.quantity == '') {
      x.quantity = 0
    }
    x.cN_DN_Total = parseInt(x.cN_Dn_PricePerUnit) * parseInt(x.quantity);
    // this.userData3 = [...new Set(this.userData3)]
    this.totall = 0;
    // this.userData3.forEach(e => {
    //   if(e.Cn_Dn_Total!=0){
    //   this.totall = this.totall+e.Cn_Dn_Total;
    //   }
    // })
    this.AccordiansSubmit.forEach((ele, i) => {
      let price = 0;
      let cndnTotal=0;
      this.AccordiansSubmit[i].dnCnProductsADataList.forEach((item, index) => {
        price += item.unitPrice;
        ele.price = price;
        cndnTotal += item.cN_DN_Total;
        ele.DnCnAMount = cndnTotal;
      })
    })
  }

inoviceAfterAddingIndex = 0;
  multipleInvoiceSearch(index, item) {
    this.multipleInvoiceSearchClicked = true;
    item.invoiceSerarchClicked = true;
    if (item.invoiceNumber != '') {
      if (item.invoiceList.filter(ele => ele.invoiceNumber == item.invoiceNumber).length != 0 && item.purInvType == 'multiple') {
        item.invoiceNumber = '';
        this.errorModel_New = true;
        this.successorerror = 'Error';
        this.message = 'Invoice already exists! Kindly search with another invoice';
        item.invoiceSerarchClicked = false;
        this.ErrorModel = true;
      } else {
        this.invoicelist = [];
        this.loader = true;
        this.overlay = true;
        this.dataService.get("GetInvoiceDetails?invoiceNumber=" + item.invoiceNumber + '&companyId=' + this.companyId).then((result) => {
          this.loader = false;
          this.overlay = false;
          if (result.length != 0) {
            item.price = 0;
            item.DnCnAMount = 0;
            this.inoviceAfterAddingIndex = index;
            if(item.purInvType == 'multiple') {
            item.invoiceList.push({invoiceNumber : item.invoiceNumber});
            item.invoiceList.forEach(res => {
              this.invoicelist.push(res.invoiceNumber);
            })
            // this.invoicelist.push(item.invoiceNumber);
          }
          if(item.purInvType == 'single') {
            item.invoiceList = [];
            item.invoiceList.push({invoiceNumber : item.invoiceNumber});
            item.invoiceList.forEach(res => {
              this.invoicelist.push(res.invoiceNumber);
            })
          }
            this.multipleModalData = result[0];

            this.multipleModalData.productsList.forEach(element => {
              element.quantity = element.quantity == '' ? 0 : element.quantity;
              element.cN_Dn_PricePerUnit = element.cN_Dn_PricePerUnit == '' ? 0 : element.cN_Dn_PricePerUnit;
              element.cN_DN_Total = element.cN_DN_Total == '' ? 0 : element.cN_DN_Total;
            });
            // this.userData2 = result[0].productsList;
            this.multipleDetailsDialog = true;
          } else {
            this.invalidMultipleIncoice = true;
          }
        }, err => {
          this.ErrorModel = true;
          this.loader = false;
          this.overlay = false;
        });
      }
    }
  }

  closeMultiInvoiceModal() {

    this.multipleInvoiceSearchClicked = false;
    this.multipleDetailsDialog = false;
    // this.intialStage = true;
    this.showTable = true;
    // this.invoicelist.push(invoiceNumber);
    if(this.AccordiansSubmit[this.inoviceAfterAddingIndex].purInvType == 'multiple') {
    this.AccordiansSubmit[this.inoviceAfterAddingIndex].invoiceNumber = "";
    this.AccordiansSubmit[this.inoviceAfterAddingIndex].invoiceSerarchClicked = false;
    }
    this.loader = true;
    this.overlay = true;
    this.dataService.get("GetMultipleInvoiceDetails?invoiceNumber=" + this.invoicelist + "&companyId=" + this.companyId + "&DnCnId="+ this.AccordiansSubmit[this.inoviceAfterAddingIndex].dncnId).then((result: any) => {
      this.loader = false;
      this.overlay = false;
      // result.forEach(element => {
      //   element.quantity = 0;
      //   element.cN_Dn_PricePerUnit = 0;
      //   element.cN_DN_Total = 0
      //       });

      this.AccordiansSubmit[this.inoviceAfterAddingIndex].dnCnProductsADataList = result;
      if(this.AccordiansSubmit[this.inoviceAfterAddingIndex].purInvType == "multiple") {
        this.AccordiansSubmit[this.inoviceAfterAddingIndex].invoiceNumber = '';
        this.AccordiansSubmit[this.inoviceAfterAddingIndex].invoiceList.forEach(element => {
          this.AccordiansSubmit[this.inoviceAfterAddingIndex].invoiceNumber += element.invoiceNumber + ',';
        });
      }
      this.AccordiansSubmit.forEach((ele, i) => {
        let price = 0;
        let cndnTotal=0;
        this.AccordiansSubmit[i].dnCnProductsADataList.forEach((item, index) => {
          price += item.unitPrice;
          ele.price = price;
          cndnTotal += item.cN_DN_Total;
          ele.DnCnAMount = cndnTotal;
        })
      })
      // this.userData3.forEach(e=>{
      //   this.extraUserData[0].unitPrice = this.extraUserData[0].unitPrice + Number(e.unitPrice);
      // }, err => {
      //   console.log(err);
      //   this.ErrorModel  = true;
      //   this.loader = false;
      //   this.overlay = false;
      // });
      // this.multisubmitList = this.userData3;
      // this.userData3 = [...this.userData3, ...this.extraUserData];
      // this.userData3.forEach(e =>{
      //   e.Quantity = 0;
      //   e.Cn_Dn_PricePerUnit = 0;
      //   e.Cn_Dn_Total = 0;
      //   this.test = Number(this.test) + Number(e.unitPrice);
      // })
    })
  }

  removeInvoice(invoice, i, item) {
    item.price = 0;
    this.invoicelist = [];
    item.invoiceList = item.invoiceList.filter(res => res.invoiceNumber != invoice.invoiceNumber);
    item.invoiceList.forEach(element => {
      this.invoicelist.push(element.invoiceNumber)
    });
    item.invoiceList = item.invoiceList.slice(item);
    // this.invoicelist = this.invoicelist.filter((value) => value !== item);
    this.loader = true;
    this.overlay = true;
    this.dataService.get("GetMultipleInvoiceDetails?invoiceNumber=" + this.invoicelist + "&companyId=" + this.companyId + "&DnCnId="+ item.dncnId).then((result: any) => {
      this.loader = false;
      this.overlay = false;
      // result.forEach(element => {
      //   element.quantity = 0;
      //   element.cN_Dn_PricePerUnit = 0;
      //   element.cN_DN_Total = 0
      //       });
      if(item.purInvType == "multiple") {
        item.invoiceNumber = '';
        item.invoiceList.forEach(element => {
          item.invoiceNumber += element.invoiceNumber + ',';
        });
      }
      this.AccordiansSubmit[i].dnCnProductsADataList = result;
      this.AccordiansSubmit.forEach((ele, i) => {
        let price = 0;
        let cndnTotal=0;
        this.AccordiansSubmit[i].dnCnProductsADataList.forEach((item, index) => {
          price += item.unitPrice;
          ele.price = price;
          cndnTotal += item.cN_DN_Total;
          ele.DnCnAMount = cndnTotal;
        })
      })
      // this.userData3 = result;
    //   this.userData3.forEach(e =>{
    //    e.Quantity = 0;
    //    e.Cn_Dn_PricePerUnit = 0;
    //    e.Cn_Dn_Total = 0;
    //    this.test = Number(this.test) + Number(e.unitPrice);
    //  })
      // this.multisubmitList = this.userData3;
      // this.extraUserData[0].unitPrice  = 0;
      // this.total = 0;
      // this.totall = 0;
      // this.userData3 = [...this.userData3, ...this.extraUserData];
    }, err => {
      this.loader = false;
      this.overlay = false;
      this.ErrorModel  = true;
    });
     if(this.invoicelist.length == 0) {
       this.showTable = false;
     }
  }

 
}
