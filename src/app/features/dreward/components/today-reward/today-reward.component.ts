import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { DrewardService } from '../../services/dreward.service';
import { Reward } from '../../../../shared/models/reward.model';
import { IconMaterialPipe } from '../../../../shared/pipes/icon-material.pipe';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { HistoryRewardsComponent } from '../history-rewards/history-rewards.component';

type TodayRewardState = 'available' | 'rolling' | 'done';

@Component({
  selector: 'app-today-reward',
  templateUrl: './today-reward.component.html',
  styleUrl: './today-reward.component.scss',
  imports: [IconMaterialPipe],
})
export class TodayRewardComponent {
  todayState = signal<TodayRewardState>('done');
  todayReward = signal<Reward | null>(null);
  rewardsList = signal<Reward[]>([]);
  winningIndex = signal<number | null>(null);
  

  @ViewChild('strip') stripRef!: ElementRef<HTMLDivElement>;

  constructor(private drewardService: DrewardService, private modal: ModalService) {}

  async ngOnInit() {
    const available = await this.drewardService.isBoxAvailable();
    this.todayState.set(available ? 'available' : 'done');
    this.todayReward.set(await this.drewardService.getTodayReward());
  }

  get StateIsAvalible() {
    return this.todayState() === 'available';
  }

  async openBox() {
    this.todayState.set('rolling');
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

  open(){
    this.modal.open(HistoryRewardsComponent)
      .subscribe(result => {
        if (result) console.log('Saved name:', result);
    });
  }
}
