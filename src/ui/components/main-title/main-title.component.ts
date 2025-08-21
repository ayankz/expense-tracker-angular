import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { NavigationEnd, Router} from '@angular/router';
import {distinctUntilChanged, filter, map, Observable, startWith} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-main-title',
  standalone: true,
  templateUrl: './main-title.component.html',
  styleUrl: './main-title.component.scss',
  imports: [
    AsyncPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainTitleComponent implements OnInit {
  protected title$!: Observable<string>;
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.title$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        let route = this.router.routerState.root;
        route = route.firstChild || route;
        return route.snapshot.data['title'];
      }),
      distinctUntilChanged()
    );
  }
}
