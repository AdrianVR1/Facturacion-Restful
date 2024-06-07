import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaginatorComponent } from '../paginator/paginator.component';
import { ClientDetailsComponent } from '../client-details/client-details.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ModalService } from '../client-details/modal.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'client-list',
  standalone: true,
  imports: [RouterModule, PaginatorComponent, ClientDetailsComponent, CommonModule,MatIconModule, FormsModule], 
  templateUrl: './clients-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientsListComponent implements OnInit{

  title: string = 'Listado de Clientes'

  clients: Client[] = [];
  paginator: any = {};
  clientSelected!:Client;
  searchKey: string = '';


  constructor(
    private service: ClientService,
    private modalService: ModalService,
    private sharingData: SharingDataService,
    private router: Router,
    private route: ActivatedRoute) {

    if (this.router.getCurrentNavigation()?.extras.state) {
      this.clients = this.router.getCurrentNavigation()?.extras.state!['clients'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }
  }

  ngOnInit(): void {
    if (this.clients == undefined || this.clients == null || this.clients.length == 0) {
      console.log('consulta findAll')
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        console.log(page)
        this.service.findAllPageable(page).subscribe(pageable => {
          this.clients = pageable.content as Client[];
          this.paginator = pageable;
          this.sharingData.pageEventEmitter.emit({clients: this.clients, paginator: this.paginator});
        });
      })
    }
  }

  
  onRemoveUser(id: number): void {
    this.sharingData.idClientEventEmitter.emit(id);

  }

  onSelectedUser(client: Client): void {
    this.router.navigate(['/clients/edit', client.id]);
  }

  openModal(client: Client) {
    this.clientSelected = client;
    this.modalService.openModal();
  }

  searchClient(): void {
    this.service.findClientByName(this.searchKey).subscribe(clients => {
      this.clients = clients;
    });
  }
}


