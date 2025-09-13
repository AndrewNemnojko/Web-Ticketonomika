import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { DrewardService } from '../services/dreward.service';
import { Reward } from '../../../shared/models/reward.model';
import { IconMaterialPipe } from '../../../shared/pipes/icon-material.pipe';
import { interval, map, startWith } from 'rxjs';
import { DatePipe } from '@angular/common';

type TodayRewardState = 'available' | 'opening' | 'done';

@Component({
  selector: 'app-dreward',
  templateUrl: './dreward.component.html',
  styleUrl: './dreward.component.scss',
  imports: [IconMaterialPipe, DatePipe],
})
export class DrewardComponent {
  todayState = signal<TodayRewardState>('available');
  todayReward = signal<Reward | null>(null);
  rewardsList = signal<Reward[]>([]);
  winningIndex = signal<number | null>(null);
  rewardsHistory = signal<Reward[]>([]);

  @ViewChild('strip') stripRef!: ElementRef<HTMLDivElement>;

  constructor(private drewardService: DrewardService) {}

  async ngOnInit() {
    const available = await this.drewardService.isBoxAvailable();
    this.todayState.set(available ? 'available' : 'done');
    this.todayReward.set(await this.drewardService.getTodayReward());
    this.rewardsHistory.set(await this.drewardService.getRewardsHistory());
  }

  async openBox() {
    this.todayState.set('opening');
    const result = await this.drewardService.OpenBox();
    this.rewardsList.set(result.rewards);
    this.winningIndex.set(result.winningIndex);

    setTimeout(() => this.runSlotAnimation(result.winningIndex), 50);
  }

  async runSlotAnimation(winningIndex: number) {
    const strip = this.stripRef.nativeElement;

    const itemWidth = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--reward-size',
      ),
    );

    const winningOffset =
      (winningIndex - (itemWidth === 70 ? 3 : 2)) * itemWidth;

    const animation = strip.animate(
      [
        { transform: `translateX(-${0}px)` },
        { transform: `translateX(-${winningOffset / 2}px)` },
        { transform: `translateX(-${winningOffset}px)` },
      ],
      {
        duration: 5000,
        easing: 'cubic-bezier(0.2, 0.8, 0.4, 1)',
        fill: 'forwards',
      },
    );

    animation.onfinish = async () => {
      strip.classList.add('fade-out');
      setTimeout(async () => {
        this.todayReward.set(await this.drewardService.getTodayReward());
        this.todayState.set('done');
      }, 600);
    };
  }

  isWinning(i: number) {
    return i === this.winningIndex();
  }
}
