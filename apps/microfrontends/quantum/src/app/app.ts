import { Component } from '@angular/core';
import { RouterOutlet  } from '@angular/router';

@Component({
  imports: [ RouterOutlet ],
  selector: 'app-quantum-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'quantum';
}
