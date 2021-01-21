import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/AuthService';
import { UserRegistration } from 'src/app/shared/types/userregistration';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  success: boolean;
  error: string;
  userRegistration: UserRegistration = { name: '', email: '', password: '' };
  submitted: boolean = false;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
  }

  onSubmit() {
  }
}