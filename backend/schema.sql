-- Marine Species Occurrence Database Schema
-- Drop existing tables if they exist
DROP TABLE IF EXISTS marine_occurrences CASCADE;
DROP TABLE IF EXISTS species CASCADE;
DROP TABLE IF EXISTS locations CASCADE;
DROP TABLE IF EXISTS institutions CASCADE;

-- Create institutions table
CREATE TABLE institutions (
    id SERIAL PRIMARY KEY,
    institution_code VARCHAR(50) UNIQUE NOT NULL,
    collection_code VARCHAR(100),
    owner_institution_code VARCHAR(50)
);

-- Create locations table
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    water_body VARCHAR(100),
    country VARCHAR(100),
    locality TEXT,
    decimal_latitude DECIMAL(10, 7),
    decimal_longitude DECIMAL(10, 7),
    minimum_depth_meters INTEGER,
    maximum_depth_meters INTEGER
);

-- Create species table
CREATE TABLE species (
    id SERIAL PRIMARY KEY,
    scientific_name VARCHAR(255) NOT NULL UNIQUE,
    scientific_name_id VARCHAR(255),
    identification_qualifier VARCHAR(255),
    type_status VARCHAR(100),
    identification_references TEXT
);

-- Create main occurrences table
CREATE TABLE marine_occurrences (
    id SERIAL PRIMARY KEY,
    occurrence_id VARCHAR(100) UNIQUE NOT NULL,
    catalog_number VARCHAR(100),
    institution_id INTEGER REFERENCES institutions(id),
    species_id INTEGER REFERENCES species(id),
    location_id INTEGER REFERENCES locations(id),
    
    -- Specimen details
    basis_of_record VARCHAR(50),
    individual_count INTEGER,
    sex VARCHAR(20),
    life_stage VARCHAR(50),
    occurrence_status VARCHAR(20),
    
    -- Event details
    event_id VARCHAR(100),
    event_date DATE,
    event_time TIME,
    habitat VARCHAR(100),
    sampling_protocol VARCHAR(100),
    
    -- Identification details
    identified_by VARCHAR(255),
    date_identified DATE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_occurrences_species ON marine_occurrences(species_id);
CREATE INDEX idx_occurrences_location ON marine_occurrences(location_id);
CREATE INDEX idx_occurrences_institution ON marine_occurrences(institution_id);
CREATE INDEX idx_occurrences_date ON marine_occurrences(event_date);
CREATE INDEX idx_locations_coords ON locations(decimal_latitude, decimal_longitude);
CREATE INDEX idx_species_name ON species(scientific_name);

-- Create views for common queries
CREATE VIEW occurrence_details AS
SELECT 
    o.occurrence_id,
    o.catalog_number,
    i.institution_code,
    s.scientific_name,
    o.individual_count,
    o.sex,
    o.life_stage,
    o.event_date,
    o.habitat,
    o.sampling_protocol,
    l.water_body,
    l.country,
    l.locality,
    l.decimal_latitude,
    l.decimal_longitude,
    l.minimum_depth_meters,
    l.maximum_depth_meters
FROM marine_occurrences o
JOIN institutions i ON o.institution_id = i.id
JOIN species s ON o.species_id = s.id
JOIN locations l ON o.location_id = l.id;

-- Sample data insertion (first few records)
INSERT INTO institutions (institution_code, collection_code, owner_institution_code) VALUES
('CMLRE', 'voucher specimen collections', 'CMLRE');

INSERT INTO species (scientific_name, scientific_name_id, identification_references) VALUES
('Harpiliopsis depressa', 'urn:lsid:marinespecies.org:taxname:220131', 'Holthuis, L. B. (1952). A general revision of the Palaemonidae (crustacea Decapod Natantia) of the Americas. II. The subfamily Palaemonidae. The University of Southern California Press Los Angeles, California, 332'),
('Saron marmoratus', 'urn:lsid:marinespecies.org:taxname:210450', 'Baby, S. T., Ghosh, S., Mohan, G., Cubelio, S. S., & Sudhakar, M. (2016). Occurrence of Marbled Shrimp Saron marmoratus (Olivier, 1811)(Decapoda: Caridea: Hippolytidae) in Lakshadweep Archipelago, India.');

INSERT INTO locations (water_body, country, locality, decimal_latitude, decimal_longitude, minimum_depth_meters, maximum_depth_meters) VALUES
('Arabian Sea', 'India', 'Agatti Island, Lakshadweep', 10.86, 72.18, 2, 10);

-- Function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_marine_occurrences_updated_at 
    BEFORE UPDATE ON marine_occurrences 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();