import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiEndpoints } from 'src/app/shared/services/api_endpoints';
import { ApiProviderService } from 'src/app/shared/services/api_provider.service';
import { NotificationType } from 'src/app/shared/services/model/toast-message';
import { ToastService } from 'src/app/shared/services/toast.service';
// import { ToastService } from 'src/app/shared/services/toast.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserinfoComponent {
  usersForm!: FormGroup;
  checked: boolean = false;
  UserList: any = [];
  UserTypeList: any = [];
  message!: string;
  isLoading: boolean = false;
  isLoadingData: boolean = false;
  isDisabled: boolean = false;
  isUpdate!: boolean;
  globalUserCode!: number;
  duplicateData: any;

  get formValue() {
    return this.usersForm.getRawValue();
  }
  get f() {
    return this.usersForm.controls;
  }
  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiProviderService,
    private _UtilityService: UtilityService,
  // private toastService: ToastService,
  ) {}
  ngOnInit() {
    // if (typeof localStorage !== 'undefined') {
    //   // Access localStorage here
    // } else {
    //   console.error('localStorage is not available.');
    // }
    this.formInit();
    this.globalUserCode = +localStorage.getItem('UserId')!;
    this.getAllUsers();
    this.getAllUserType();
  }
  formInit() {
    this.usersForm = this._fb.group({
      UserCode: [null],
      UserTypeCode: ['', Validators.required],
      Username: [null, [Validators.required]],
      PhoneNo: [null],
      Email: [null, [Validators.required]],
      Password: [null, [Validators.required]],
      IsActive: [true]
    });
  }
  getRowusersForm(data: any) {
    this.isUpdate = true;
    this.usersForm.patchValue({ ...data });
  }
  getAllUsers() {
    this.isLoadingData = true;
    this._apiService.get(ApiEndpoints.users).subscribe({
      next: (res: any) => {
        debugger
        this.UserList = res.data;
        this.isLoadingData = false;
      },
      error: (err) => {
        this.isLoadingData = false;
      },
    });
  }
  getAllUserType() {
    this.isLoadingData = true;
    this._apiService.get(ApiEndpoints.usertype).subscribe({
      next: (res: any) => {
        this.UserTypeList = res.data;
        this.isLoadingData = false;
      },
      error: (err) => {
        this.isLoadingData = false;
      },
    });
  }
  addorUpdateUser() {
    if (this.usersForm.invalid) {
      this._UtilityService.markAllFieldsAsDirtyAndTouched(this.usersForm);
      return;
    }
    if (this.isUpdate) {
      this.updateUser();
    } else {
      this.saveUser();
    }
  }
  saveUser() {
    debugger;
    let payLoad = this.usersForm.value;
    payLoad.CreatedBy = this.globalUserCode;
    // Check for duplicate designation name
    const existingUser = this._UtilityService.hasDuplicateValue(
      payLoad.Username,
      'Username',
      this.UserList
    );
    if (existingUser) {
      alert('already exists ');
      this.duplicateData = existingUser;
      return;
    }
    this.duplicateData = 0;
    debugger
    this._apiService.post(payLoad, ApiEndpoints.users).subscribe((res) => {
      debugger
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      // alert('Saved Successfully! ');
      this.formInit();
      this.getAllUsers();
    });
  }
  updateUser() {
    debugger;
    let payLoad: any = { ...this.usersForm.value };
    payLoad.ModifiedBy = this.globalUserCode;
    // // Check for duplicate designation name
    const existingUser = this._UtilityService.hasDuplicateValue(
      payLoad,
      'UserCode',
      this.UserList,
      true,
      'UserCode'
    );
    if (existingUser) {
      alert('already exists ');
      this.duplicateData = existingUser;
      return;
    }
    this._apiService.update(payLoad, ApiEndpoints.users).subscribe((res) => {
     // alert('update successfully ');
     Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been Updated",
      showConfirmButton: false,
      timer: 1500
    });
      this.isUpdate = false;
      this.formInit();
      this.getAllUsers();
    });
  }
  deleteUser(UserCode: number) {
    this._apiService
      .delete(ApiEndpoints.users + `/${UserCode}`)
      .subscribe((res) => {
        this.getAllUsers();
        if (res === true) {
          //alert('deleted ');
          Swal.fire({
            position: "top-end",
            icon: "error", // Use "error" for a delete icon
            title: "Your work has been Deleted", // Corrected typo
            showConfirmButton: false,
            timer: 1500
          });
          
        }
      });
    // this._confirmationService.confirm({
    //     message: 'Do you want to delete this record?',
    //     header: 'Delete Confirmation',
    //     icon: 'pi pi-info-circle',
    //     acceptButtonStyleClass:"p-button-danger p-button-text",
    //     rejectButtonStyleClass:"p-button-text p-button-text",
    //     acceptIcon:"none",
    //     rejectIcon:"none",
    //     accept: () => {
    //       this._apiService
    //       .delete(ApiEndpoints.users + `/${UserCode}`)
    //       .subscribe((res) => {
    //         this.getAllUsers();
    //         if (res === true) {
    //           alert('deleted ');
    //         }
    //       });        },
    //     reject: () => {
    //         this._messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
    //     }
    // });
  }
  refresh() {
    this.isUpdate = false;
    this.formInit();
  }
}
