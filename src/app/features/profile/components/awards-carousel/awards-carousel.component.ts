import { DatePipe } from '@angular/common';
import { Component, Input, input } from '@angular/core';

export interface Award {
  id: number;
  name: string;
  issuance: Date;
  description: string;
}

@Component({
  selector: 'app-awards-carousel',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './awards-carousel.component.html',
  styleUrls: ['./awards-carousel.component.scss'],
})
export class AwardsCarouselComponent {
  @Input() awards: Award[] = [];
}
