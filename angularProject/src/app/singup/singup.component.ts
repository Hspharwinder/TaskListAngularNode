import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  roleStore:[];

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private crudService: CrudService,
      private toastr: ToastrService,
  ) { 
      // redirect to home if already logged in
      // if (this.authenticationService.currentUserValue) { 
      //     this.router.navigate(['/']);
      // }
  }

  ngOnInit() {
      // this.roleStore = this.data.getRole();
      console.log(this.roleStore);
      this.registerForm = this.formBuilder.group({
          // firstName: ['', Validators.required],
          // lastName: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          // role: ['', Validators.required],
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
          this.registerForm.get('role').markAllAsTouched();
        return;
    }

    this.loading = true;
    // first() -- > emit only first value from source also emit first value with true condition
    // here source is values returned by register(this.registerForm.value)
    this.crudService.register(this.registerForm.value)
    .subscribe(
      data => {
          if (data.message == "row inserted"){
              this.toastr.success('Registration successful'); 
              this.router.navigate(['/login']);
          }
          else if (data.message == "duplicate email"){
              this.toastr.error('duplicate email');
          }else{
              this.toastr.error("error " + data.message);
          }
            console.log("data response ", data.message);  
          this.loading = false;          
      },
      error => {
          if (error.status == 0) {
              this.toastr.error('Error Api connection refused !!');
          }
          else {
              this.toastr.error('Internal Server Error !!');
          }   
      this.loading = false;
  });
  }

  get role(){
      return this.registerForm.get('role');
  }

}
