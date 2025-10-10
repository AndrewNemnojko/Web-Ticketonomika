import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-market-page',
  imports: [DecimalPipe],
  templateUrl: './market-page.component.html',
  styleUrl: './market-page.component.scss'
})
export class MarketPageComponent {
  balance = 125.43;
  mood = '98% FOMO, 2% віри';
  strategy = 'Відкуп з дна, яке ще не настало';

  logs: string[] = [
    '💎 Тримаю з 2021 — поки не відпущу',
    '📉 Купив на хаях, але це ще не хаи',
    '🤡 Продав перед ростом — стабільність наше все'
  ];

  onDeposit(): void {
    const amount = +(Math.random() * 100 + 10).toFixed(2);
    this.balance += amount;
    this.addLog(`🚀 Додепнув ${amount} USDT`);
    setTimeout(() => {
      const loss = +(Math.random() * (amount * 1.3)).toFixed(2);
      this.balance = Math.max(this.balance - loss, 0);
      this.addLog(`💥 Ринок вирішив інакше: -${loss} USDT`);
    }, 3000);
  }

  private addLog(entry: string): void {
    this.logs.unshift(entry);
    if (this.logs.length > 5) this.logs.pop();
  }
}
