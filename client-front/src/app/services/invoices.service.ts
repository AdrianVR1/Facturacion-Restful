import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private urlEndPoint: string = 'http://localhost:8080/api/invoices';

  constructor(private http: HttpClient) {}

  findInvoiceById(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.urlEndPoint}/${id}`);
  }

  deleteInvoiceById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  findProductByName(term: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.urlEndPoint}/filter/${term}`);
  }

  saveInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.urlEndPoint}/create`, invoice);
  }
}
