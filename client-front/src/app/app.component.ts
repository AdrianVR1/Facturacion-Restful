import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientAppComponent } from './components/client-app/client-app.component';


// import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClientAppComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'client-app'
}
