import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Award } from '../../../shared/models/award.model';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { AwardDetailsComponent } from '../award-details/award-details.component';

@Component({
  selector: 'app-awards-carousel',
  standalone: true,
  templateUrl: './awards-carousel.component.html',
  styleUrls: ['./awards-carousel.component.scss'],
  imports: [DatePipe],
})
export class AwardsCarouselComponent implements AfterViewInit, OnDestroy {
  @Input() awards: Award[] = [];

  @ViewChild('carousel', { static: false })
  carousel!: ElementRef<HTMLDivElement>;

  visibleCount = 1;
  visiblePage = 0;
  currentPage = 0;

  private resizeHandler = () => this.updateVisibleCount();
  private scrollHandler = () => this.updateCurrentPage();

  constructor(private zone: NgZone, private modal: ModalService) {}

   open(award: Award) {
    this.modal.open(AwardDetailsComponent, { award: award })
      .subscribe(result => {
        if (result) console.log('Saved name:', result);
      });
    }
  ngAfterViewInit() {
    this.updateVisibleCount();
    window.addEventListener('resize', this.resizeHandler);
    const el = this.carousel?.nativeElement;
    if (!el) return;
    el.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  private updateCurrentPage() {
    const el = this.carousel?.nativeElement;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const width = el.clientWidth;
    const page = Math.round(scrollLeft / width);

    this.zone.run(() => {
      this.currentPage = Math.max(0, Math.min(page, this.pageCount - 1));
      this.visiblePage = this.currentPage;
    });
  }

  ngOnDestroy(): void {
    this.carousel?.nativeElement?.removeEventListener(
      'scroll',
      this.scrollHandler,
    );
    window.removeEventListener('resize', this.resizeHandler);
  }

  private updateVisibleCount() {
    const rootStyles = getComputedStyle(document.documentElement);
    const value = rootStyles.getPropertyValue('--awards-count').trim();
    const count = parseInt(value, 10);
    this.visibleCount = count > 0 ? count : 1;
    if (this.visiblePage >= this.pageCount) {
      this.visiblePage = this.pageCount - 1;
    }
    this.scrollToPage(this.visiblePage, false);
  }

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.awards.length / this.visibleCount));
  }

  get pages(): number[] {
    return Array.from({ length: this.pageCount }, (_, i) => i);
  }

  scrollLeft() {
    this.scrollToPage(Math.max(0, this.visiblePage - 1));
  }

  scrollRight() {
    this.scrollToPage(Math.min(this.pageCount - 1, this.visiblePage + 1));
  }

  scrollToPage(index: number, smooth = true) {
    if (!this.carousel) return;
    const target = Math.max(0, Math.min(this.pageCount - 1, index));
    const el = this.carousel.nativeElement;
    const pageWidth = el.clientWidth;
    el.scrollTo({
      left: target * pageWidth,
      behavior: smooth ? 'smooth' : 'auto',
    });
    this.visiblePage = target;
  }

  displayTitle(award: Award) {
    //const first = (award.name || '').split(' ')[0];
    //return award.name?.replace(first, '').trim();
    const first = (award.name || '').split(']')[1];
    return first;
  }

  getCode(award: string): string {
    const match = award.match(/\[(.*?)\]/); 
    return match ? match[1].toLowerCase() : '';
  }
}
