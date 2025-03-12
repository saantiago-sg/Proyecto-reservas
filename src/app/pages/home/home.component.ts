import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  /* 
    TO DO:
      * Listar tabla de excel obteniendo de una api sheet
      * Crear row en excel haciendo un post a api sheet
      * Editar row en excel haciendo un update a api sheet
      * Eliminar row en excel haciendo delete a api sheet 
  */


  /*
  ✔ Frontend en Netlify (gratis y rápido).
  ✔ Backend en Render (gratis, pero se "duerme" si no hay tráfico).

  Subir el código del backend a GitHub.

  Ir a Render y crear un nuevo servicio:

  Seleccioná "Web Service".
  Conectá tu repo de GitHub.
  En "Start Command", poné:
  bash
  Copy
  Edit
  node server.js
  Seteá el puerto en 3000.
  Render asignará una URL como https://mi-api.onrender.com.
  Actualizar Angular con la nueva URL del backend.
  */
  createBooking(){
    console.log("reservar");
  }
}
