import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  email: string;
  password: string;
  confirmPassword: string;
  login: User;
  constructor(private router: Router, private authServise: AuthService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    // Validación de formulario
    if (form.invalid) {
      return;
    }

    const signIn: any = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
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

    // Petición para validar usuario
    this.authServise.signIn(signIn).subscribe(
      (resp: any) => {
        // En caso de éxito
        Swal.fire({
          icon: 'success',
          title: resp.message,
          showConfirmButton: false,
          timer: 1500,
          willClose: () => {
            this.router.navigateByUrl('/login');
          },
        });
      },
      (err) => {
        console.log('err', err );

        // En caso de éxito
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
}
