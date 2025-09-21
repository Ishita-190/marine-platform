class MapView {
    constructor(containerId, data) {
        try {
            console.log('Initializing MapView with container:', containerId);
            this.container = document.getElementById(containerId);
            if (!this.container) {
                throw new Error(`Container with ID '${containerId}' not found`);
            }

            // Ensure data is an array
            this.data = Array.isArray(data) ? data : [];
            console.log(`MapView received ${this.data.length} data points`);
            
            // Log sample data points for debugging
            if (this.data.length > 0) {
                console.log('Sample data points:', this.data.slice(0, 3));
            }

            this.map = null;
            this.markers = [];
            this.initializeMap();
        } catch (error) {
            console.error('Error in MapView constructor:', error);
            throw error; // Re-throw to be caught by the parent component
        }
    }

    initializeMap() {
        try {
            console.log('Initializing Mapbox map...');
            
            // Check if mapboxgl is available
            if (typeof mapboxgl === 'undefined') {
                throw new Error('Mapbox GL JS is not loaded');
            }

            // Set access token
            mapboxgl.accessToken = 'pk.eyJ1IjoiaXNoaXNhbjE5IiwiYSI6ImNtZnR4MnBtcjBtcXMyanF6aTVkY3hiMHgifQ.DVP78cO-G9n0hP5EgqxYTw';

            // Initialize the map
            this.map = new mapboxgl.Map({
                container: this.container.id,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [72.18, 10.86], // Default center (Indian Ocean)
                zoom: 3
            });

            // Add navigation controls
            this.map.addControl(new mapboxgl.NavigationControl());

            // Wait for the map to load before adding markers
            this.map.on('load', () => {
                console.log('Map loaded, adding markers...');
                this.addMarkers();
                this.fitToMarkers();
            });

            // Handle map errors
            this.map.on('error', (error) => {
                console.error('Map error:', error);
            });

        } catch (error) {
            console.error('Error initializing map:', error);
            throw error; // Re-throw to be caught by the parent component
        }
    }

    /**
     * Add markers to the map
     */
    addMarkers() {
        try {
            if (!this.map) {
                console.error('Cannot add markers: Map not initialized');
                return;
            }

            if (!this.data || !this.data.length) {
                console.warn('No data available to create markers');
                return;
            }

            console.log(`Adding ${this.data.length} markers to the map`);
            
            let validMarkers = 0;
            
            this.data.forEach((item, index) => {
                try {
                    // Skip if required coordinates are missing or invalid
                    if (!this.isValidCoordinate(item.decimal_latitude, item.decimal_longitude)) {
                        console.warn(`Skipping item ${index}: Invalid coordinates`, item);
                        return;
                    }

                    // Prepare marker data
                    const lng = parseFloat(item.decimal_longitude);
                    const lat = parseFloat(item.decimal_latitude);
                    const speciesName = item.scientific_name || 'Unknown Species';
                    const count = item.individual_count ? `Count: ${item.individual_count}` : 'Count: N/A';
                    const locality = item.locality ? `Location: ${item.locality}` : '';
                    const eventDate = item.event_date ? `Date: ${new Date(item.event_date).toLocaleDateString()}` : '';
                    
                    // Create popup content
                    const popupElement = document.createElement('div');
                    popupElement.style.color = 'black';
                    popupElement.style.padding = '10px';
                    popupElement.style.fontFamily = 'Arial, sans-serif';
                    popupElement.style.minWidth = '200px';
                    popupElement.style.maxWidth = '300px';
                    
                    popupElement.innerHTML = `
                        <div style="font-weight: bold; font-size: 14px; margin-bottom: 5px; color: #0066cc;">${speciesName}</div>
                        <div style="font-size: 12px; color: #333333; margin-bottom: 3px;">${count}</div>
                        ${locality ? `<div style="font-size: 12px; color: #555; margin-bottom: 3px;">${locality}</div>` : ''}
                        ${eventDate ? `<div style="font-size: 12px; color: #666; font-style: italic;">${eventDate}</div>` : ''}
                    `;
                    
                    // Create and configure popup
                    const popup = new mapboxgl.Popup({ 
                        offset: 25,
                        closeButton: true,
                        closeOnClick: true,
                        maxWidth: '300px'
                    }).setDOMContent(popupElement);

                    // Create and add marker
                    const marker = new mapboxgl.Marker({
                        color: '#0066cc',
                        scale: 0.8
                    })
                    .setLngLat([lng, lat])
                    .setPopup(popup)
                    .addTo(this.map);
                    
                    this.markers.push(marker);
                    validMarkers++;
                    
                } catch (error) {
                    console.error(`Error creating marker for item ${index}:`, error, item);
                }
            });
            
            console.log(`Successfully added ${validMarkers} out of ${this.data.length} markers`);
            
            if (validMarkers === 0) {
                console.warn('No valid markers were added to the map');
            }
            
        } catch (error) {
            console.error('Error in addMarkers:', error);
            throw error;
        }
    }
    
    /**
     * Check if coordinates are valid
     */
    isValidCoordinate(lat, lng) {
        if (lat === undefined || lng === undefined || lat === null || lng === null) {
            return false;
        }
        
        const numLat = parseFloat(lat);
        const numLng = parseFloat(lng);
        
        if (isNaN(numLat) || isNaN(numLng)) {
            return false;
        }
        
        // Check if coordinates are within valid ranges
        return (numLat >= -90 && numLat <= 90) && (numLng >= -180 && numLng <= 180);
    }

    /**
     * Fit the map to show all markers
     */
    fitToMarkers() {
        try {
            if (!this.map || !this.markers || !this.markers.length) {
                console.warn('Cannot fit to markers: No markers available');
                return;
            }

            console.log('Fitting map to markers...');
            
            const bounds = new mapboxgl.LngLatBounds();
            
            // Extend bounds for each marker
            this.markers.forEach(marker => {
                const lngLat = marker.getLngLat();
                if (lngLat && this.isValidCoordinate(lngLat.lat, lngLat.lng)) {
                    bounds.extend([lngLat.lng, lngLat.lat]);
                }
            });
            
            // If we have valid bounds, fit the map to them
            if (!bounds.isEmpty()) {
                this.map.fitBounds(bounds, {
                    padding: 50,
                    maxZoom: 15,
                    duration: 2000
                });
                console.log('Map fitted to markers');
            } else {
                console.warn('No valid bounds for markers');
            }
            
        } catch (error) {
            console.error('Error in fitToMarkers:', error);
        }
    }
    
    /**
     * Clean up resources
     */
    destroy() {
        try {
            if (this.markers && this.markers.length) {
                this.markers.forEach(marker => marker.remove());
                this.markers = [];
            }
            
            if (this.map) {
                this.map.remove();
                this.map = null;
            }
            
            console.log('MapView destroyed');
        } catch (error) {
            console.error('Error destroying MapView:', error);
        }
    }
}
