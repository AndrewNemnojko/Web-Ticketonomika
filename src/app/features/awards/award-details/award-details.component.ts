import { Component, Input } from '@angular/core';
import { Award } from '../../../shared/models/award.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-award-details',
  imports: [DatePipe],
  templateUrl: './award-details.component.html',
  styleUrl: './award-details.component.scss'
})
export class AwardDetailsComponent {
  @Input() award: Award | null = null;

  getCode(award: string): string {
    return award.split(']')[0] + "]"; 
  }
  getName(award: string): string {
    return award.substring(award.indexOf(']') + 1);
  }
}
