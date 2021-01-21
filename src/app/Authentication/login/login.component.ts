import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/AuthService';
import { FormBuilder, FormGroup, NgForm, Validators  } from '@angular/forms';
import { LoggedUser } from 'src/app/shared/types/loggedinuser';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'kkd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  quickBlox:any;
  loginForm: FormGroup;
  isSubmitted  =  false;
  user:LoggedUser;
  showLoginErrorMessage: boolean = false;
  logInObs: Observable<{ success: boolean, token: string }>;

  constructor(private authService:AuthService,private formBuilder:FormBuilder,private router: Router,private route: ActivatedRoute) { 
    // redirect to home if already logged in
    if (this.authService.isLoggedIn) {
      
      this.router.navigate(["/dashboard"]);
    }
  }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  } 

  title="Login";
  public login(loginForm: NgForm){
    if(loginForm.value.username == "dpulsipher@cmd.com" && loginForm.value.password == "Password@123"){
      this.authService.login(this.loginForm.value);
    }
    else{
      this.showLoginErrorMessage = true;
      loginForm.reset();
    }
  } 

  public logout(){
    this.authService.signout();
  }
}
