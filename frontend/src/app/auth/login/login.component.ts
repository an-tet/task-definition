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
  constructor(private router: Router, private loginServise: AuthService) {}

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.email = localStorage.getItem('email');
      this.rememberMe = true;
    }

    localStorage.removeItem('token');
  }

  onSubmit(form: NgForm): void {
    // Validación de formulario
    if (form.invalid) {
      return;
    }
    this.login = new User(this.email, this.password);

    Swal.fire({
      title: 'Cargando...',
      text: 'Estamos validando los datos ingresados',
      icon: 'info',
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    // // Petición para validar usuario
    // this.loginServise.validarLogin(this.login).subscribe(
    //   (resp) => {
    //     if (this.rememberMe) {
    //       localStorage.setItem('usuario', this.user);
    //     }

    //     // En caso de éxito
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'Datos correctos',
    //       showConfirmButton: false,
    //       timer: 1500,
    //       willClose: () => {
    //         this.router.navigateByUrl('/home');
    //       },
    //     });
    //   },
    //   (err) => {
    //     console.log(err);

    //     // En caso de éxito
    //     Swal.fire(
    //       'error',
    //       !err.error.msg
    //         ? 'ha ocurrido un error inesperado contacte con el administrador'
    //         : err.error.msg,
    //       'error'
    //     );
    //   }
    // );
  }

  rememberMeChange(): void {
    if (!this.rememberMe) {
      localStorage.removeItem('email');
    }
  }
}
