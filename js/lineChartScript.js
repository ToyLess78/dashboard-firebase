

const style = getComputedStyle(document.querySelector(':root'));
const pinkColor = style.getPropertyValue('--permanent-pink');
const mainTextCol = style.getPropertyValue('--main-tex-color');
const lightColor = style.getPropertyValue('--secondary-bg-color');
const textCol = style.getPropertyValue('--grey-text-color');
const ctx = document.getElementById('chart').getContext('2d');

const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
gradientStroke.addColorStop(0, '#3a36db');
gradientStroke.addColorStop(1, '#ff59b7');

const gradientBackground = ctx.createLinearGradient(200, 0, 600, 0);
gradientBackground.addColorStop(0, 'rgba(58,54,219,0.5)');
gradientBackground.addColorStop(1, 'rgba(255,105,180,0.4)');

const draw = Chart.controllers.line.prototype.draw;
Chart.controllers.line = Chart.controllers.line.extend({
    draw: function() {
        draw.apply(this, arguments);
        let ctx = this.chart.chart.ctx;
        let _stroke = ctx.stroke;
        ctx.stroke = function() {
            ctx.save();
            // ctx.shadowColor = 'rgba(244,94,132,0.8)';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            _stroke.apply(this, arguments)
            ctx.restore();
        }
    }
});




const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    // The data for our dataset
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: 'Sale',
            backgroundColor: gradientBackground,
            borderColor: gradientStroke,
            data: [135, 115, 50, 135, 50, 125, 90, 160, 120, 100, 30, 130],
            pointBorderColor: 'rgba(255,255,255,0)',
            pointBackgroundColor: 'rgba(255,255,255,0)',
            pointBorderWidth: 2,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: 'rgba(255,255,255,0)',
            pointHoverBorderColor: '#FF69B4',
            pointHoverBorderWidth: 4,
            pointRadius: 1,
            borderWidth: 0.1,
            pointHitRadius: 3,
        }]
    },

    // Configuration options go here
    options: {
      tooltips: {
        backgroundColor:'#fff',
        displayColors:false,
           titleFontColor: '#000',
        bodyFontColor: '#000'
        
        },      
      legend: {
            display: false
      },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                ticks: {

                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        // return (value / 1000) + 'K';
                        return value;
                    }
                }
            }],
        }
    }
});