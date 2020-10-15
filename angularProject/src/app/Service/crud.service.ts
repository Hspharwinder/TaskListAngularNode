import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseURL, Api } from '../path.config/Api';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CrudService {    

  constructor(private http:HttpClient) { }

  register(user: any):any {
    console.log("service ",user);
    return this.http.post(BaseURL + `/postUser`, user);
  }

  login(email: string, password: string) {
    return this.http.post<any>(BaseURL + `/getUser`, { email, password });
  }

  postTask(data: any) : Observable<any>{
    return this.http.post(BaseURL + `/addTask`, data);
  }

  // get() : Observable<any>{
  //   return this.http.get(BaseURL + `/getTask`);
  // }

  taskDelete(taskId:string) : Observable<any>{
    debugger;
    return this.http.post<any>(BaseURL + `/delete`, { taskId});
  }

  taskComplete(_id:string, taskComplete: boolean) : Observable<any>{
    debugger;
    return this.http.post<any>(BaseURL + `/taskComplete`, { _id, taskComplete: taskComplete });
  }

  getById(userId:string) : Observable<any>{
    debugger;
    return this.http.post<any>(BaseURL + `/getTask`, { userId });
  }

  delete(taskId:string) : Observable<any>{
    return this.http.post<any>(BaseURL + `/delete`, { taskId });
  }
}