//https://css-tricks.com/how-to-animate-the-details-element-using-waapi/

class Accordion {
    constructor(el) {
        // Store the <details> element
        this.el = el;
        // Store the <summary> element
        this.summary = el.querySelector('summary');
        // Store the <div class="content"> element
        this.content = el.querySelector('table');

        // Store the animation object (so we can cancel it if needed)
        this.animation = null;
        // Store if the element is closing
        this.isClosing = false;
        // Store if the element is expanding
        this.isExpanding = false;
        // Detect user clicks on the summary element
        this.summary.addEventListener('click', (e) => this.onClick(e));
    }

    onClick(e) {
        // Stop default behaviour from the browser
        e.preventDefault();
        // Add an overflow on the <details> to avoid content overflowing
        this.el.style.overflow = 'hidden';
        // Check if the element is being closed or is already closed
        if (this.isClosing || !this.el.open) {
            this.open();
            // Check if the element is being openned or is already open
        } else if (this.isExpanding || this.el.open) {
            this.shrink();
        }
    }

    shrink() {
        // Set the element as "being closed"
        this.isClosing = true;

        // Store the current height of the element
        const startHeight = `${this.el.offsetHeight}px`;
        // Calculate the height of the summary
        const endHeight = `${this.summary.offsetHeight}px`;

        // If there is already an animation running
        if (this.animation) {
            // Cancel the current animation
            this.animation.cancel();
        }

        // Start a WAAPI animation
        this.animation = this.el.animate({
            // Set the keyframes from the startHeight to endHeight
            height: [startHeight, endHeight]
        }, {
            duration: 400,
            easing: 'ease-out'
        });

        // When the animation is complete, call onAnimationFinish()
        this.animation.onfinish = () => this.onAnimationFinish(false);
        // If the animation is cancelled, isClosing variable is set to false
        this.animation.oncancel = () => this.isClosing = false;
    }

    open() {
        // Apply a fixed height on the element
        this.el.style.height = `${this.el.offsetHeight}px`;
        // Force the [open] attribute on the details element
        this.el.open = true;
        // Wait for the next frame to call the expand function
        window.requestAnimationFrame(() => this.expand());
    }

    expand() {
        // Set the element as "being expanding"
        this.isExpanding = true;
        // Get the current fixed height of the element
        const startHeight = `${this.el.offsetHeight}px`;
        // Calculate the open height of the element (summary height + content height)
        const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;

        // If there is already an animation running
        if (this.animation) {
            // Cancel the current animation
            this.animation.cancel();
        }

        // Start a WAAPI animation
        this.animation = this.el.animate({
            // Set the keyframes from the startHeight to endHeight
            height: [startHeight, endHeight]
        }, {
            duration: 400,
            easing: 'ease-out'
        });
        // When the animation is complete, call onAnimationFinish()
        this.animation.onfinish = () => this.onAnimationFinish(true);
        // If the animation is cancelled, isExpanding variable is set to false
        this.animation.oncancel = () => this.isExpanding = false;
    }

    onAnimationFinish(open) {
        // Set the open attribute based on the parameter
        this.el.open = open;
        // Clear the stored animation
        this.animation = null;
        // Reset isClosing & isExpanding
        this.isClosing = false;
        this.isExpanding = false;
        // Remove the overflow hidden and the fixed height
        this.el.style.height = this.el.style.overflow = '';
    }
}

document.querySelectorAll('details').forEach((el) => {
    new Accordion(el);
});
Chart.register(ChartDeferred);

fetch('_data/pci.json')
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
                    yOffset: '75%',
                    delay: 500
                },
            },
            options: {

            }
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

fetch('_data/pci-benchmark.json')
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
                    yOffset: '75%',
                },
            },
            options: {

            }
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

fetch('_data/high-earners.json')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('high-earners');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(row => row.city),
                datasets: [{
                    label: 'Percent of Population Earning $200,000 or more 2021',
                    data: data.map(row => row.percentage),
                }]
            },
            plugins: {
                deferred: {
                    yOffset: '100%',
                    delay: 3000
                },
            },
            options: {
                indexAxis: 'y',
            }
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

fetch('_data/median-income.json')
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

        const ctx = document.getElementById('med-income');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data[0].data.map(row => row.year),
                datasets: datasets
            },
            plugins: {
                deferred: {
                    yOffset: '75%',
                    delay: 500
                },
            },
            options: {}
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

fetch('_data/median-benchmark-21.json')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('med-benchmark');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(row => row.city),
                datasets: [{
                    label: 'Median Income Benchmark Cities 2021',
                    data: data.map(row => row.percentage),
                }]
            },
            plugins: {
                deferred: {
                    yOffset: '100%',
                    delay: 3000
                },
            },
            options: {
                indexAxis: 'x',
            }
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

fetch('_data/median-disparity-mf.json')
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

        const ctx = document.getElementById('med-disparity-mf');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data[0].data.map(row => row.year),
                datasets: datasets
            },
            plugins: {
                deferred: {
                    yOffset: '75%',
                    delay: 500
                },
            },
            options: {}
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

fetch('_data/median-disparity-mf-21.json')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('med-disparity-mf-21');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(row => row.city),
                datasets: [{
                    label: 'Median Income Disparity Between Average Male & Female Full Time Workers 2021',
                    data: data.map(row => row.percentage),
                }]
            },
            plugins: {
                deferred: {
                    yOffset: '100%',
                    delay: 3000
                },
            },
            options: {
                indexAxis: 'y',
            }
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

fetch('_data/pci-disparity-race.json')
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

        const ctx = document.getElementById('pci-disparity-race');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data[0].data.map(row => row.year),
                datasets: datasets
            },
            plugins: {
                deferred: {
                    yOffset: '75%',
                    delay: 500
                },
            },
            options: {}
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

fetch('_data/pci-disparity-race-21.json')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('pci-disparity-race-21');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(row => row.city),
                datasets: [{
                    label: 'Per Capita Income Disparity Between African Americans and Caucasians 2021',
                    data: data.map(row => row.percentage),
                }]
            },
            plugins: {
                deferred: {
                    yOffset: '100%',
                    delay: 3000
                },
            },
            options: {
                indexAxis: 'y',
            }
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

fetch('_data/middle.json')
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

        const ctx = document.getElementById('middle');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data[0].data.map(row => row.year),
                datasets: datasets
            },
            plugins: {
                deferred: {
                    yOffset: '75%',
                    delay: 500
                },
            },
            options: {}
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });
fetch('_data/poverty.json')
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

        const ctx = document.getElementById('poverty-rate');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data[0].data.map(row => row.year),
                datasets: datasets
            },
            plugins: {
                deferred: {
                    yOffset: '75%',
                    delay: 500
                },
            },
            options: {}
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

fetch('_data/poverty-benchmark-21.json')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('poverty-benchmark');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(row => row.city),
                datasets: [{
                    label: 'Percent Living in Poverty 2021',
                    data: data.map(row => row.percentage),
                }]
            },
            plugins: {
                deferred: {
                    yOffset: '100%',
                    delay: 3000
                },
            },
            options: {
                indexAxis: 'x',
            }
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

fetch('_data/unemployment.json')
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

        const ctx = document.getElementById('unemployment-rate');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data[0].data.map(row => row.year),
                datasets: datasets
            },
            plugins: {
                deferred: {
                    yOffset: '75%',
                    delay: 500
                },
            },
            options: {}
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

fetch('_data/homeownership.json')
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

        const ctx = document.getElementById('homeownership-rate');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data[0].data.map(row => row.year),
                datasets: datasets
            },
            plugins: {
                deferred: {
                    yOffset: '75%',
                    delay: 500
                },
            },
            options: {}
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

fetch('_data/violent-crime.json')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('violent-crime-rate');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(row => row.city),
                datasets: [{
                    label: 'Violent Crime per 100k Population 2021',
                    data: data.map(row => row.percentage),
                }]
            },
            plugins: {
                deferred: {
                    yOffset: '100%',
                    delay: 3000
                },
            },
            options: {
                indexAxis: 'y',
            }
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

fetch('_data/education.json')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('education-state');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(row => row.city),
                datasets: [{
                    label: 'Percent with bachelors degree 2021',
                    data: data.map(row => row.percentage),
                }]
            },
            plugins: {
                deferred: {
                    yOffset: '100%',
                    delay: 3000
                },
            },
            options: {
                indexAxis: 'y',
            }
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

fetch('_data/education-benchmark.json')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('education-benchmark');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(row => row.city),
                datasets: [{
                    label: 'Percent with bachelors degree 2021',
                    data: data.map(row => row.percentage),
                }]
            },
            plugins: {
                deferred: {
                    yOffset: '100%',
                    delay: 3000
                },
            },
            options: {
                indexAxis: 'x',
            }
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });