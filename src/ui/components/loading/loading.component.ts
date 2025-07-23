import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {
  private loadingService = inject(LoadingService);
  public isLoading = computed(() => this.loadingService.isLoading());
}
