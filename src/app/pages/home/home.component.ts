import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [ApiService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  reservations: any[] = [];
  newReservation = { nombre: '', apellido: '', fecha: '', hora: '' };

  constructor(
    private api: ApiService // private router: Router,
  ) {}

  ngOnInit(): void {
    this.getReservations();
  }

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

  getReservations() {
    this.api.getReservations().subscribe({
      next: (data) => {
        console.log(data);
        this.reservations = data;
      },
      error: (err) => {
        console.error('Error obteniendo reservas', err);
      },
    });
  }
  createBooking() {
    if (
      !this.newReservation.nombre ||
      !this.newReservation.apellido ||
      !this.newReservation.fecha ||
      !this.newReservation.hora
    ) {
      console.warn('Faltan datos para la reserva');
      return;
    }

    this.api.createReservation(this.newReservation).subscribe({
      next: (res) => {
        console.log('Reserva creada:', res);
        this.getReservations(); // Refrescar la lista de reservas
        this.newReservation = { nombre: '', apellido: '', fecha: '', hora: '' }; // Resetear formulario
      },
      error: (err) => {
        console.error('Error creando reserva', err);
      },
    });
  }
}
