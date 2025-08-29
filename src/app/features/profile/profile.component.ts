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
    return u ? u.materials.reduce((sum, m) => sum + m.price * m.amount, 0) : 0;
  }
}
