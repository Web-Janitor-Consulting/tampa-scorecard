// load the data from pci.json
const cpiTPA = require('./pci.json');

const ctx = document.getElementById('pci');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: cpiTPA.map(row => row.year),
        datasets: [{
            label: 'Tampa',
            data: cpiTPA.map(row => row.amount),
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                min: 15000,
                max: 50000,
            }
        }
    }
});