import { Component, OnInit } from '@angular/core';
import { Dieta } from '../dieta';
import { DietaService } from '../dieta.service';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chart.js';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})

export class IndexComponent implements OnInit {

  private clientes: Cliente[] = []
  private dietas: Dieta[] = []
  private qtdComDieta:number = 0
  private qtdSemDieta:number = 0
  private qtdHomem:number = 0
  private qtdMulher:number = 0
  public mostrar:Boolean = false

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Dietas'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [this.qtdComDieta,0,this.qtdComDieta+1], label: 'Clientes com Dieta' },
    { data: [this.qtdSemDieta,0,this.qtdSemDieta+1], label: 'Clientes sem Dieta' }
  ];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  public pieChartLabels: Label[] = [['Clientes Mulheres'],['Clientes Homens']];
  public pieChartData: number[] = [this.qtdMulher,this.qtdHomem];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  constructor(private serviceDieta : DietaService, private serviceCliente : ClienteService,) {
    this.selectClientes();
    this.selectDietas();
  }

  ngOnInit() {
    this.carregaDietas()
  }
  carregaDietas(){
    this.qtdComDieta=0
    this.qtdSemDieta=0
    this.qtdHomem = 0
    this.qtdMulher = 0
    console.log("1")
    for (let i = 0; i < this.clientes.length; i++) {
      if(this.clientes[i].sexo=="Masculino"){
        this.qtdHomem=this.qtdHomem+1
      }else{
        this.qtdMulher=this.qtdMulher+1
      } 
      for (let j = 0; j < this.dietas.length; j++) { 
        if( this.clientes[i].id == this.dietas[j].id_cliente){
          this.qtdComDieta=this.qtdComDieta+1
        }else{
          this.qtdSemDieta=this.qtdSemDieta+1
        } 
      }
      this.mostrar=true
    }
    this.barChartData = [
      { data: [this.qtdComDieta,0,this.qtdComDieta+1], label: 'Clientes com Dieta' },
      { data: [this.qtdSemDieta,0,this.qtdSemDieta+1], label: 'Clientes sem Dieta' }
    ];
    this.pieChartData = [this.qtdMulher,this.qtdHomem];
  }

    
  addSlice() {
    this.pieChartLabels.push(['Line 1', 'Line 2']);
    this.pieChartData.push(400);
    this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
  }
    
  removeSlice() {
    this.pieChartLabels.pop();
    this.pieChartData.pop();
    this.pieChartColors[0].backgroundColor.pop();
  }
    
  changeLegendPosition() {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  selectClientes(){
    this.serviceCliente.getClientes().subscribe( 
        result => 
        { 
          this.clientes = JSON.parse(JSON.stringify(result))
          console.log(this.clientes) 
        }
      )
   }
  selectDietas(){
    this.serviceDieta.getDietas().subscribe( 
        result => 
        { 
          this.dietas = JSON.parse(JSON.stringify(result))
          console.log(this.dietas) 
        }
      )
  }
}
