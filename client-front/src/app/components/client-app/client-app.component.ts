import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { SharingDataService } from '../../services/sharing-data.service';
import Swal from 'sweetalert2';
import { Invoice } from '../../models/invoice';

@Component({
  selector: 'app-client-app',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './client-app.component.html',
})
export class ClientAppComponent implements OnInit {

  clients: Client[] = [];
  paginator: any = {};
  invoice!: Invoice;

  constructor(
    private router: Router,
    private service: ClientService,
    private sharingData: SharingDataService) {
  }

  ngOnInit(): void {
    this.addUser();
    this.findUserById();
    this.removeUser();
    this.pageClientEvent();
  }

  pageClientEvent() {
    this.sharingData.pageEventEmitter.subscribe(pageable => {
      this.clients = pageable.clients;
      this.paginator = pageable.paginator
    });
  }

  findUserById() {
    this.sharingData.findClientByIdEventEmitter.subscribe(id => {

      const client = this.clients.find(client => client.id == id);

      this.sharingData.selectClientEventEmitter.emit(client);
      
    })
  }
  

  addUser() {
    
    this.sharingData.newClientEventEmitter.subscribe(client => {
      if (client.id > 0) {
        
        this.service.update(client).subscribe(
          {
            next: (clientUpdated) => {
              this.clients = this.clients.map(u => (u.id == clientUpdated.id) ? { ...clientUpdated } : u);
              this.router.navigate(['/clients'], {
                state: {
                  clients: this.clients,
                  paginator: this.paginator
               } });
            
              Swal.fire({
                title: "Actualizado!",
                text: "Usuario editado con exito!",
                icon: "success"
              });
            },
            error: (err) => {
              // console.log(err.error)
              if (err.status == 400) {
                this.sharingData.errorsFormEventEmitter.emit(err.error);
              }
            }
          })

      } else {
        this.service.create(client).subscribe( {
          next: clientNew =>  {
          console.log(client)
          this.clients = [... this.clients, { ...clientNew }];

            this.router.navigate(['/clients'], {
              state: {
                clients: this.clients,
                paginator: this.paginator
             } });
            
            Swal.fire({
              title: "Creado nuevo usuario!",
              text: "Usuario creado con exito!",
              icon: "success"
            });
          },
          error: (err) => {
            // console.log(err.error)
            // console.log(err.status)
            if (err.status == 400) {
              this.sharingData.errorsFormEventEmitter.emit(err.error);
            }
 
        }})
      }

    })
  }

  removeUser(): void {
    this.sharingData.idClientEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Seguro que quiere eliminar?",
        text: "Cuidado el usuario sera eliminado del sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"   
      }).then((result) => {
        if (result.isConfirmed) {

          this.service.remove(id).subscribe(() => {
            this.clients = this.clients.filter(client => client.id != id);
            this.router.navigate(['/clients/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/clients'], {
                state: {
                  cl: this.clients,
                  paginator: this.paginator
               } });
            });
          })

          Swal.fire({
            title: "Eliminado!",
            text: "Usuario eliminado con exito.",
            icon: "success"
          });
        }
      });
    });
  }

}
