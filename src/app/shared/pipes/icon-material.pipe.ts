import { Pipe, PipeTransform } from '@angular/core';
import { MATERIAL_EMOJIS } from '../models/materials.constants';

@Pipe({
  name: 'iconMaterial'
})
export class IconMaterialPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '❕';
    return `materials/${value}.png`;
  }
}
