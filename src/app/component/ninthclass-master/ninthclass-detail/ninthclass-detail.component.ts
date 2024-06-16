import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiEndpoints } from 'src/app/shared/services/api_endpoints';
import { ApiProviderService } from 'src/app/shared/services/api_provider.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-ninthclass-detail',
  templateUrl: './ninthclass-detail.component.html',
  styleUrls: ['./ninthclass-detail.component.scss'],
})
export class NinthclassDetailComponent {
  StudentForm!: FormGroup;
  isUpdate!: boolean;
  isSave: boolean = true;
  StudentDetailForm!: FormGroup;
  globalUserCode!: number;
  Student_ID: number = 0;
  genderList:any=[];
  StudentList : any = [];
  isLoadingData:boolean=false;
  registrationData:any;
  datePipe = new DatePipe('en-US');
  constructor(
    private _UtilityService: UtilityService,
    private _apiService: ApiProviderService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.formInit();
    this.globalUserCode = +localStorage.getItem('UserId')!;
    this._route.queryParams.subscribe((params) => {
      this.Student_ID = params['Student_ID'];
    });
    if (this.Student_ID != undefined) {
      this.isUpdate = true;
    }
    this.getAllGender();
    // this.getAllStudents();
    this.getStudentById();
  }
  formInit() {
    this.StudentDetailForm = this._fb.group({
      Student_ID: [null],
      Name: [null, [Validators.required]],
      Date_of_Birth: [null, [Validators.required]],
      GenderCode: [null, [Validators.required]],
      Contact_Number: [null, [Validators.required]],
      Email: [null],
      Address: [null, [Validators.required]],
      Father_Name: [null, Validators.required],
      Father_Occupation: [null, [Validators.required]],
      Mother_Name: [null],
      Mother_Occupation: [null, [Validators.required]],
      IsActive: [true],
      CreatedBy: [null],
      CreatedOn: [null],
    });
  }
  addorUpdate() {
    if (this.StudentDetailForm.invalid) {
      this._UtilityService.markAllFieldsAsDirtyAndTouched(
        this.StudentDetailForm
      );
      return;
    }
    if (this.isUpdate) {
      this.update();
    } else {
      this.save();
    }
  }
  save() {
    debugger
    let payLoad = this.StudentDetailForm.value;
    payLoad.CreatedBy = this.globalUserCode;
    payLoad.IsActive = payLoad.IsActive ?? false;
    this._apiService
      .post(payLoad, ApiEndpoints.ninthClassStudents)
      .subscribe((res) => {
        alert('Saved Successfully');
        this.isSave = false;
        this.Student_ID = res.data;
      });
  }
  update() {
    debugger
    let payLoad = this.StudentDetailForm.value;
    payLoad.CreatedBy = this.globalUserCode;
    payLoad.IsActive = payLoad.IsActive ?? false;

    this._apiService
      .update(payLoad, ApiEndpoints.ninthClassStudents)
      .subscribe((res) => {
        alert('Updated Successfylly');
        this.isUpdate = false;
        this.formInit();
      });
  }
  refresh() {
    this.isUpdate = false;
    this.formInit();
  }

  getAllGender() {
    this.isLoadingData = true;
    this._apiService.get(ApiEndpoints.gender).subscribe({
      next: (res: any) => {
        this.genderList = res.data;
        this.isLoadingData = false;
      },
      error: (err) => {
        this.isLoadingData = false;
      },
    });
  }


  getStudentById() {
    this.isLoadingData = true;
    this._apiService.get(`${ApiEndpoints.ninthClassStudentById}?Student_ID=${this.Student_ID}`).subscribe({
      next: (res: any) => {
        this.registrationData = res.data[0];
        this.StudentDetailForm.patchValue({...this.registrationData})
        let formattedDate = this.datePipe.transform(this.registrationData.Date_of_Birth, 'yyyy-MM-dd');
        this.StudentDetailForm.patchValue({
          Date_of_Birth: formattedDate
        });
        this.isLoadingData = false;
      },
      error: (err) => {
        this.isLoadingData = false;
      }
    });
  }

  // getAllStudents() {
  //   debugger
  //   this.isLoadingData = true;
  //   this._apiService.get(ApiEndpoints.ninthClassStudents).subscribe({
  //     next: (res: any) => {
  //       this.StudentList = res.data;
  //       this.isLoadingData = false;
  //     },
  //     error: (err) => {
  //       this.isLoadingData = false;
  //     },
  //   });
  // }
}
