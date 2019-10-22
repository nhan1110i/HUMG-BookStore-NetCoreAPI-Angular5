import { Component, OnInit } from '@angular/core';
import { GetAuthorization } from '../../config/config';
import { Chart } from 'chart.js'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  BarChart = [];
  getChart() {
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ["20/10", "21/10", "22/10", "23/10", "24/10", "15/10"],
        datasets: [{
          label: '# of Votes',
          data: [100, 20, 30, 40, 10, 80],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: "Số đơn hàng tuần",
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  constructor() { }
  token: any;
  ngOnInit() {
    this.getChart();
  }

}
