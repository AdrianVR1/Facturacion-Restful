import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../models/invoice';
import { InvoiceService } from '../../services/invoices.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-invoice',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './details-invoice.component.html',
  styleUrl: './details-invoice.component.css'
})
export class DetailsInvoiceComponent implements OnInit{

  invoice!: Invoice;
  title: string = 'Factura';
  
  constructor(
    private invoiceService: InvoiceService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +(params.get('id') || '0');
      this.invoiceService.findInvoiceById(id).subscribe(invoice => this.invoice = invoice);
    });
  }

}
