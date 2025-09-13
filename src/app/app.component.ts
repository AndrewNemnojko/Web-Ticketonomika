import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StarsEffectComponent } from './shared/components/stars-effect/stars-effect.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StarsEffectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Ticketonomika';
}
