import {
  Component,
  Input,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { ChartService } from '../../services/chart.service';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
})
export class ChartComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() data: number[] = [];
  @Input() color: string = '#3b82f6';
  @Input() height: number = 60;
  @ViewChild('chartCanvas', { static: true })
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;

  constructor(private chartService: ChartService) {}

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    this.chartService.destroyChart(this.chart);
  }

  ngOnChanges(): void {
    if (this.chart && this.data?.length > 0) {
      this.createChart();
    }
  }

  private createChart(): void {
    if (!this.chartCanvas?.nativeElement || this.data.length === 0) {
      return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chartService.destroyChart(this.chart);
    this.chart = this.chartService.createSparklineChart(
      ctx,
      this.data,
      this.color
    );
  }
}
