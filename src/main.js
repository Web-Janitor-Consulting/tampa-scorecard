Chart.register(ChartDeferred);

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
            plugins: {
                deferred: {
                    delay: 4000,
                },
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
            plugins: {
                deferred: {
                    delay: 4000,
                },
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

fetch('high-earners.json')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('high-earners');
        console.log(data);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(row => row.city),
                datasets: [{
                    label: 'Percent of Population Earning $200,000 or more 2021',
                    data: data.map(row => row.percentage),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            },
            plugins: {
                deferred: {
                    delay: 4000,
                },
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });