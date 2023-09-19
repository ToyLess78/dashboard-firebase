const canvas = document.getElementById('canvas');
const tooltipCanvas = document.getElementById('tooltip-canvas');
const gradientBlue = canvas.getContext('2d').createLinearGradient(0, 0, 40, 120);
gradientBlue.addColorStop(0, '#605CFF90');
gradientBlue.addColorStop(1, '#3A36DB');

const gradientRed = canvas.getContext('2d').createLinearGradient(0, 0, 20, 150);
gradientRed.addColorStop(0, '#FF69B490');
gradientRed.addColorStop(1, '#FF69B4');

const gradientGreen = canvas.getContext('2d').createLinearGradient(200, 0, 90, 0);
gradientGreen.addColorStop(0, '#2fe6a7');
gradientGreen.addColorStop(1, '#03A89E');

window.arcSpacing = 0.15;
window.segmentHovered = false;

function textInCenter(value, label) {
  const ctx = tooltipCanvas.getContext('2d');
  ctx.clearRect(0, 0, tooltipCanvas.width, tooltipCanvas.height)
  
	ctx.restore();
    
  // Draw value
  ctx.fillStyle = '#A1A3AC',
  ctx.font = '28px sans-serif';
  ctx.textBaseline = 'middle';

  // Define text position
  const textPosition = {
    x: Math.round((tooltipCanvas.width - ctx.measureText(value).width) / 2),
    y: tooltipCanvas.height / 2,
  };

  ctx.fillText(value, textPosition.x, textPosition.y);

  // Draw label
  ctx.fillStyle = '#A1A3AC',
  ctx.font = '12px sans-serif';

  // Define text position
  const labelTextPosition = {
    x: Math.round((tooltipCanvas.width - ctx.measureText(label).width) / 2),
    y: tooltipCanvas.height / 2,
  };

  ctx.fillText(label, labelTextPosition.x, labelTextPosition.y - 20);
  ctx.save();
}

Chart.elements.Arc.prototype.draw = function() {
  const ctx = this._chart.ctx;
  const vm = this._view;
  const sA = vm.startAngle;
  const eA = vm.endAngle;

  ctx.beginPath();
  ctx.arc(vm.x, vm.y, vm.outerRadius, sA + window.arcSpacing, eA - window.arcSpacing);
  ctx.strokeStyle = vm.backgroundColor;
  ctx.lineWidth = vm.borderWidth;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.closePath();
};

const config = {
    type: 'doughnut',
    data: {
        labels: ['Sale', 'Distribute', 'Return'],
        datasets: [
          {
              data: [450, 370, 400],
              backgroundColor: [
                gradientBlue,
                gradientGreen,
                gradientRed,
              ],
          }
        ]
    },
    options: {
    		cutoutPercentage: 10,
    		elements: {
        	arc: {
          	borderWidth: 30,
          },
        },
        legend: {
        	display: false,
        },
        animation: {
        	onComplete: function(animation) {
          	if (!window.segmentHovered) {
              const value = this.config.data.datasets[0].data.reduce(function(a, b) { 
                return a + b;
              }, 0);
              const label = 'T O T A L';

              textInCenter(value, label);
            }
          },
        },
        tooltips: {
        	enabled: false,
        	custom: function(tooltip) {
          	if (tooltip.body) {
              const line = tooltip.body[0].lines[0],
              	parts = line.split(': ');
              textInCenter(parts[1], parts[0].split('').join(' ').toUpperCase());
              window.segmentHovered = true;
            } else {
            	window.segmentHovered = false;
            }
          },
        },
    },
};

window.chart = new Chart(canvas, config);

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

document.getElementById('reload').addEventListener('click', function() {
	addData(window.chart, 'TEST', 400);
});