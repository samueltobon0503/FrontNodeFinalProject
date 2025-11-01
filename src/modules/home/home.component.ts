import { Component, computed, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TrmService } from '../../core/services/TRM.service';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { LayoutService } from '../../app/layout/service/layout.service';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, CardModule, ChartModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements OnInit {

  title = 'Nexus store'
  error: string | null = null;
  data: any;
  options: any;
  trm: any | null = null;
  currencies: any;

  layoutService = inject(LayoutService);

  currentPrimaryColorName = computed(() => this.layoutService.layoutConfig().primary);

  ngOnInit(): void {
    console.log("From Home")
    this.getData();

    this.data = {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
                datasets: [
                    {
                        label: 'Ingresos',
                        backgroundColor: '#aed823',
                        borderColor:  'white',
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: 'Egresos',
                        backgroundColor: '#b054f4',
                        borderColor:  'white',
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
                ]
            };

     this.options = {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    legend: {
                        labels: {
                            color: 'gray'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'white',
                            font: {
                                weight: 500
                            }
                        },
                        grid: {
                            color: 'black',
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: 'gray'
                        },
                        grid: {
                            color: 'black',
                            drawBorder: false
                        }
                    }
                }
            };
  }

  constructor(private trmService: TrmService) { }

  getData() {
    this.trmService.getTrmActual().subscribe(
      (valor) => {
        this.trm = valor;
        console.log('Data Actual:', this.trm);
      },
      (err) => {
        this.error = err.message;
        console.error(err);
      }
    );
    this.trmService.getCurrencies().subscribe(
      (valor) => {
        this.currencies = valor;
        console.log('Data Currency:', this.currencies);
      },
      (err) => {
        this.error = err.message;
        console.error(err);
      }
    );
  }

}
