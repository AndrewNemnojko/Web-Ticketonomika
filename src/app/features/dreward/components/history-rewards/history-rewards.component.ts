import { Component, signal } from '@angular/core';
import { Reward } from '../../../../shared/models/reward.model';
import { DrewardService } from '../../services/dreward.service';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { IconMaterialPipe } from '../../../../shared/pipes/icon-material.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history-rewards',
  imports: [IconMaterialPipe, DatePipe],
  templateUrl: './history-rewards.component.html',
  styleUrl: './history-rewards.component.scss'
})
export class HistoryRewardsComponent {
  rewardsHistory = signal<Reward[]>([]);

  constructor(private drewardService: DrewardService, private modal: ModalService) {}

  async ngOnInit() {
    this.rewardsHistory.set(await this.drewardService.getRewardsHistory());
  }

}
