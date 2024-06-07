import { EventEmitter, Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newClientEventEmitter: EventEmitter<Client> = new EventEmitter();

  private _idClientEventEmitter = new EventEmitter();

  private _findClientByIdEventEmitter = new EventEmitter();

  private _selectClientEventEmitter = new EventEmitter();

  private _errorsFormEventEmitter = new EventEmitter();

  private _pageEventEmitter = new EventEmitter();

  private _newProductEventEmitter: EventEmitter<Product> = new EventEmitter();


  


  constructor() { }

  get newClientEventEmitter(): EventEmitter<Client> {
    return this._newClientEventEmitter;
  }

  get idClientEventEmitter(): EventEmitter<number>{
    return this._idClientEventEmitter;
  }

  get findClientByIdEventEmitter() {
    return this._findClientByIdEventEmitter
  }

  get selectClientEventEmitter() {
    return this._selectClientEventEmitter;
  }
  
  get errorsFormEventEmitter() {
    return this._errorsFormEventEmitter;
  }

  get pageEventEmitter() {
    return this._pageEventEmitter;
  }
}
