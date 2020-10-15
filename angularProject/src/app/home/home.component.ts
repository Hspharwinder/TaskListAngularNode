import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Router } from '@angular/router';

// validation for whitespace 
const trimValidator: ValidatorFn = (control: FormControl) => {
  if (control.value.startsWith(' ')) {
    control.setValue('');
    return {
      'trimError': { value: `You couldn't insert whitespace in starting ` }
    };
  }
  return null;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  getData:any = [];
  userId: any;

  constructor(
    private service:CrudService,
    private toastr:ToastrService,
    private formBuilder:FormBuilder,
    private ngxService: NgxUiLoaderService,
    private route: ActivatedRoute,
    private router: Router,
    ) {
  }

  ngOnInit() { 
    const user = JSON.parse(localStorage.getItem('user'));
    // debugger;
    if(!user) {
      this.router.navigate(['/login']);
      return;
    }
    this.getTask();
  }

  addTask(){
    this.router.navigate(['/addTask'], { queryParams: { userId: this.userId } });
  }

  taskComplete(taskId, taskComplete){ 
    this.service.taskComplete(taskId, taskComplete)
    .subscribe(
        data => {
          debugger
            this.getData = data;
            this.getTask();
        },
        error => {
            if(error.status == 0){
                this.toastr.error('Error Api connection refused !!');
            }
            else{
                this.toastr.error('something went wrong !!');                        
            }          
    });
  }

  delete(taskId){
    this.service.taskDelete(taskId)
    .subscribe(
        data => {
          debugger
            this.getData = data;
            this.getTask();
        },
        error => {
            if(error.status == 0){
                this.toastr.error('Error Api connection refused !!');
            }
            else{
                this.toastr.error('something went wrong !!');                        
            }          
    });
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  

  getTask(){
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      console.log("usrId -- ", this.userId)
    });
    this.service.getById(this.userId)
    .subscribe(
        data => {
          debugger
            this.getData = data;
        },
        error => {
            if(error.status == 0){
                this.toastr.error('Error Api connection refused !!');
            }
            else{
                this.toastr.error('something went wrong !!');                        
            }          
        });
      }
}
