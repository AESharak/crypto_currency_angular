import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full h-full">
      <canvas #chartCanvas class="w-full h-full"></canvas>
    </div>
  `,
})
export class ChartComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  @Input() data: number[] = [];
  @Input() color: string = '#3b82f6';
  @Input() height: number = 60;
  @ViewChild('chartCanvas', { static: true })
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;

  ngOnInit(): void {
    // Component initialized
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart(): void {
    if (!this.chartCanvas?.nativeElement || this.data.length === 0) {
      return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // Determine color based on trend
    const isPositive = this.data[this.data.length - 1] > this.data[0];
    const lineColor = isPositive ? '#10b981' : '#ef4444';

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.data.map((_, index) => index.toString()),
        datasets: [
          {
            data: this.data,
            borderColor: lineColor,
            backgroundColor: `${lineColor}20`,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        interaction: {
          intersect: false,
        },
      },
    };

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, config);
  }

  ngOnChanges(): void {
    if (this.chart && this.data && this.data.length > 0) {
      this.createChart();
    }
  }
}
