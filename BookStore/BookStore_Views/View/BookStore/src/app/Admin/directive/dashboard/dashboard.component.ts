import { Component, OnInit } from '@angular/core';
import { GetAuthorization } from '../../config/config';
import { Chart } from 'chart.js'
import { StatisticalService } from '../../services/statistical/statistical.service';
var moment = require('moment');
declare var require: any
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  BarChart = [];
  LineChart = [];
  statisticalData : any;
  getStatistical(){
    this.statistical.getStatistical().subscribe(
      rs =>{
        this.statisticalData = rs;
        let labelsArr : string[] = [" "];
        let dataArr : number [] = [0];
        this.statisticalData.date.forEach(date => {
          let temp = moment(date).format("MMM Do YY")
          labelsArr.push(temp.toString());
        });
        this.statisticalData.totalOrders.forEach(order => {
          dataArr.push(order * 10)
        });
        labelsArr.splice(0,1);
        dataArr.splice(0,1);
        this.BarChart = new Chart('barChart', {
          type: 'bar',
          data: {
            labels:labelsArr,
            datasets: [{
              label: '- Orders / week',
              data: dataArr,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(50, 168, 82, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(43, 117, 63, 1)'
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
        this.LineChart = new Chart('lineChart', {
          type: 'line',
        data: {
         labels: labelsArr,
         datasets: [{
             label: 'Doanh thu trong tuần',
             data: this.statisticalData.tolalMoney,
             fill:false,
             lineTension:0.2,
             borderColor:"red",
             borderWidth: 1
         }]
        }, 
        options: {
         title:{
             text:"Doanh thu trên tuần",
             display:true
         },
         scales: {
             yAxes: [{
                 ticks: {
                     beginAtZero:true
                 }
             }]
         }
        }
        });
      },err=>{
        console.log(err)
      }
    )
  }
  getChart() {
    
  }
  constructor(
    private statistical : StatisticalService
  ) { }
  token: any;
  ngOnInit() {
    // this.getChart();
    this.getStatistical();
    this.getChart();
  }

}
