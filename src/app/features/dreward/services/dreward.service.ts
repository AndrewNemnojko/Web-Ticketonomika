import { Injectable } from '@angular/core';
import { REWARD_PROBABILITIES } from '../../../shared/models/reward-probabilities';
import { Reward } from '../../../shared/models/reward.model';
import { HttpClient } from '@angular/common/http';
import {
  getRewardsHistory,
  getTodayReward,
  isBoxAvailable,
} from '../../../mocks/rewards.mock';

@Injectable({ providedIn: 'root' })
export class DrewardService {
  private rewardsHistoryKey = 'rewardsHistory';
  private todayRewardKey = 'todayReward';
  private rewardsCache: Reward[] | null = null;
  private todayRewardCache: Reward | null = null;
  private boxAvailableCache: boolean | null = null;

  constructor(private http: HttpClient) {}

  public async getRewardsHistory(): Promise<Reward[]> {
    if (this.rewardsCache) return this.rewardsCache;

    const local = localStorage.getItem(this.rewardsHistoryKey);
    if (local) {
      this.rewardsCache = JSON.parse(local) as Reward[];
      return this.rewardsCache;
    }

    //const history = await firstValueFrom(this.http.get<Reward[]>('/api/rewards/history'));
    const history = await getRewardsHistory(); //ITS MOCK
    const today = new Date();
    this.rewardsCache = history.filter((r) => {
      if (!r.date) return true;
      const d = new Date(r.date);
      return !(
        d.getFullYear() === today.getFullYear() &&
        d.getMonth() === today.getMonth() &&
        d.getDate() === today.getDate()
      );
    });
    localStorage.setItem(
      this.rewardsHistoryKey,
      JSON.stringify(this.rewardsCache),
    );
    return this.rewardsCache;
  }

  public async isBoxAvailable(): Promise<boolean> {
    if (this.boxAvailableCache !== null) return this.boxAvailableCache;
    const local = localStorage.getItem(this.todayRewardKey);

    if (local) {
      const reward = JSON.parse(local) as Reward;
      const rewardDate = new Date(reward.date!);

      const today = new Date();

      const isToday =
        rewardDate.getFullYear() === today.getFullYear() &&
        rewardDate.getMonth() === today.getMonth() &&
        rewardDate.getDate() === today.getDate();

      if (isToday) {
        return false;
      }
    }

    //const status = await firstValueFrom(this.http.get<{ available: boolean }>('/api/rewards/status'));
    const status = await isBoxAvailable(); //ITS MOCK
    this.boxAvailableCache = status;
    return status;
  }

  public async getTodayReward(): Promise<Reward | null> {
    if (this.todayRewardCache) return this.todayRewardCache;

    const local = localStorage.getItem(this.todayRewardKey);
    if (local) {
      const reward = JSON.parse(local) as Reward;
      const rewardDate = new Date(reward.date!);
      const today = new Date();

      const isToday =
        rewardDate.getFullYear() === today.getFullYear() &&
        rewardDate.getMonth() === today.getMonth() &&
        rewardDate.getDate() === today.getDate();

      if (isToday) return reward;
    }

    if (!(await this.isBoxAvailable())) {
      //const history = await firstValueFrom(this.http.get<Reward[]>('/api/rewards/history'));
      const history = await getRewardsHistory(); //ITS MOCK
      const today = new Date();
      const todayReward = history.find((r) => {
        const d = new Date(r.date!);
        return (
          d.getFullYear() === today.getFullYear() &&
          d.getMonth() === today.getMonth() &&
          d.getDate() === today.getDate()
        );
      });

      if (todayReward) {
        this.todayRewardCache = todayReward;
        localStorage.setItem(this.todayRewardKey, JSON.stringify(todayReward));
        return todayReward;
      }
    }
    return null;
  }

  public async OpenBox(): Promise<{
    rewards: Reward[];
    winningIndex: number;
  }> {
    const available = await this.isBoxAvailable();
    if (!available) throw new Error('Box is not available');

    let realReward = await this.getTodayReward();

    if (!realReward) {
      realReward = await getTodayReward();
      this.todayRewardCache = realReward;
      localStorage.setItem(this.todayRewardKey, JSON.stringify(realReward));
    }

    const { rewards, winningIndex } = this.generateRewardsList(realReward);

    this.boxAvailableCache = false;

    return { rewards, winningIndex };
  }

  private generateRewardsList(realReward: Reward): {
    rewards: Reward[];
    winningIndex: number;
  } {
    const list: Reward[] = [];

    while (list.length < 100) {
      const rand = Math.random();
      let cumulative = 0;
      for (const rp of REWARD_PROBABILITIES) {
        cumulative += rp.probability;
        if (rand <= cumulative) {
          const amount = Math.floor(Math.random() * (25 - 5 + 1)) + 5;
          list.push({
            material: rp.reward,
            amount,
          });
          break;
        }
      }
    }

    const winningIndex = Math.floor(Math.random() * (95 - 40 + 1)) + 40;
    list.splice(winningIndex, 0, realReward);
    return { rewards: list, winningIndex };
  }
}
