import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  addTaskForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  userId: any;

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

    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
      this.router.navigate(['/login']);
      return;
    }
         

    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      console.log("usrId -- ", this.userId)
    });

      this.addTaskForm = this.formBuilder.group({
          userId:this.userId,
          taskName: ['', Validators.required],
          taskDetail: ['', Validators.required],
          taskComplete:false

      });

      // get return url from route parameters or default to '/'
      // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

      
  }

  // convenience getter for easy access to form fields
  get f() { return this.addTaskForm.controls; }

 

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.addTaskForm.invalid) {
          return;
      }

      this.route.queryParams.subscribe(params => {
        this.userId = params['userId'];
        console.log("usrId -- ", this.userId)
      });

      // this.addTaskForm.userId = this.userId;
      debugger;
      this.loading = true;
      this.crudService.postTask(this.addTaskForm.value)
          .subscribe(
              data => {
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
