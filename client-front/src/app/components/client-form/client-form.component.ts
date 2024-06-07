import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { City } from '../../models/city';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form-component.css'
})
export class ClientFormComponent implements OnInit {

  client: Client;
  errors: any = {};
  cities: City[];


  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
    private service: ClientService) {
    this.client = new Client();
    this.cities = [];
  }


  ngOnInit(): void {
    this.sharingData.errorsFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingData.selectClientEventEmitter.subscribe(client => this.client = client);
    this.service.getCity().subscribe(cities => this.cities = cities);

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');

      if (id > 0) {
        this.sharingData.findClientByIdEventEmitter.emit(id);
      }
    });
  }

  onSubmit(userForm: NgForm): void {
      this.sharingData.newClientEventEmitter.emit(this.client);
      console.log(this.client);
  }
  
  onClear(userForm: NgForm): void {
    this.client = new Client();
    userForm.reset();
    userForm.resetForm();
  }

  compareCity(city1: any, city2: any): boolean {
    if(city1 == undefined && city2 == undefined) {
      return true;
    }
    return city1 && city2 ? city1.id == city2.id : city1 == city2;
  }

}
