import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { distinctUntilChanged, filter, map, Observable, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  protected title$!: Observable<string>;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.title$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        let activeRoute = this.route;
        while (activeRoute.firstChild) {
          activeRoute = activeRoute.firstChild;
        }
        return activeRoute.snapshot.data['title'] || '';
      }),
      distinctUntilChanged()
    );
  }
}
