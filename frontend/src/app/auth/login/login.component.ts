import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  rememberMe = false;
  login: User;
  constructor(private router: Router, private authServise: AuthService) {}

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.email = localStorage.getItem('email');
      this.rememberMe = true;
    }

    localStorage.removeItem('token');
  }

  onSubmit(form: NgForm): void {
    
    if (form.invalid) {
      return;
    }

    const login: any = {
      email: this.email,
      password: this.password,
    };

    Swal.fire({
      title: 'Loading',
      text: 'verifying your data',
      icon: 'info',
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    
    this.authServise.verifyLogin(login).subscribe(
      (resp: any) => {
        if (this.rememberMe) {
          localStorage.setItem('email', this.email);
        }

        Swal.fire({
          icon: 'success',
          title: resp.message,
          showConfirmButton: false,
          timer: 1500,
          willClose: () => {
            this.router.navigateByUrl('/home');
          },
        });
      },
      (err) => {
        Swal.fire(
          'error',
          !err.error.message
            ? 'Something its wrong'
            : err.error.message,
          'error'
        );
      }
    );
  }

  rememberMeChange(): void {
    if (!this.rememberMe) {
      localStorage.removeItem('email');
    }
    localStorage.setItem('email', this.email);
  }
}
