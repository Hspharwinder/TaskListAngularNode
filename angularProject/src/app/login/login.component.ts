import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private crudService: CrudService,
        private toastr:ToastrService,
    ) {
        // redirect to home if already logged in
        // if (this.crudService.canActivate()) { 
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        const user = {emai:this.f.email.value , password:this.f.password.value };

        this.loading = true;
        this.crudService.login(this.f.email.value, this.f.password.value)
            .subscribe(
                data => {
                  debugger;
                  localStorage.setItem("user", JSON.stringify(user));
                    this.toastr.success('Login Sucess !!', 'Toastr fun!');
                    this.router.navigate(['/home'], { queryParams: { userId: data[0]._id } });
                },
                error => {
                    if(error.status == 0){
                        this.toastr.error('Error Api connection refused !!');
                    }
                    else{
                        this.toastr.error('Invalid User Password !!');                        
                    }       
                    this.loading = false;             
                });
    }

}
