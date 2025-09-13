import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { Star } from '../../models/star.effect';

@Component({
  selector: 'app-stars-effect',
  imports: [],
  template: '<canvas #starsCanvas class="stars-canvas"></canvas>',
  styles:
    '.stars-canvas{position: fixed;top: 0;left: 0;z-index: -1;width: 100%;height: 100%;pointer-events: none;} .stars-canvas{display: block;width: 100%;height: 100%;}',
})
export class StarsEffectComponent implements AfterViewInit {
  @ViewChild('starsCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private width!: number;
  private height!: number;

  ngAfterViewInit(): void {
    this.resize();
    this.initStars(100);
    this.animate();
  }

  @HostListener('window:resize')
  resize(): void {
    const canvas = this.canvasRef.nativeElement;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = canvas.getContext('2d')!;
  }

  private initStars(count: number): void {
    this.stars = Array.from({ length: count }, () => this.createStar());
  }

  private createStar(): Star {
    const colors = [
      '255,255,255', //white
      '160,140,230', //blue
    ];

    const color = colors[Math.floor(Math.random() * colors.length)];

    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      size: Math.random() * 2,
      opacity: Math.random(),
      fade: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      speed: Math.random() * 0.05 + 0.01,
      life: 0,
      maxLife: Math.random() * 300 + 200,
      color,
    };
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.stars.forEach((star, i) => {
      star.y -= star.speed;
      star.life++;

      const halfLife = star.maxLife / 2;

      if (star.life < halfLife) {
        star.opacity = star.life / halfLife;
      } else {
        star.opacity = 1 - (star.life - halfLife) / halfLife;
      }

      if (star.life >= star.maxLife || star.y < 0) {
        this.stars[i] = this.createStar();
      }

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${star.color}, ${star.opacity})`;
      this.ctx.fill();
    });

    requestAnimationFrame(this.animate);
  };
}
