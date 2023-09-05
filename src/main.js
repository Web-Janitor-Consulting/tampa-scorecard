fetch('pci.json')
    .then(response => response.json())
    .then(data => {
        const datasets = [];

        for (let i = 0; i < data.length; i++) {
            const cityData = data[i].data;
            const cityName = data[i].city;

            datasets.push({
                label: cityName,
                data: cityData.map(row => row.amount),
                borderWidth: 1
            });
        }

        const ctx = document.getElementById('pci');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data[0].data.map(row => row.year),
                datasets: datasets
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

fetch('pci-benchmark.json')
    .then(response => response.json())
    .then(data => {
        const datasets = [];

        for (let i = 0; i < data.length; i++) {
            const cityData = data[i].data;
            const cityName = data[i].city;

            datasets.push({
                label: cityName,
                data: cityData.map(row => row.amount),
                borderWidth: 1
            });
        }

        const ctx = document.getElementById('pci-benchmark');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data[0].data.map(row => row.year),
                datasets: datasets
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });