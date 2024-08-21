import { Component, AfterViewInit, ElementRef, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js/auto';
import { gamma, factorial, combinations } from 'mathjs';

@Component({
  selector: 'app-plot-distributions',
  templateUrl: './plot-distributions.component.html',
  styleUrls: ['./plot-distributions.component.scss']
})

/* This component generates Visualizations of various plots */
export class PlotDistributionsComponent implements AfterViewInit, OnChanges {


  // Attributes

  // Chart Canvas
  @ViewChild('myChart') chartCanvas!: ElementRef;

  // Distribution type and parameters
  @Input() distribution!: string;
  @Input() distributionParameter1!: number;
  @Input() distributionParameter2!: number;

  // Create a Chart.js line chart
  chart!: Chart;

  // The Chart is generated after the View is initialized
  ngAfterViewInit() {
    setTimeout(() => {
      this.generateChart();
    }, 1);
  }

  // Check if distribution or distributionParameters changed
  // Whenever a change happens, the chart is freshly generated
  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['distribution'] && !changes['distribution'].firstChange ||
      changes['distributionParameter1'] && !changes['distributionParameter1'].firstChange ||
      changes['distributionParameter2'] && !changes['distributionParameter2'].firstChange
    ) {
      this.generateChart();
    }
  }

  // Key Method of this Class
  // Generates a Chart that fits the attributes that describe the distribution type and parameters
  private generateChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    // Destroy the previous chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.distribution === undefined || this.distributionParameter1 === undefined || this.distributionParameter2 === undefined) {
      console.log("nichts zeichnen");
    }
    else if (this.distribution === 'Normal') {
      this.plotNormalDistribution(ctx);
    } 
    else if (this.distribution === 'Uniform') {
      this.plotUniformDistribution(ctx);
    } 
    else if (this.distribution === 'Exponential') {
      this.plotExponentialDistribution(ctx);
    } 
    else if (this.distribution === 'Poisson') {
      this.plotPoissonDistribution(ctx);
    } 
    else if (this.distribution === 'Binomial') {
      this.plotBinomialDistribution(ctx);
    }  
    else if (this.distribution === 'Gamma') {
      this.plotGammaDistribution(ctx);
    } 
    else if (this.distribution === 'Beta') {
      this.plotBetaDistribution(ctx);
    }  
    else if (this.distribution === 'Weibull') {
      this.plotWeibullDistribution(ctx);
    }
    else {
      console.log("nichts zeichnen");
    }
  }

  // For each distribution type there is a method to generate data points and to plot the graph

  // NORMAL DISTRIBUTION

  private plotNormalDistribution(ctx : any) : void {
    const mean = this.distributionParameter1;
      const stdDev = this.distributionParameter2;
      const numPoints = 100;
      const data = this.generateNormalDataPoints(mean, stdDev, numPoints);

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [{
            label: 'Normal Distribution',
            data: data,
            borderColor: '#673AB7',
            borderWidth: 1,
            fill: false,
          }]
        },
        options: this.getLineChartOptions(),
      });
  }

  private generateNormalDataPoints(mean: number, stdDev: number, numPoints: number): { x: number, y: number }[] {
    const step = (6 * stdDev) / numPoints;
    const dataPoints = [];

    for (let i = -3 * stdDev; i <= 3 * stdDev; i += step) {
      const x = mean + i;
      const y = this.normalDistribution(x, mean, stdDev);
      dataPoints.push({ x, y });
    }
    return dataPoints;
  }

  private normalDistribution(x: number, mean: number, stdDev: number): number {
    const expPart = Math.exp(-((x - mean) ** 2) / (2 * stdDev ** 2));
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * expPart;
  }

  // UNIFORM DISTRIBUTION

  private plotUniformDistribution(ctx : any) : void {
    const min = this.distributionParameter1;
    const max = this.distributionParameter2;
    const numPoints = 100;
    const data = this.generateUniformDataPoints(min, max, numPoints);
    
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Uniform Distribution',
          data: data,
          borderColor: '#673AB7',
          borderWidth: 1,
          fill: false,
        }]
      },
      options: this.getLineChartOptions(),
    });
  }

  private generateUniformDataPoints(min: number, max: number, numPoints: number): { x: number, y: number }[] {
    const step = (max - min) / numPoints;
    const dataPoints = [];

    for (let i = min; i <= max; i += step) {
      const x = i;
      const y = 1 / (max - min);
      dataPoints.push({ x, y });
    }
    return dataPoints;
  }

  // EXPONENTIAL DISTRIBUTION

  private plotExponentialDistribution(ctx : any) : void {
    const lambda = this.distributionParameter1;
    const numPoints = 100;
    const data = this.generateExponentialDataPoints(lambda, numPoints);

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Exponential Distribution',
          data: data,
          borderColor: '#673AB7',
          borderWidth: 1,
          fill: false,
        }]
      },
      options: this.getLineChartOptions(),
    });
  }

  private generateExponentialDataPoints(lambda: number, numPoints: number): { x: number, y: number }[] {
    const step = 6 / numPoints; // Adjusted for exponential distribution
    const dataPoints = [];

    for (let i = 0; i <= 6; i += step) {
      const x = i;
      const y = lambda * Math.exp(-lambda * x);
      dataPoints.push({ x, y });
    }
    return dataPoints;
  }

  // POISSON DISTRIBUTION

  private plotPoissonDistribution(ctx : any) : void {
    const lambda = this.distributionParameter1;
    const numPoints = 20; // Adjusted for Poisson distribution
    const data = this.generatePoissonDataPoints(lambda, numPoints);

    this.chart = new Chart(ctx, {
      type: 'bar', // Adjusted for Poisson distribution
      data: {
        labels: data.map(point => point.x.toString()),
        datasets: [{
          label: 'Poisson Distribution',
          data: data.map(point => point.y),
          backgroundColor: '#673AB7',
          borderWidth: 1,
        }]
      },
      options: this.getBarChartOptions(),
    });
  }

  private generatePoissonDataPoints(lambda: number, numPoints: number): { x: number, y: number }[] {
    const dataPoints = [];

    for (let k = 0; k <= numPoints; k++) {
      const x = k;
      const y = (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
      dataPoints.push({ x, y });
    }
    return dataPoints;
  }

  // BINOMIAL DISTRIBUTION

  private plotBinomialDistribution(ctx : any) : void {
    const trials = this.distributionParameter1;
    const probability = this.distributionParameter2;
    const numPoints = trials + 1; // One point for each possible outcome
    const data = this.generateBinomialDataPoints(trials, probability, numPoints);

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(point => point.x.toString()),
        datasets: [{
          label: 'Binomial Distribution',
          data: data.map(point => point.y),
          backgroundColor: '#673AB7',
          borderWidth: 1,
        }]
      },
      options: this.getBarChartOptions(),
    });
  }

  private generateBinomialDataPoints(trials: number, probability: number, numPoints: number): { x: number, y: number }[] {
    const dataPoints = [];

    for (let k = 0; k <= trials; k++) {
      const x = k;
      const y = combinations(trials, k) * Math.pow(probability, k) * Math.pow(1 - probability, trials - k);
      dataPoints.push({ x, y });
    }
    return dataPoints;
  }

  // GAMMA DISTRIBUTION

  private plotGammaDistribution(ctx : any) : void {
    const shape = this.distributionParameter1;
    const scale = this.distributionParameter2;
    const numPoints = 100;
    const data = this.generateGammaDataPoints(shape, scale, numPoints);

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Gamma Distribution',
          data: data,
          borderColor: '#673AB7',
          borderWidth: 1,
          fill: false,
        }]
      },
      options: this.getLineChartOptions(),
    });
  }

  private generateGammaDataPoints(shape: number, scale: number, numPoints: number): { x: number, y: number }[] {
    const step = (10 * scale) / numPoints; // Adjusted for gamma distribution
    const dataPoints = [];

    for (let x = 0; x <= 10 * scale; x += step) {
      const y = (1 / (gamma(shape) * Math.pow(scale, shape))) * Math.pow(x, shape - 1) * Math.exp(-x / scale);
      dataPoints.push({ x, y });
    }
    return dataPoints;
  }

  // BETA DISTRIBUTION

  private plotBetaDistribution(ctx : any) : void {
    const alpha = this.distributionParameter1;
    const beta = this.distributionParameter2;
    const numPoints = 100;
    const data = this.generateBetaDataPoints(alpha, beta, numPoints);

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Beta Distribution',
          data: data,
          borderColor: '#673AB7',
          borderWidth: 1,
          fill: false,
        }]
      },
      options: this.getLineChartOptions(),
    });
  }

  private generateBetaDataPoints(alpha: number, beta: number, numPoints: number): { x: number, y: number }[] {
    const step = 1 / numPoints;
    const dataPoints = [];
    for (let x = 0; x <= 1; x += step) {
      const y = this.betaFunction(x, alpha, beta);
      dataPoints.push({ x, y });
    }
    return dataPoints;
  }

  private betaFunction(x: number, alpha: number, beta: number): number {
    const numerator = gamma(alpha) * gamma(beta);
    const denominator = gamma(alpha + beta);
    return (numerator / denominator) * Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1);
  }

  // WEIBULL DISTRIBUTION

  private plotWeibullDistribution(ctx : any) : void {
    const shape = this.distributionParameter1;
    const scale = this.distributionParameter2;
    const numPoints = 100;
    const data = this.generateWeibullDataPoints(shape, scale, numPoints);

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Weibull Distribution',
          data: data,
          borderColor: '#673AB7',
          borderWidth: 1,
          fill: false,
        }]
      },
      options: this.getLineChartOptions(),
    });
  }

  private generateWeibullDataPoints(shape: number, scale: number, numPoints: number): { x: number, y: number }[] {
    const step = scale / numPoints;
    const dataPoints = [];

    for (let x = 0; x <= scale; x += step) {
      const y = (shape / scale) * Math.pow(x / scale, shape - 1) * Math.exp(-Math.pow(x / scale, shape));
      dataPoints.push({ x, y });
    }
    return dataPoints;
  }

  //General Chart Options: These Methods define Chart Options for Line and Bar Charts

  private getLineChartOptions() {
    return {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
        },
        y: {
          min: 0,
        }
      }
    } as ChartOptions<'line'>;
  }

  private getBarChartOptions() {
    return {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
        },
        y: {
          min: 0,
        }
      }
    } as ChartOptions<'bar'>; // Corrected to 'bar' type
  }
}
