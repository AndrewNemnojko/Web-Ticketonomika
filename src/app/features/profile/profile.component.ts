import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IconMaterialPipe } from '../../shared/pipes/icon-material.pipe';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs';
import { AwardsCarouselComponent } from '../awards/awards-carousel/awards-carousel.component';
import { ModalService } from '../../shared/components/modal/modal.service';
import { AwardDetailsComponent } from '../awards/award-details/award-details.component';
import { Award } from '../../shared/models/award.model';

@Component({
  selector: 'app-profile',
  imports: [IconMaterialPipe, AwardsCarouselComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  user: User | null = null;
  private userSub!: Subscription;

  ngOnInit(): void {
    this.userSub = this.authService.currentUser$.subscribe((u) => {
      this.user = u;
    });

    this.authService.getUser().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  get totalMaterialsCost(): number {
    if (!this.user || !this.user.materials) return 0;
    const sum = this.user.materials.reduce((s, m) => s + m.price * m.amount, 0);
    return Math.round(sum * 100) / 100;
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '/svg/image.svg';
  }
}
