import { Chart } from 'chart.js';

const plugin = {
  afterDraw: (chartInstance: Chart, easing: Chart.Easing, options?: any) => { },
};

const $graph = <any> document.getElementById('graph');
const ctx = $graph.getContext('2d');


export class Graph {
  chart:any;
  constructor(){
    this.chart = null;
  } 

  line(title, keyValues:any){
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels:Object.keys(keyValues).map((n,i)=> i%10===0 ? n : "" ),
        datasets: [{
          label: title,
          data: Object.keys(keyValues).map(k=> keyValues[k] ),
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {}
    }); 
    this.chart = myLineChart;
  }
  add(key, value){
    this.chart.data.labels.push(key);
    this.chart.data.datasets.forEach((dataset) => {
      dataset.data.push(value);
    });
    this.chart.update();
  }
}