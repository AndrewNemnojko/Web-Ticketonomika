import { Component, OnInit } from '@angular/core';
import { MaterialsService } from '../services/materials.service';
import { Material } from '../../../shared/models/material.model';
import { IconMaterialPipe } from '../../../shared/pipes/icon-material.pipe';

@Component({
  selector: 'app-materials-page',
  imports: [IconMaterialPipe],
  templateUrl: './materials-page.component.html',
  styleUrl: './materials-page.component.scss'
})
export class MaterialsPageComponent implements OnInit{
  materials: Material[] = [];

  constructor(private materialsService: MaterialsService) {}
  
  ngOnInit() {
    this.materialsService.getMaterials().subscribe(data => {
      this.materials = data;
    });
  }
}
