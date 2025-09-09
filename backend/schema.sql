-- schema.sql

-- Species table
CREATE TABLE species (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    abundance INT,
    metadata JSONB
);

-- Ocean parameters table
CREATE TABLE ocean_parameters (
    id SERIAL PRIMARY KEY,
    location VARCHAR(100),
    temp FLOAT,
    salinity FLOAT,
    collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data
INSERT INTO species (name, location, abundance, metadata)
VALUES 
('Indian Mackerel', 'Kerala Coast', 120, '{"family": "Scombridae"}');

INSERT INTO ocean_parameters (location, temp, salinity)
VALUES 
('Kerala Coast', 27.5, 35.2);
