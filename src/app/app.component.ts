import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Ticketonomika';

  constructor(
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
  ) {
    this.TitleEventInit();
  }
  private TitleEventInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route.data),
      )
      .subscribe((data) => {
        const title = data['title']
          ? `Ticketonomics - ${data['title']}`
          : 'Ticketonomics';
        this.titleService.setTitle(title);
      });
  }
}
