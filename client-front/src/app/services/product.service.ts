import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];
  private urlEndPoint: string = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  findAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.urlEndPoint);
  }

  findAllPageable(page: number): Observable<any> {
    return this.http.get<any[]>(`${this.urlEndPoint}/page/${page}`);
  }

  findById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.urlEndPoint}/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.urlEndPoint, product);
  }

  update(product: Product):Observable<Product> {
    return this.http.put<Product>(`${this.urlEndPoint}/${product.id}`, product);
  }

  delete(id: number):Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }
}
