import { Component, Input } from '@angular/core';
import { IconMaterialPipe } from "../../../shared/pipes/icon-material.pipe";
import { RouterLink } from '@angular/router';
import { MaterialBalance } from '../../../shared/models/material-balance.model';


@Component({
  selector: 'app-material-details',
  imports: [IconMaterialPipe, RouterLink],
  templateUrl: './material-details.component.html',
  styleUrl: './material-details.component.scss'
})
export class MaterialDetailsComponent {
   @Input() material: MaterialBalance | null = null;
   calcSum(amount: number, price: number){
      return (amount * price).toFixed(2)
   }
}
