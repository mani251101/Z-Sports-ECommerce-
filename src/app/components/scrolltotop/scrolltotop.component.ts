import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scrolltotop',
  templateUrl: './scrolltotop.component.html',
  styleUrls: ['./scrolltotop.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [style({ opacity: 0 }), animate(300)]),
      transition('* => void', [animate(300, style({ opacity: 0 }))]),
    ]),
  ]
})
export class ScrolltotopComponent {

  showScrollToTopButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showScrollToTopButton = window.pageYOffset > 300;
  }

  ScrollToTop(): void
  {
    window.scrollTo({ top:0, behavior: 'smooth'})
  }
}
