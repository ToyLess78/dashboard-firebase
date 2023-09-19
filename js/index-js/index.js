import {mainAnalyticsBase} from '../modules-js/firebase-module.js';
import {getDate, getTime} from '../modules-js/main-module.js';
import {
    changeThemeIndexChartsUpdate,
    getThemChartColor,
    lineChartConfig,
    lineChartUpdate,
    pieChartConfig,
    pieReportChartUpdate,
    setActiveBtn
} from '../modules-js/chart-map-module.js';


document.querySelector('#main-sidenav [href="index.html"]').classList.add('active');
const pickerTimeOptions = document.querySelector('#date-time-options');

new mdb.Datetimepicker(pickerTimeOptions, {
    timepicker: {format24: true}, defaultDate: getDate(new Date()), defaultTime: getTime(new Date()),
});

// Get & Read database:
const mainAnalyticsData = await mainAnalyticsBase.readData(),
    advancedAnnual = mainAnalyticsData?.advancedAnnual,
    analyticsAnnual = mainAnalyticsData?.analyticsAnnual,
    devAnnual = mainAnalyticsData?.devAnnual,
    serviceAnnual = mainAnalyticsData?.serviceAnnual,
    totalAnnual = mainAnalyticsData?.totalAnnual;

function sumArrays(...arrays) {
    const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
    const result = Array.from({length: n});
    return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
}

const analytics = analyticsAnnual.reduce((acc, val) => acc + val, 0),
    development = devAnnual.reduce((acc, val) => acc + val, 0),
    service = serviceAnnual.reduce((acc, val) => acc + val, 0),
    semiAnalytics = analyticsAnnual.slice(-6).reduce((acc, val) => acc + val, 0),
    semiDevelopment = devAnnual.slice(-6).reduce((acc, val) => acc + val, 0),
    semiService = serviceAnnual.slice(-6).reduce((acc, val) => acc + val, 0),
    quarterlyAnalytics = analyticsAnnual.slice(-4).reduce((acc, val) => acc + val, 0),
    quarterlyDevelopment = devAnnual.slice(-4).reduce((acc, val) => acc + val, 0),
    quarterlyService = serviceAnnual.slice(-4).reduce((acc, val) => acc + val, 0);

//Section: Charts Code
getThemChartColor();

const chartPie = document.getElementById('chart-pie'),
    annualPieData = [development, service, analytics],
    semiAnnualPieData = [semiDevelopment, semiService, semiAnalytics],
    quarterlyAnnualPieData = [quarterlyDevelopment, quarterlyService, quarterlyAnalytics];

let pieChartData, lineChartData;
pieChartData = annualPieData;
lineChartData = totalAnnual;

// Line  Chart Init:
const lineChart = new mdb.Chart(document.getElementById('chart-line'), {type: 'line'}, lineChartConfig);
lineChartUpdate(lineChart, lineChartData);

// Pie  Chart Init:
const pieChart = new mdb.Chart(chartPie, {type: 'doughnut'}, pieChartConfig);

pieReportChartUpdate(pieChartData, pieChart);

changeThemeIndexChartsUpdate(pieChart, pieChartData, lineChart, lineChartData);

function targetPieBtnsActions(e) {
    switch (e.target.dataset.key) {
        case 'annual':
            pieChartData = annualPieData;
            break
        case 'semi-annual':
            pieChartData = semiAnnualPieData;
            break
        case 'quarterly':
            pieChartData = quarterlyAnnualPieData;
            break
    }
}

function targetLineBtnsActions(e) {
    switch (e.target.dataset.key) {
        case 'total':
            lineChartData = totalAnnual;
            break
        case 'development':
            lineChartData = devAnnual;
            break
        case 'service':
            lineChartData = serviceAnnual;
            break
        case 'analytics':
            lineChartData = analyticsAnnual;
            break
    }
}

// Line  Chart Buttons Actions Activate:
const lineChartBtnsContainer = document.querySelector('#line-chart-btns-container');
const lineChartBtns = lineChartBtnsContainer.querySelectorAll('button');

lineChartBtnsContainer.addEventListener('click', (e) => {
    setActiveBtn(e.target, lineChartBtns);
    targetLineBtnsActions(e);
    lineChartUpdate(lineChart, lineChartData);
});

// Pie  Chart Buttons Actions Activate:
const pieChartBtnsContainer = document.querySelector('#pie-chart-btns-container');
const pieChartBtns = pieChartBtnsContainer.querySelectorAll('button');

pieChartBtnsContainer.addEventListener('click', (e) => {
    setActiveBtn(e.target, pieChartBtns);
    targetPieBtnsActions(e);
    pieReportChartUpdate(pieChartData, pieChart);
});

//Section: Map Code

const mapContainer = document.getElementById('map-container'),
    map = mapContainer.querySelector('#map-advanced'),
    mapLegend = mapContainer.querySelector('#map-advanced-legend'),
    mapDisplayBtns = mapContainer.querySelectorAll('.map-advanced-display'),
    mapBtns = mapContainer.querySelectorAll('.btn-map-advanced');

let SHOW_BULLETS = false;
let COLOR_MAP = null;
let MARKERS = null;

let ACTIVE_KEY = 'sales';
let ACTIVE_COLOR = 'indigo';

const DATA = advancedAnnual;

const COLORS = {
    indigo: [
        '#b8b9f0',
        '#adaeee',
        '#9d9dec',
        '#8d8ce9',
        '#7978e6',
        '#6b69e3',
        '#5c5ae1',
        '#4e4bde',
        'var(--main-indigo-color)',
    ],
    green: [
        '#c2e8e7',
        '#abe2dd',
        '#97ddd5',
        '#83d8cd',
        '#67d1c2',
        '#4dcbb8',
        '#33c4ae',
        '#1bbea5',
        '#03a89e',
    ],
    pink: [
        '#f3def1',
        '#f4d1eb',
        '#f6bce2',
        '#f8a7d9',
        '#f999d3',
        '#fb89cc',
        '#fc7bc6',
        '#fd6cbf',
        'var(--permanent-pink)',
    ],
    yellow: [
        '#f3efe2',
        '#f5ebcf',
        '#f6e8c1',
        '#f8e5b1',
        '#f9e2a3',
        '#fbdf95',
        '#fcdc87',
        '#fed979',
        '#ffd66b',
    ],
};

const updateLegend = (min, max) => {
    const colorLegend = COLORS[ACTIVE_COLOR].map(
        (color) => `<div style="height: 20px; width: 20px; background-color: ${color}"></div>`
    ).join('');

    mapLegend.innerHTML = `<small class="me-2">${min}</small>${colorLegend}<small class="ms-2">${max}</small>`;
};

const getColorMap = () => {
    const values = DATA.map((entry) => entry[ACTIVE_KEY]);
    const max = Math.max(...values);
    const min = Math.min(...values);

    let maxLabel = max;
    let minLabel = min;

    if (ACTIVE_KEY === 'salesIncrease' || ACTIVE_KEY === 'annualProfit') {
        minLabel = `${min}%`;
        maxLabel = `${max}%`;
    }

    updateLegend(minLabel, maxLabel);

    const step = Math.floor((max - min) / (COLORS[ACTIVE_COLOR].length - 1));

    const colorMap = COLORS[ACTIVE_COLOR].map((color, i) => {
        return {
            fill: color,
            regions: [],
        };
    });

    values.forEach((value, i) => {
        let valueLabel = ACTIVE_KEY === 'salesIncrease' || ACTIVE_KEY === 'annualProfit' ? `${value}%` : value;

        const color = Math.floor((value - min) / step);
        colorMap[color].regions.push({id: DATA[i].country, tooltip: valueLabel, ...DATA[i]});
    });

    return colorMap;
};

COLOR_MAP = getColorMap();

const mapInstance = new VectorMap(map, {
    fill: 'var(--grey-text-opacity)',
    stroke: 'var(--grey-text-color)',
    hover: false,
    btnClass: 'btn-primary',
    colorMap: COLOR_MAP,
    // scale: 0.6,
    selectFill: 'var(--main-indigo-color)',
});

const getMarkers = () => {
    const markers = [];

    COLOR_MAP.forEach((color) => {
        color.regions.forEach((region) => {
            const units = region.units.map((point) => ({
                ...point,
                fill: color.fill,
                type: 'bullet',
            }));

            markers.push(...units);
        });
    });

    return markers;
};

const updateMap = () => {
    COLOR_MAP = getColorMap();
    MARKERS = getMarkers();

    if (SHOW_BULLETS) {
        mapInstance.update({
            markers: getMarkers(),
            colorMap: [],
        });
    } else {
        mapInstance.update({
            markers: [],
            colorMap: COLOR_MAP,
        });
    }
};


mapBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        ACTIVE_KEY = btn.getAttribute('data-mdb-key');
        ACTIVE_COLOR = btn.getAttribute('data-mdb-color');

        updateMap();

        setActiveBtn(btn, mapBtns);
    });
});

mapDisplayBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        SHOW_BULLETS = btn.getAttribute('data-mdb-bullets') === 'true';

        updateMap();

        setActiveBtn(btn, mapDisplayBtns);
    });
});
