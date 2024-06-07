import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { RouterModule } from '@angular/router';
import { ModalService } from './modal.service';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoices.service';
import { Invoice } from '../../models/invoice';
import Swal from 'sweetalert2';

@Component({
  selector: 'client-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent {


  title: string = 'Detalles Cliente'

  @Input() client!: Client;

  constructor(
    private invoiceService: InvoiceService,
    public  modalService: ModalService) {
  }

  closeModal() {
    this.modalService.closeModal();
  }

  delete(invoice: Invoice) {

    Swal.fire({
      title: "Seguro que quiere eliminar?",
      text: "Cuidado el usuario sera eliminado del sistema!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si"
    }).then((result) => {
      if (result.value) {
        this.invoiceService.deleteInvoiceById(invoice.id).subscribe(
          () => {
            this.client.invoices = this.client.invoices.filter(i => i !== invoice)
            Swal.fire({
              title: "Eliminado!",
              text: "Usuario eliminado con exito.",
              icon: "success"
            });
          })
      }
    });
  }
}

