import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiEndpoints } from 'src/app/shared/services/api_endpoints';
import { ApiProviderService } from 'src/app/shared/services/api_provider.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-studentfees',
  templateUrl: './studentfees.component.html',
  styleUrls: ['./studentfees.component.scss']
})
export class StudentfeesComponent {
StudentFeesForm!:FormGroup;
studentlist:any=[];
classeslist:any=[];
isLoadingData:boolean=false;
Class_ID:number=0;
registrationData:any;
isUpdate!: boolean;
globalUserCode!: number;
isSave: boolean = true;

constructor(
  private _fb:FormBuilder,
  private _apiService: ApiProviderService,
  private _UtilityService: UtilityService,
  private _route: ActivatedRoute
){}

ngOnInit(){
this.formInit();
// this.getStudentFeesById();
 this.loadClasses();
 this.globalUserCode = +localStorage.getItem('UserId')!;
//  this._route.queryParams.subscribe((params) => {
//   this.Class_ID = params['Student_ID'];
// });
// if (this.Class_ID != undefined) {
//   this.isUpdate = true;
// }
}
formInit(){
  this.StudentFeesForm=this._fb.group({
    Student_ID: [null, [Validators.required]],
    Class_ID: [null, [Validators.required]],
    FeeDescription : [null, [Validators.required]],
    Amount: [null, [Validators.required]],
    AmountPaid: [null,[Validators.required]],
    PaymentDate: [null, [Validators.required]],
    IsActive: [true],
  })
}
addorUpdate() {
  if (this.StudentFeesForm.invalid) {
    this._UtilityService.markAllFieldsAsDirtyAndTouched(
      this.StudentFeesForm
    );
    return;
  }
  if (this.isUpdate) {
    // this.update();
  } else {
    this.save();
  }
}
save() {
  debugger;
  let payLoad = this.StudentFeesForm.value;
  payLoad.CreatedBy = this.globalUserCode;
  payLoad.IsActive = payLoad.IsActive ?? false;
  payLoad.ModifiedBy = this.globalUserCode;
  this._apiService.post(payLoad, ApiEndpoints.StudentFees).subscribe({
    next: (res) => {
      debugger
      alert('Saved Successfully');
      this.isSave = false;
      this.Class_ID = res.data;
    }
  });
}


loadClasses() {
  debugger
  this.isLoadingData = true;
  this._apiService.get(ApiEndpoints.StudentClasses).subscribe({
    next: (res: any) => {
      this.classeslist = res.data;
      this.isLoadingData = false;
    },
    error: (err) => {
      this.isLoadingData = false;
    },
  });
}

onClassChange(event: any) {
  debugger
  const selectedClassId = event.value;
  this.loadStudents(selectedClassId);
}

loadStudents(classId: number) {
  debugger
  this.isLoadingData = true;
  this._apiService.get(`${ApiEndpoints.StudentFeesByID}?Class_ID=${classId}`).subscribe({
    next: (res: any) => {
      this.studentlist = res.data;
      this.isLoadingData = false;
    },
    error: (err: any) => {
      console.error('Error fetching student fees:', err);
      this.isLoadingData = false;
    }
  });
}
}

