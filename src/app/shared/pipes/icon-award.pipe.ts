import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconAward',
  standalone: true,
})
export class IconAwardPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '❕';

    const map: Record<string, string> = {
      'DF-L3': '🛡️',
      'CU-L3': '🎨',
      'SO-L3': '🤝',
      'CU-L2': '🎵',
      'DF-L2': '⚔️',
      'SO-L2': '⚙️',
    };

    return map[value] || '🏅';
  }
}
