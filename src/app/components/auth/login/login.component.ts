import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/user-login';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;

  constructor(private router: Router, private authService: AuthService, private spinnerService: SpinnerService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',),]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    var spinnerRef = this.spinnerService.start();

    if (!this.loginForm.valid) {
      return;
    }
    const user: UserLogin = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    }
    this.authService.login(user).subscribe((data) => {
      sessionStorage.setItem('isLogin', JSON.stringify(data))
      this.spinnerService.stop(spinnerRef);
      this.router.navigate(['/'])
        .then(() => {
          this.authService.setLoggedIn(true);
        });
    }, (_) => {
      this.spinnerService.stop(spinnerRef);
    });
  }

}
