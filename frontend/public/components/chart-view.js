// ChartView Component - Vanilla JavaScript version
class ChartView {
    constructor(containerId, data = []) {
        this.containerId = containerId;
        this.data = data;
        this.chart = null;
        this.init();
    }

    init() {
        console.log(`Initializing ChartView with container ID: ${this.containerId}`);
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Chart container with id '${this.containerId}' not found`);
            return;
        }

        console.log('Chart container found:', container);

        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.error('Chart.js library not loaded');
            container.innerHTML = '<div class="bg-yellow-50 border-l-4 border-yellow-400 p-4"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg></div><div class="ml-3"><p class="text-sm text-yellow-700">Chart.js library not loaded. Please check your internet connection.</p></div></div></div>';
            return;
        }

        console.log('Chart.js library loaded, creating chart...');
        this.createChart(container);
    }

    createChart(container) {
        try {
            // Clear container
            container.innerHTML = '';

            // Create canvas element
            const canvas = document.createElement('canvas');
            canvas.id = 'species-chart';
            container.appendChild(canvas);

            // Process data to get species counts
            const speciesCount = this.processData();

            // Prepare chart data
            const chartData = {
                labels: Object.keys(speciesCount).slice(0, 10),
                datasets: [{
                    label: 'Species Occurrences',
                    data: Object.values(speciesCount).slice(0, 10),
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            };

            // Chart options
            const chartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#ffffff'
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 52, 89, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#e0e0e0',
                        borderColor: '#00A8E8',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false,
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            precision: 0,
                            color: '#e0e0e0'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#e0e0e0'
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            };

            // Create chart
            this.chart = new Chart(canvas, {
                type: 'bar',
                data: chartData,
                options: chartOptions
            });

        } catch (error) {
            console.error('Error creating chart:', error);
            container.innerHTML = '<div class="bg-red-50 text-red-700 p-4 rounded-lg"><h3 class="font-bold">Chart Creation Error</h3><p>Unable to create the chart. Please try again.</p></div>';
        }
    }

    processData() {
        if (!this.data || this.data.length === 0) {
            return {
                'No Data': 0
            };
        }

        return this.data.reduce((acc, item) => {
            const species = item.scientific_name || 'Unknown Species';
            acc[species] = (acc[species] || 0) + 1;
            return acc;
        }, {});
    }

    updateData(newData) {
        this.data = newData;
        if (this.chart) {
            const speciesCount = this.processData();
            
            this.chart.data.labels = Object.keys(speciesCount).slice(0, 10);
            this.chart.data.datasets[0].data = Object.values(speciesCount).slice(0, 10);
            this.chart.update();
        }
    }

    destroy() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    }
}

// Export for use in other files
window.ChartView = ChartView;
