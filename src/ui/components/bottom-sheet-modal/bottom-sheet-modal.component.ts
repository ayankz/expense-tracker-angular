import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { GlobalModalService } from '../../../core/services/global-modal.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-bottom-sheet-modal',
  imports: [CommonModule, MatIconModule],
  templateUrl: './bottom-sheet-modal.component.html',
  styleUrl: './bottom-sheet-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomSheetModalComponent {
  private modalService = inject(GlobalModalService);
  isVisible = computed(() => this.modalService.isOpenModal());
  content = this.modalService.content;

  close() {
    this.modalService.close();
  }
}
