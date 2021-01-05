import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css'],
})
export class RecoveryComponent implements OnInit {
  correo: string;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  enviar(form: NgForm): void {
    // Validación de formulario
    if (form.valid) {
      Swal.fire({
        title: 'Cargando...',
        text: 'Estamos validando los datos ingresados',
        icon: 'info',
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      // Petición para validar datos y actualizar
      this.auth.recoveryData(this.correo).subscribe((resp: any) => {
        if (resp) {
          // En caso de éxito
          Swal.fire({
            icon: 'success',
            title: 'El correo se envio correctamente',
            showConfirmButton: false,
            timer: 1500,
            willClose: () => {
              this.router.navigateByUrl('/login');
            },
          });
        } else {
          // En caso de éxito
          Swal.fire(
            'error',
            'No se pudo recurar sus credenciales de inicio, intentelo de nuevo si el problema persiste contacte con el administrador',
            'error'
          );
        }
      });
    }
  }
}
