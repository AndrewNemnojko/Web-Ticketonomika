import { Component, inject} from "@angular/core";
import { IconMaterialPipe } from "../../shared/pipes/icon-material.pipe";
import { UserService } from "../../core/services/user.service";

@Component({
  selector: 'app-profile',
  imports: [IconMaterialPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent{
  private userService = inject(UserService);

  user = this.userService.currentUser;

  constructor() {
    this.userService.getCurrentUser();
  }

  get totalMaterialsCost(): number {
    const u = this.user();
    const sum = u
      ? u.materials.reduce((s, m) => s + m.price * m.amount, 0)
      : 0;
    return Math.round(sum * 100) / 100;
  }
}
