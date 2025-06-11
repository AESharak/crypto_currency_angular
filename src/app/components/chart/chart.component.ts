import {
  Component,
  OnDestroy,
  ElementRef,
  AfterViewInit,
  OnChanges,
  input,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartService } from '../../services/chart.service';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
})
export class ChartComponent implements AfterViewInit, OnDestroy, OnChanges {
  private chartService = inject(ChartService);
  private chart = signal<Chart | null>(null);

  public data = input<number[]>([]);
  public color = input<string>('#3b82f6');

  // @ViewChild('chartCanvas', { static: true })
  // chartCanvas!: ElementRef<HTMLCanvasElement>;
  chartCanvas =
    viewChild.required<ElementRef<HTMLCanvasElement>>('chartCanvas');

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    this.chartService.destroyChart(this.chart());
  }

  ngOnChanges(): void {
    if (this.chart() && this.data()?.length > 0) {
      this.createChart();
    }
  }

  private createChart(): void {
    if (!this.chartCanvas()?.nativeElement || this.data()?.length === 0) {
      return;
    }

    const ctx = this.chartCanvas()?.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chartService.destroyChart(this.chart());
    this.chart.set(
      this.chartService.createSparklineChart(ctx, this.data(), this.color())
    );
  }
}
