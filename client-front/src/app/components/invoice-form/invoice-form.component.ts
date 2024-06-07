import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../models/invoice';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { Client } from '../../models/client';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, mergeMap } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { InvoiceService } from '../../services/invoices.service';
import { Product } from '../../models/product';
import { ItemInvoice } from '../../models/item-invoice';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, MatFormFieldModule,
    MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.css'
})
export class InvoiceFormComponent implements OnInit {

  title: string = 'Nueva Factura'
  invoice: Invoice = new Invoice();
  client!: Client;
  errors: any = {};
  errorMessage: string = '';

  myControl = new FormControl();
  filteredOptions!: Observable<Product[]>;

  constructor(
    private invoiceService: InvoiceService,
    private activatedRoute: ActivatedRoute,
    private sharingData: SharingDataService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.sharingData.errorsFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingData.selectClientEventEmitter.subscribe(client => this.invoice.client = client);
    this.activatedRoute.paramMap.subscribe(params => {
      const clientId: number = +(params.get('clientId') || '0');
      if (clientId > 0) {
        this.sharingData.findClientByIdEventEmitter.emit(clientId);
      }
    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.name),
        mergeMap(value => value ? this._filter(value || '') : [])
      );
  }

  private _filter(value: string): Observable<Product[]> {
    const filterValue = value.toLowerCase();

    return this.invoiceService.findProductByName(filterValue);
  }

  showName(product?: Product): string {
    return product ? product.name : '';
  }

  selectedProduct(event: MatAutocompleteSelectedEvent): void {
    let product = event.option.value as Product;
    console.log(product);

    if (this.existItem(product.id)) {
      this.increaseQuantity(product.id);
    } else {
      let newItem = new ItemInvoice();
      newItem.product = product;
      this.invoice.items.push(newItem);
    }

    this.myControl.setValue('');
    event.option.focus();
    event.option.deselect();

    this.errorMessage = '';
  }

  updateQuantity(id: number, event: any) {
    let quantity: number = event.target.value as number;
    if (quantity == 0) {
      return this.deleteProduct(id);
    }

    this.invoice.items = this.invoice.items.map((item: ItemInvoice) => {
      if (id === item.product.id) {
        item.quantity = quantity;
      }
      return item;
    })
  }

  existItem(id: number): boolean {
    let exist = false;
    this.invoice.items.forEach((item: ItemInvoice) => {
      if (id === item.product.id) {
        exist = true;
      }
    })
    return exist;
  }

  increaseQuantity(id: number): void {
    this.invoice.items = this.invoice.items.map((item: ItemInvoice) => {
      if (id === item.product.id) {
        ++item.quantity;
      }
      return item;
    })
  }

  deleteProduct(id: number): void {
    this.invoice.items = this.invoice.items.filter((item: ItemInvoice) => id != item.product.id);
  }


  create(): void {

    if (this.invoice.items.length === 0) {
      this.errorMessage = 'Debe agregar al menos un producto a la factura.';
      return;
    }
    this.invoiceService.saveInvoice(this.invoice).subscribe({
      next: (invoice) => {
        Swal.fire({
          title: "Factura Creada!",
          text: "Factura creada con éxito!",
          icon: "success"
        });
        this.router.navigate(['/clients']);
      },
      error: (error) => {
        if (error.status === 400) {
          this.sharingData.errorsFormEventEmitter.emit(error.error);
        }
      }
    });
  }

}


