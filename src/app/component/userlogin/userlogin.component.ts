import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiEndpoints } from 'src/app/shared/services/api_endpoints';
import { ApiProviderService } from 'src/app/shared/services/api_provider.service';
import { NotificationType } from 'src/app/shared/services/model/toast-message';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent {
  loginform!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private utilityService: UtilityService,
    private apiService : ApiProviderService,
    private messageservice:MessageService,
  ) {}

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.loginform = this.fb.group({
      username: [
        null,
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)],
      ],
      password: [
        null,
        [Validators.required],
      ],
    });
  }

  login() {
  debugger;
  
  // Check form validity
  if (this.loginform.invalid) {
    this.utilityService.markAllFieldsAsDirtyAndTouched(this.loginform);
    return;
  }

  let model = this.loginform.value;
  

  this.apiService.post(model, ApiEndpoints.Login).subscribe(
    res => {
      if(res.status==true){
        Swal.fire({
          title: "Success",
          text: "Logged in Successfully",
          icon: "success"
        });
      }
      
      if(res.status== false){
        Swal.fire({
          title: "Error",
          text: "Invalid Username or Password",
          icon: "error"
        });
      }
      // Check if the response has data and if UserCode is available
      if (res && res.data && res.data.length > 0 && res.data[0].UserCode) {
        localStorage.setItem('UserId', res.data[0].UserCode);
        this.router.navigate(['dashboard']);
      } 
    },
    error => {
      Swal.fire({
        title: "Error",
        text: "Invalid Username or Password",
        icon: "error"
      });
      // Log the error for debugging purposes
      // console.error('Login Error:', error);
      // this.messageservice.add({severity: 'error', summary: 'Error', detail: "Something Went Wrong"});
    }
  );
}

  
}
