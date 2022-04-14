import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})

export class VerifyEmailComponent implements OnInit {
  cardTitle = 'Grácias por Registrarte!';
  cardSubTitle = 'Un último paso'
  message1 = 'Te hemos enviado un correo a ';
  message2 = 'Por favor, comprueba tu bandeja de entrada y haz click en el enlace para verificar tu correo electrónico.';

  resendLabel = 'Reenviar código';
  returnLabel = 'Iniciar sesión';

  sentLabel = 'Enviado!'
  sent = true;

  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() {
  }
}
