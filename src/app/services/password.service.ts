import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPassword, IPasswordResponse } from '../interfaces/IPassword';
import { IMetrics } from '../interfaces/IMetrics';


@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private readonly API = 'http://localhost:3000/api/v1/ticket';
  inputNewPassword: string = '';
  public passwordGeral: number = 0;public passwordPrior: number = 0;public passwordExame: number = 0;public passwordTotal: number = 0;
  passwordArr: any = {
    SE: [],
    SP: [],
    SG: []
  }
  constructor(
    private http: HttpClient
  ) { }

  createTicket(ticket: String) {
    if(ticket === 'SG') {
      this.somGeral();
      this.inputNewPassword =  new Date().getFullYear().toString().substring(2,4) + new Date().getMonth().toString().padStart(2, '0') + new Date().getDay().toString().padStart(2,'0') + '-' + ticket + (this.passwordArr['SG'].length + 1).toString().padStart(2,'0');
      this.passwordArr.SG.push(this.inputNewPassword)
    } else if (ticket === 'SP'){
        this.somPrior();
        this.inputNewPassword =  new Date().getFullYear().toString().substring(2,4) + new Date().getMonth().toString().padStart(2, '0') + new Date().getDay().toString().padStart(2,'0') + '-' + ticket + (this.passwordArr['SP'].length + 1).toString().padStart(2,'0');
        this.passwordArr.SP.push(this.inputNewPassword)
    }
    else if (ticket === 'SE'){
      this.somExam();
      this.inputNewPassword =  new Date().getFullYear().toString().substring(2,4) + new Date().getMonth().toString().padStart(2,  '0') + new Date().getDay().toString().padStart(2,'0') + '-' + ticket + (this.passwordArr['SE'].length + 1).toString().padStart(2,'0');
      this.passwordArr.SE.push(this.inputNewPassword)
    }
    console.log(this.passwordArr)
  }

  somGeral(){
    this.passwordGeral++;this.passwordTotal++;
  }
  somPrior(){
    this.passwordPrior++;this.passwordTotal++;
  }
  somExam(){
    this.passwordExame++;this.passwordTotal++;
  }

  listAllTPasswordsIsAttendanceTrue(): Observable<IPasswordResponse[]>{
    return this.http.get<IPasswordResponse[]>(this.API)
  }

  findLastAttendanceIsTrue(): Observable<IPasswordResponse>{
    return this.http.get<IPasswordResponse>(this.API + '/lastAttendance')
  }

  callAttendance(): Observable<IPasswordResponse>{
    return this.http.put<IPasswordResponse>(this.API + '/callAttendance', {})
  }

  metricsOfAttendance(): Observable<IMetrics>{
    return this.http.get<IMetrics>(this.API + '/count-by-prioritys', {})
  }
}
