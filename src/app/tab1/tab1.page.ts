import { PasswordService } from './../services/password.service';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IPassword } from '../interfaces/IPassword';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  password: IPassword = {
    priority: ''
  }
  inputNewPassword: string = '';

  constructor(
    private passwordService: PasswordService
  ) { }

  createPassword(password: string) {
    this.passwordService.createTicket(password)
  }


}
