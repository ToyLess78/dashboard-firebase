import {getLastNMonths} from "./form-module.js";

export {addItemDescriptionPreview, lineChartConfig, getThemChartColor, lineChartUpdate, pieChartConfig, pieAnalyticsChartUpdate, changeThemeChartsUpdate, pieReportChartUpdate, changeThemeIndexChartsUpdate, setActiveBtn}

function addItemDescriptionPreview(item, cardImage, cardTitle, cardDescription, addAt, editAt, cardQuantity, cardPrice) {

    cardImage.src = item?.avatar || './img/camera.svg';
    cardTitle.textContent = item?.title;
    cardDescription.textContent = item?.description;
    addAt.textContent = `Add at ${item?.addAt}`;
    cardQuantity.textContent = item?.quantity;
    cardPrice.textContent = item?.price;
    if (item?.editAt !== 'Not') {
        editAt.textContent = `Last updated ${item?.editAt}`;
        editAt.classList.add('show');
    } else {
        editAt.classList.remove('show');
    }
}
let gradientBackground, gradientStroke, borderColor, hoverBackgroundColor, backgroundColor, tooltipBackground, tooltipText, targetItemMonthly;
const lineChartLabels =  getLastNMonths(12);
const ctx = document.createElement('canvas').getContext("2d");
function getThemChartColor() {
    const localTheme = localStorage?.getItem('theme') === 'dark';
    tooltipBackground = () => localTheme ? 'rgba(54, 65, 83, 0.8)' : 'rgba(255, 255, 255, 0.8)';
    tooltipText = () => localTheme ? 'hsla(0, 0%, 100%, 0.7)' : 'hsla(216, 76%, 10%, 0.5)';
    backgroundColor = () => localTheme ? ['rgba(96, 92, 255, 1)', 'rgba(47, 230, 167, 1)', 'rgba(255, 105, 180, 1)']
        : ['rgba(58, 54, 219, 1)', 'rgba(3, 168, 158, 1)', 'rgba(255, 89, 183, 1)'];
    borderColor = () => localTheme ? 'rgba(54, 65, 83, 1)' : 'rgba(255, 255, 255, 1)';
    hoverBackgroundColor = () => localTheme ? 'rgba(26, 32, 44, 1)' : 'rgba(241, 244, 250, 1)';
    gradientBackground = ctx.createLinearGradient(0, 300, 400, 0);
    gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    if (localTheme) {
        gradientBackground.addColorStop(0, 'rgba(96, 92, 255, 0.5)');
        gradientBackground.addColorStop(1, 'rgba(255, 105, 180, 0.4)');
        gradientStroke.addColorStop(0, 'rgba(255, 105, 180, 0.4)');
        gradientStroke.addColorStop(1, 'rgba(96, 92, 255, 0.5)');
    } else {
        gradientBackground.addColorStop(0, 'rgba(58, 54, 219, 0.5)');
        gradientBackground.addColorStop(1, 'rgba(255, 89, 183, 0.4)');
        gradientStroke.addColorStop(0, 'rgba(255, 89, 183, 0.4)');
        gradientStroke.addColorStop(1, 'rgba(58, 54, 219, 0.5)');
    }
}
getThemChartColor();
const lineChartConfig = {
    options: {
        aspectRatio: 21/9,
        plugins:
            {
                tooltip: {
                    backgroundColor: tooltipBackground,
                    displayColors: false,
                    titleColor: tooltipText,
                    bodyColor: tooltipText,
                    borderColor: tooltipText,
                    borderWidth: 1,
                },
                legend: {
                    display: false,
                },

            },
    }

}
function lineChartUpdate(lineChart, lineChartData) {
    lineChart.update({
        labels: lineChartLabels,
        datasets: [{
            label: 'Sales',
            data: lineChartData,
            borderColor: gradientStroke,
            backgroundColor: gradientBackground,
            pointBorderWidth: 1,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: 'rgba(255,255,255,1)',
            pointHoverBorderColor: '#FF69B4',
            pointHoverBorderWidth: 4,
            pointRadius: 1,
            borderWidth: 0.1,
            pointHitRadius: 3,
            fill: true,
            cubicInterpolationMode: 'monotone',
            tension: 0.4
        },],
    })
}

const externalTooltipHandler = (context) => {
    // Tooltip Element
    const {chart, tooltip} = context,
        newTooltips = document.querySelectorAll('.canvas-tooltip span');
    if (tooltip.body) {
        const bodyLines = tooltip.body.map(b => b.lines);
        bodyLines.forEach(text => {
            const el = document.createTextNode(text),
                tooltipArr = el.textContent.split(': ');
            tooltipArr[0] = tooltipArr[0].split('').join(' ');
            tooltipArr.forEach((v, i) => {
                newTooltips[i].textContent = v;
            })
        });
        // chart._lastEvent = null;
        if (!chart.getActiveElements().length) {
            newTooltips[0].textContent = 't o t a l';
            newTooltips[1].textContent = targetItemMonthly.reduce((acc, val) => {
                return acc + val
            }, 0).toString();
        }
    }

}

// Options
const pieChartConfig = {
    options: {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
                external: externalTooltipHandler,
            },
        },
    },
};
function pieAnalyticsChartUpdate(targetItem, pieChart, liNew) {
    targetItemMonthly = [targetItem?.monthly?.complete, targetItem?.monthly?.pending, targetItem?.monthly?.new];
    pieChart.update(
        {
            labels: ['Complete', 'Pending', 'New'],
            datasets: [
                {
                    data: targetItemMonthly,
                    backgroundColor: backgroundColor,
                    borderRadius: Number.MAX_VALUE,
                    hoverBackgroundColor: hoverBackgroundColor,
                    hoverBorderColor: borderColor,
                    borderColor: borderColor,
                    borderWidth: 12,
                    cutout: '70%',
                },],
        }
    )
    document.querySelector('#item-total').textContent = targetItemMonthly.reduce((acc, val) => {
        return acc + val
    }, 0).toString();
    !targetItem?.monthly?.new ? liNew.classList.remove('show')
        : liNew.classList.add('show');
}
function pieReportChartUpdate(data, pieChart) {
    targetItemMonthly = data;
    pieChart.update(
        {
            labels: ['Development', 'Service', 'Analytics'],
            datasets: [
                {
                    data: data,
                    backgroundColor: backgroundColor,
                    borderRadius: Number.MAX_VALUE,
                    hoverBackgroundColor: hoverBackgroundColor,
                    hoverBorderColor: borderColor,
                    borderColor: borderColor,
                    borderWidth: 12,
                    cutout: '70%',
                },],
        }
    )

    document.querySelector('#item-total').textContent = data.reduce((acc, val) => {
        return acc + val
    }, 0).toString();

}

function changeThemeChartsUpdate(targetItem, pieChart, liNew, lineChart, lineChartData) {
    document.addEventListener('changeTheme', () => {
        setTimeout(() => {
            getThemChartColor();
            pieAnalyticsChartUpdate(targetItem, pieChart, liNew);
            lineChartUpdate(lineChart, lineChartData);

        }, 0)

    });
}
function changeThemeIndexChartsUpdate(pieChart, pieChartData, lineChart, lineChartData) {
    document.addEventListener('changeTheme', () => {
        setTimeout(() => {
            getThemChartColor();
            pieReportChartUpdate(pieChartData, pieChart);
            lineChartUpdate(lineChart, lineChartData);

        }, 0)

    });
}

const setActiveBtn =  (active, mapBtns) => {
    mapBtns.forEach((btn) => {
        if (btn === active) {
            btn.classList.remove('btn-outline-primary');
            btn.classList.add('btn-primary');
        } else {
            btn.classList.add('btn-outline-primary');
            btn.classList.remove('btn-primary');
        }
    });
};



