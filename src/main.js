fetch('pci.json')
    .then(response => response.json())
    .then(data => {
        const cpiTPA = data;
        console.log(cpiTPA);

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
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });