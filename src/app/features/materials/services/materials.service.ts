import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Material } from '../../../shared/models/material.model';
import { Observable, of } from 'rxjs';
import { MOCK_MATERIALS } from '../../../mocks/materials.mock';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {
  constructor(private http: HttpClient) {}

  getMaterials(): Observable<Material[]> {
    return of(MOCK_MATERIALS);
  }
}
