import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router, RouterEvent } from '@angular/router';
import { ApiEndpoints } from 'src/app/shared/services/api_endpoints';
import { ApiProviderService } from 'src/app/shared/services/api_provider.service';

@Component({
  selector: 'app-ninthclass-master',
  templateUrl: './ninthclass-master.component.html',
  styleUrls: ['./ninthclass-master.component.scss'],
})
export class NinthclassMasterComponent {
  isLoadingData:boolean=false;
  StudentList:any=[];
  isUpdate!:boolean;
  globalUserCode:number=0;

  ViewForm!:FormGroup;
  constructor(private _router: Router,
    private fb:FormBuilder,
    private _apiService:ApiProviderService
  ) {}

ngOnInit(){
  // this.formInit();
  this.globalUserCode=+localStorage.getItem('UserId')!;
  this.getAllStudents();
}
  // formInit(){
  //   this.ViewForm=this.fb.group({
  //   Name:this.fb.control(''),

  //   })
  // }
  onAddNew() {
    this._router.navigate(['/ninthClass-Detail']);
    // relativeTo: this._router;
  }

  getAllStudents(){
    this.isLoadingData=true;
    this._apiService.get(ApiEndpoints.ninthClassStudents).subscribe({
      next:(res:any)=>{
        this.StudentList=res.data;
        this.isLoadingData=false;
      },
      error:(err)=>{
        this.isLoadingData=false;
      },
    })
  }

  getStudents(data: any) {
    this.isUpdate = true;
    if (data) {
      const Student_ID = data;
      this._router.navigate(['/ninthClass-Detail'], {
        queryParams: { Student_ID: Student_ID},
      });
    }
  }

  deleteStudent(Student_ID:number){
 this._apiService.delete(ApiEndpoints.ninthClassStudents +`/${Student_ID}`)
 .subscribe((res)=>{
  this.getAllStudents();
  if(res==true){
    alert('deleted');
  }
 })
  }
}
