// DatasetOverview Component - Vanilla JavaScript version
class DatasetOverview {
    constructor(containerId, data = []) {
        this.containerId = containerId;
        this.data = Array.isArray(data) ? data : [];
        this.selectedCategory = 'all';
        this.showAllItems = true; // Flag to control pagination
        this.init();
    }

    init() {
        console.log(`Initializing DatasetOverview with container ID: ${this.containerId}`);
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Dataset container with id '${this.containerId}' not found`);
            return;
        }

        console.log('Dataset container found:', container);
        console.log('Dataset data:', this.data.length, 'records');
        
        this.render(container);
        this.attachEventListeners();
    }

    render(container) {
        const categories = this.getCategories();
        const filteredData = this.getFilteredData();
        const displayData = this.showAllItems ? filteredData : [];

        container.innerHTML = `
            <div class="min-h-screen p-6" style="background-color: #003459;">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold mb-2" style="color: #ffffff;">Marine Dataset Overview</h1>
                    <p style="color: #e0e0e0;">Comprehensive view of marine species occurrence data</p>
                </div>

                <!-- Interactive Grid -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    ${categories.map(category => `
                        <div
                            id="category-${category.id}"
                            class="${category.color} ${this.selectedCategory === category.id ? 'ring-4 ring-blue-300' : ''} 
                              text-white p-6 rounded-lg cursor-pointer hover:opacity-90 transition-all"
                        >
                            <h3 class="text-lg font-semibold mb-2">${category.name}</h3>
                            <p class="text-2xl font-bold">${category.count}</p>
                            <p class="text-sm opacity-90">records</p>
                        </div>
                    `).join('')}
                </div>

                <!-- Dataset Display -->
                <div class="rounded-lg shadow-lg p-6" style="background-color: rgba(255, 255, 255, 0.08); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1);">
                    <h2 class="text-xl font-bold mb-4" style="color: #ffffff;">
                        ${this.selectedCategory === 'all' ? 'Complete Dataset' : 
                           categories.find(c => c.id === this.selectedCategory)?.name} 
                        (${filteredData.length} records)
                    </h2>
                    
                    <div class="overflow-x-auto">
                        <table class="min-w-full table-auto">
                            <thead style="background-color: rgba(255, 255, 255, 0.1);">
                                <tr>
                                    <th class="px-4 py-2 text-left" style="color: #ffffff;">Species</th>
                                    <th class="px-4 py-2 text-left" style="color: #ffffff;">Location</th>
                                    <th class="px-4 py-2 text-left" style="color: #ffffff;">Count</th>
                                    <th class="px-4 py-2 text-left" style="color: #ffffff;">Date</th>
                                    <th class="px-4 py-2 text-left" style="color: #ffffff;">Habitat</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${displayData.length > 0 ? displayData.map((item, idx) => `
                                    <tr key="${idx}" class="border-b hover:bg-gray-700 transition-colors" style="border-color: rgba(255, 255, 255, 0.1);">
                                        <td class="px-4 py-2 font-medium" style="color: #ffffff;">${item.scientific_name || 'Unknown'}</td>
                                        <td class="px-4 py-2" style="color: #e0e0e0;">${item.locality || 'Unknown'}</td>
                                        <td class="px-4 py-2 text-center" style="color: #e0e0e0;">${item.individual_count !== undefined ? item.individual_count : 'N/A'}</td>
                                        <td class="px-4 py-2" style="color: #e0e0e0;">${item.event_date ? new Date(item.event_date).toLocaleDateString() : 'N/A'}</td>
                                        <td class="px-4 py-2" style="color: #e0e0e0;">${item.habitat || 'N/A'}</td>
                                    </tr>
                                `).join('') : `
                                    <tr>
                                        <td colspan="5" class="text-center py-4" style="color: #e0e0e0;">No data available</td>
                                    </tr>
                                `}
                            </tbody>
                        </table>
                        <p class="text-center py-2" style="color: #e0e0e0;">
                            Showing all ${filteredData.length} records
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    getCategories() {
        // Count occurrences by habitat type
        const habitatCounts = this.data.reduce((acc, item) => {
            const habitat = item.habitat || 'Unknown';
            acc[habitat] = (acc[habitat] || 0) + 1;
            return acc;
        }, {});

        // Create category objects for each habitat type
        const categories = Object.entries(habitatCounts).map(([habitat, count], index) => {
            const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];
            return {
                id: habitat.toLowerCase().replace(/\s+/g, '-'),
                name: habitat,
                color: colors[index % colors.length],
                count: count
            };
        });

        // Add 'All' category at the beginning
        return [
            {
                id: 'all',
                name: 'All Data',
                color: 'bg-gray-500',
                count: this.data.length
            },
            ...categories
        ];
    }

    getFilteredData() {
        if (this.selectedCategory === 'all') {
            return this.data;
        }
        return this.data.filter(item => {
            const itemHabitat = item.habitat ? item.habitat.toLowerCase() : '';
            return itemHabitat.includes(this.selectedCategory);
        });
    }

    attachEventListeners() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        // Handle category clicks
        const categoryElements = container.querySelectorAll('[id^="category-"]');
        categoryElements.forEach(el => {
            el.addEventListener('click', () => {
                const categoryId = el.id.replace('category-', '');
                this.selectedCategory = categoryId === 'all' ? 'all' : categoryId;
                this.currentPage = 1; // Reset to first page when changing categories
                this.render(container);
                this.attachEventListeners();
            });
        });

        // Handle pagination
        const prevButton = container.querySelector('#prev-page');
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.render(container);
                    this.attachEventListeners();
                    container.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        const nextButton = container.querySelector('#next-page');
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                const totalPages = Math.ceil(this.getFilteredData().length / this.itemsPerPage);
                if (this.currentPage < totalPages) {
                    this.currentPage++;
                    this.render(container);
                    this.attachEventListeners();
                    container.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    updateData(newData) {
        this.data = newData;
        const container = document.getElementById(this.containerId);
        if (container) {
            this.render(container);
            this.attachEventListeners();
        }
    }

    destroy() {
        // Clean up any event listeners or resources
        const container = document.getElementById(this.containerId);
        if (container) {
            container.innerHTML = '';
        }
    }
}

// Export for use in other files
window.DatasetOverview = DatasetOverview;
