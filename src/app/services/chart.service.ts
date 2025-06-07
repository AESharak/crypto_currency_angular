import { Injectable } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  createSparklineChart(
    ctx: CanvasRenderingContext2D,
    data: number[],
    color?: string
  ): Chart {
    const isPositive = data[data.length - 1] > data[0];
    const lineColor = color || (isPositive ? '#10b981' : '#ef4444');

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: data.map((_, index) => index.toString()),
        datasets: [
          {
            data: data,
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
      options: this.getSparklineOptions(),
    };

    return new Chart(ctx, config);
  }

  private getSparklineOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      scales: {
        x: { display: false },
        y: { display: false },
      },
      elements: {
        point: { radius: 0 },
      },
      interaction: {
        intersect: false,
      },
    };
  }

  destroyChart(chart: Chart | null): void {
    if (chart) {
      chart.destroy();
    }
  }
}
