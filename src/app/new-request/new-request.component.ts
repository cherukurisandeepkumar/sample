import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit {
  loader: boolean = false;
  overlay: boolean = false;
  submitClicked = false;
  ProgramList: any[] = [];
  fileTypeList: any[] = [];
  companyId: string = localStorage.getItem("companyId");
  ErrorModel: boolean = false;
  postProgramType = {
    "action": "GetConfig"
  }
  TypeList = [ 
    {
      code: 'content',
      value: 'content'
  },
  {
    code: 'file',
      value: 'file'
  }
]
  fileUploadData: any = {
    "action": "ImportFile",
    "createdBy": "Aru-Manual",
    "filePath": "",
    "fileType": "",
    "programConfigID": '',
    "programName": "",
    "extensions": [],
    "status": true,
    "type": '',
    "fileAttributesList": [
      // {
      //     "EncodeFile":"",
      //     "FileExtension": "",
      //     "FileName":""
      // }
    ]
  }
  errorMsg: string;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this._doGetProgramType();
  }

  fileSelected;
  _doGetProgramType() {
    this.dataService.post(this.postProgramType, "FileUpload/").then((result) => {
      this.loader = false;
      this.overlay = false;
      this.ProgramList = result;
      this.ProgramList.forEach(res => {
        if(res.fileType == 'excel') {
          res.extensions = ['xls', 'xlsx', 'XLSX','XLS'];
        }
        else if(res.fileType == 'csv') {
          res.extensions = ['csv'];
        }
        else if(res.FileType == 'text') {
          res.extensions = ['prn', 'txt'];
        }
        else if(res.FileType == 'image') {
          res.extensions = ['gif', 'jpg','jpej', 'png'];
        }
        else if(res.FileType == 'document') {
          res.extensions = ['doc'];
        }
      })
    },
      (err) => {
        this.loader = false;
        this.overlay = false;
        this.ErrorModel = true;
        this.errorMsg = 'Some Error occoured!  Please contact ISD.'
      }
    );
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
      that.fileUploadData[0].EncodeBase64 = splited;
      that.fileUploadData[0].FileName = file.name;
    };
    reader.onerror = function (error) {
    };
  }

  changeType(event) {

    // this.fileTypeList = [...new Set(this.ProgramList.map(item => {
    //   if(item.programConfigID==event.target.value) {
    //     return item.FileType
    //   }}))]
    this.fileTypeList = [];
    this.ProgramList.forEach(item => {
      if (item.programConfigID == event.target.value) {
        this.fileUploadData.filePath = item.filePath;
        this.fileUploadData.programName = item.programName;
        this.fileUploadData.status = item.status;
        this.fileUploadData.extensions = item.extensions;
        this.fileTypeList.push(item.fileType);
      }
    })
  }

  closeErrorModal() {
    this.ErrorModel = false;
  }

 
  fileData: any[] = [];
  _uploadmultipleFile(event) {
    //this.fileUploadData.fileAttributesList = [];
    this.submitClicked = true;
    if (this.fileUploadData.programConfigID != '' && this.fileUploadData.fileType != '') {
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
            var fileNamesplit = val.name.split('.')[1];
            if (this.fileUploadData.fileAttributesList.filter(res => res.fileName == val.name).length == 0) {
              this.fileUploadData.fileAttributesList.push({ fileName: val.name, encodeFile: splited, fileExtension: fileNamesplit });
            }
          };
        });
      }
    }
    else {
      this.submitClicked = true;
    }
  }
  submitDialog = false;
  Submit() {
    let count = 0;
    if (this.fileUploadData.programConfigID != '' && this.fileUploadData.fileType != '' && this.fileUploadData.type != '') {
      this.fileUploadData.fileAttributesList.filter(res =>{
        if(this.fileUploadData.extensions.includes(res.fileExtension)) {
          count++;
        }
      } )
      // if (this.fileUploadData.fileAttributesList.filter(res => res.fileExtension != this.fileUploadData.fileType).length == 0) {
       if(count == this.fileUploadData.fileAttributesList.length) {
      this.dataService.post1(this.fileUploadData, "FileUpload/").then((result) => {
          this.submitDialog = true;
          this.errorMsg = result._body;
          this.loader = false;
          this.overlay = false;
          this.reload();
        },(err) => {
            this.loader = false;
            this.overlay = false;
            this.ErrorModel = true;
            this.errorMsg = 'Some Error occoured!  Please contact ISD.'
          }
        );
      }
      else {
        this.ErrorModel = true;
        this.errorMsg = 'Please select ' + this.fileUploadData.extensions.toString() + ' type';
      }


    }
  }

  multiRemoveFile(index) {
    this.fileUploadData.fileAttributesList.splice(index, 1)
  }

  multiClearAllFile() {
    this.fileUploadData.fileAttributesList = [];
  }

  cancelSubmitModal() {
    this.submitDialog = false;
  }

  reload() {
    this.submitClicked = false;
    this.fileUploadData = {
      "action": "ImportFile",
      "createdBy": "Aru-Manual",
      "filePath": "",
      "fileType": "",
      "programConfigID": '',
      "programName": "",
      "status": true,
      "type": '',
      "fileAttributesList": [
       
      ]
    }
  }

}
