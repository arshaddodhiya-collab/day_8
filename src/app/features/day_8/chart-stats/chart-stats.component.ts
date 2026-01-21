import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-stats',
  template: `
    <div class="grid">
      <div class="col-12 md:col-6">
        <h3 class="text-center">Monthly Appointments</h3>
        <p-chart type="bar" [data]="barData" [options]="barOptions"></p-chart>
      </div>
      <div class="col-12 md:col-6">
        <h3 class="text-center">Status Distribution</h3>
        <!-- Set height manually for doughnut/pie to avoid massive size -->
        <div class="flex justify-content-center">
          <p-chart
            type="doughnut"
            [data]="doughnutData"
            [options]="doughnutOptions"
            width="300px"
            height="300px"
          ></p-chart>
        </div>
      </div>
    </div>
  `,
})
export class ChartStatsComponent implements OnInit {
  barData: any;
  barOptions: any;
  doughnutData: any;
  doughnutOptions: any;

  ngOnInit() {
    this.initBarChart();
    this.initDoughnutChart();
  }

  initBarChart() {
    this.barData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Completed',
          backgroundColor: '#22c55e',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: 'Cancelled',
          backgroundColor: '#ef4444',
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };

    this.barOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };
  }

  initDoughnutChart() {
    this.doughnutData = {
      labels: ['Confirmed', 'Pending', 'Rejected'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#3B82F6', '#F59E0B', '#EF4444'],
          hoverBackgroundColor: ['#60A5FA', '#FBBF24', '#F87171'],
        },
      ],
    };

    this.doughnutOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
    };
  }
}
