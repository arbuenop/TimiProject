import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import Swal from 'sweetalert2';
import { UsersService } from './database/users.service';

export interface Alert{
  title: string,
  msg: string,
}

@Injectable({
  providedIn: 'root'
})

export class SwalService {

  constructor(
    private _router: Router,
    private db: UsersService,


  ) { }

  messageInf(title: string, msg:string){

    Swal.fire({
      icon: 'info',
      title: title,
      text: msg,
      width: 600,
      padding: '3em',
      color: 'yellow',
      background: `rgb(41, 41, 41)`,
      confirmButtonColor: "yellow"
    })
  }

  messageErr(error: string) {
      Swal.fire({
        icon: 'error',
        title: error,
        width: 600,
        padding: '3em',
        color: 'yellow',
        background: `rgb(41, 41, 41)`,
        confirmButtonColor: "yellow"
      })
  }

  deleteUserInfoSwal(){
    Swal.fire({
      title: 'Alerta!',
      text: 'Si vuelves hacia atrás la información de usuario existente desaparecerá y deberas volver a verificar el número de teléfono!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText:'Cancelar',
      confirmButtonColor: "yellow",
      confirmButtonText: 'Volver atrás!',
      cancelButtonColor: '#d33',
      width: 600,
      padding: '3em',
      color: 'yellow',
      background: `rgb(41, 41, 41)`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Eliminado!',
          text: 'La información de usuario ha sido eliminada.',
          icon: 'success',
          padding: '3em',
          color: 'yellow',
          background: `rgb(41, 41, 41)`,
          confirmButtonColor: "yellow",
          confirmButtonText: 'Volver atrás!',
        })
        if (sessionStorage.getItem('userNumber')||sessionStorage.getItem('userNumber')=='') sessionStorage.removeItem('userNumber')
        if (sessionStorage.getItem('user-key') || sessionStorage.getItem('user-key') == '') {
          var uid = sessionStorage.getItem('user-key');
          if (uid) this.db.deleteUserById(uid);
          sessionStorage.removeItem('user-key')
        }
        if (sessionStorage.getItem('userEmail') || sessionStorage.getItem('userEmail') == '') sessionStorage.removeItem('userEmail');
        if (localStorage.getItem('user-auth-data')) localStorage.removeItem('user-auth-data');
        if (sessionStorage.getItem('user')||sessionStorage.getItem('user-key')=='') sessionStorage.removeItem('user')

        this._router.navigate(['auth/'])
      }
    })
  }

  messageSucc(msg: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: msg,
      color: 'yellow',
      width: 390,
      background: `rgb(41, 41, 41)`,
    })
  }


  //Profile Swals
  /*--------------------------------------*/
  ageProfile():any{
      var atributos = {
        min: '8',
        max: '120',
        step: '1'
      }
    return Swal.fire({
      title: 'Quantos años tienes?',
      icon: 'question',
      input: 'range',
      inputLabel: 'tu edad',
      inputAttributes : atributos,
      inputValue: 25,
      confirmButtonColor: "yellow",
      padding: '3em',
      color: 'yellow',
      background: `rgb(41, 41, 41)`,

    })
  }

  locationProfile():any{
    return Swal.fire({
      title: 'Select field validation',
      input: 'select',
      inputOptions: {
        'Fruits': {
          apples: 'Apples',
          bananas: 'Bananas',
          grapes: 'Grapes',
          oranges: 'Oranges'
        },
        'Vegetables': {
          potato: 'Potato',
          broccoli: 'Broccoli',
          carrot: 'Carrot'
        },
        'icecream': 'Ice cream'
      },
      inputPlaceholder: 'Select a fruit',
      showCancelButton: true,
    })
  }

  warningProfile():any{
    return Swal.fire({
      title: 'Alerta!',
      text: 'Si vuelves hacia atrás la información introducida se borrara y tendrás que volver a poner tu edad y tu ubicación',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText:'Cancelar',
      confirmButtonColor: "yellow",
      confirmButtonText: 'Volver atrás!',
      cancelButtonColor: '#d33',
      width: 600,
      padding: '3em',
      color: 'yellow',
      background: `rgb(41, 41, 41)`
    })
  }
  /*--------------------------------------*/

  /*Error Metod*/
  getErrorMsg(err:any):string {

    var msg = '';

    switch(err) {
      case 'auth/claims-too-large': {
        msg = 'La carga útil de la reclamación que se entregó a setCustomUserClaims() supera el tamaño máximo de 1,000 bytes.'
        break;
      }
      case 'auth/email-already-exists': {
        msg = 'Otro usuario ya está utilizando el correo electrónico proporcionado'
        break;
      }
      case 'auth/id-token-expired': {
        msg = 'El token de ID de Firebase que se proporcionó está vencido.'
        break;
      }
      case 'auth/id-token-revoked': {
        msg = 'Se revocó el token de ID de Firebase.'
        break;
      }
      case 'auth/insufficient-permission': {
        msg = 'La credencial que se usó para inicializar el SDK de Admin no tiene permisos suficientes para acceder al recurso de Authentication solicitado.'
        break;
      }
      case 'auth/internal-error': {
        msg = 'Has de poner tu contraseña'
        break;
      }
      case 'auth/invalid-argument': {
        msg = 'Se proporcionó un argumento no válido'
        break;
      }
      case 'auth/invalid-claims': {
        msg = 'Los atributos personalizados del reclamo no son válidos.'
        break;
      }
      case 'auth/invalid-continue-uri': {
        msg = 'La URL de continuación debe ser una URL válida.'
        break;
      }
      case 'auth/invalid-creation-time': {
        msg = 'La hora de creación debe ser una fecha en formato UTC válida.'
        break;
      }
      case 'auth/invalid-credential': {
        msg = 'La credencial que se usa para autenticar los SDK de Admin no se puede emplear a fin de realizar la acción deseada.'
        break;
      }
      case 'auth/invalid-disabled-field': {
        msg = 'El valor que se proporcionó para la propiedad del usuario disabled no es válido.'
        break;
      }
      case 'auth/invalid-display-name': {
        msg = 'El valor que se proporcionó para la propiedad del usuario displayName no es válido.'
        break;
      }
      case 'auth/invalid-dynamic-link-domain': {
        msg = 'El dominio del vínculo dinámico proporcionado no se configuró o no se autorizó para el proyecto actual.'
        break;
      }
      case 'auth/invalid-email': {
        msg = 'El valor que se proporcionó para la propiedad del usuario email no es válido.'
        break;
      }
      case 'auth/invalid-email-verified': {
        msg = 'El valor que se proporcionó para la propiedad del usuario emailVerified no es válido.'
        break;
      }
      case 'auth/invalid-hash-algorithm': {
        msg = 'El algoritmo de hash debe coincidir con las strings de la lista de algoritmos compatibles.'
        break;
      }
      case 'auth/invalid-hash-block-size': {
        msg = 'El tamaño del conjunto de hash debe ser un número válido.'
        break;
      }
      case 'auth/invalid-hash-derived-key-length': {
        msg = 'La longitud de la clave derivada de hash debe ser un número válido.'
        break;
      }
      case 'auth/invalid-hash-key': {
        msg = 'La clave de hash debe ser un búfer de bytes válido.'
        break;
      }
      case 'auth/invalid-hash-memory-cost': {
        msg = 'El costo de la memoria de hash debe ser un número válido.'
        break;
      }
      case 'auth/invalid-hash-parallelization': {
        msg = 'La paralelización de hash debe ser un número válido.'
        break;
      }
      case 'auth/invalid-hash-rounds': {
        msg = 'Las rondas de hash deben ser un número válido.'
        break;
      }
      case 'auth/invalid-hash-salt-separator': {
        msg = 'El campo del separador de sal del algoritmo de hash debe ser un búfer de bytes válido.'
        break;
      }
      case 'auth/invalid-id-token': {
        msg = 'El token de ID que se proporcionó no es un token de ID de Firebase válido.'
        break;
      }
      case 'auth/invalid-last-sign-in-time': {
        msg = 'La hora del último acceso debe ser una string de fecha en formato UTC válida.'
        break;
      }
      case 'auth/invalid-page-token': {
        msg = 'El token de página siguiente no es válido.'
        break;
      }
      case 'auth/invalid-password': {
        msg = 'El valor que se proporcionó para la propiedad del usuario password no es válido.'
        break;
      }
      case 'auth/invalid-password-hash': {
        msg = 'El hash de contraseñas debe ser un búfer de bytes válidos.'
        break;
      }
      case 'auth/invalid-password-salt': {
        msg = 'La contraseña con sal debe ser un búfer de bytes válido.'
        break;
      }
      case 'auth/invalid-phone-number': {
        msg = 'El valor que se proporcionó para phoneNumber no es válido.'
        break;
      }
      case 'auth/invalid-photo-url': {
        msg = 'El valor que se proporcionó para la propiedad del usuario photoURL no es válido.'
        break;
      }
      case 'auth/invalid-provider-data': {
        msg = 'providerData debe ser una serie de objetos UserInfo.'
        break;
      }
      case 'auth/invalid-provider-id': {
        msg = 'providerId debe ser una string del identificador del proveedor compatible válida.'
        break;
      }
      case 'auth/invalid-oauth-responsetype': {
        msg = 'Se debe configurar solo un responseType de OAuth como verdadera.'
        break;
      }
      case 'auth/invalid-session-cookie-duration': {
        msg = 'La duración de la cookie de sesión debe ser un número válido en milisegundos que vaya entre los 5 minutos y las 2 semanas.'
        break;
      }
      case 'auth/invalid-uid': {
        msg = 'El uid proporcionado debe ser una string no vacía con un máximo de 128 caracteres.'
        break;
      }
      case 'auth/invalid-user-import': {
        msg = 'El registro de usuarios para importar no es válido.'
        break;
      }
      case 'auth/maximum-user-count-exceeded': {
        msg = 'Se excedió la cantidad máxima de usuarios permitidos para importar.'
        break;
      }
      case 'auth/missing-android-pkg-name': {
        msg = 'Si es obligatorio instalar la app para Android, debe proporcionarse un nombre de paquete de Android.'
        break;
      }
      case 'auth/missing-continue-uri': {
        msg = 'Se debe proporcionar una URL de continuación válida en la solicitud.'
        break;
      }
      case 'auth/missing-hash-algorithm': {
        msg = 'Para importar usuarios con hash de contraseñas, es necesario proporcionar el algoritmo de hash y sus parámetros.'
        break;
      }
      case 'auth/missing-ios-bundle-id': {
        msg = 'La solicitud debe contener un ID del paquete de iOS.'
        break;
      }
      case 'auth/missing-uid': {
        msg = 'Se requiere un identificador uid para la operación actual.'
        break;
      }
      case 'auth/missing-oauth-client-secret': {
        msg = 'El secreto de cliente de la configuración de OAuth es obligatorio para habilitar el flujo de código de OIDC.'
        break;
      }
      case 'auth/operation-not-allowed': {
        msg = 'El proveedor de acceso proporcionado está inhabilitado para tu proyecto de Firebase.'
        break;
      }
      case 'auth/phone-number-already-exists': {
        msg = 'Otro usuario ya utiliza el numero de teléfono proporcionado.'
        break;
      }
      case 'auth/project-not-found': {
        msg = 'No se encontró ningún proyecto de Firebase para la credencial que se usó para inicializar los SDK de Admin.'
        break;
      }
      case 'auth/reserved-claims': {
        msg = 'Una o más reclamaciones personalizadas de usuarios están reservadas.'
        break;
      }
      case 'auth/session-cookie-expired': {
        msg = 'La cookie proporcionada de la sesión de Firebase venció.'
        break;
      }
      case 'auth/session-cookie-revoked': {
        msg = 'Se revocaron las cookies de la sesión de Firebase.'
        break;
      }
      case 'auth/uid-already-exists': {
        msg = 'Otro usuario ya utiliza el uid proporcionado.'
        break;
      }
      case 'auth/unauthorized-continue-uri': {
        msg = 'El dominio de la URL de continuación no está en la lista blanca.'
        break;
      }
      case 'auth/user-not-found': {
        msg = 'Este usuario no existe'
        break;
      }
      case 'auth/wrong-password': {
        msg = 'Contraseña incorrecta'
        break;
      }
      case 'auth/email-already-in-use': {
        msg = 'El correo electrónico está actualmente en uso'
        break;
      }
      default:{
        msg = err
        break;
      }
   }

    return msg;

  }
}
