import psycopg2
import csv
import os
from dotenv import load_dotenv

load_dotenv()

# Database connection
conn = psycopg2.connect(
    host=os.getenv('DB_HOST'),
    port=os.getenv('DB_PORT'),
    database=os.getenv('DB_NAME'),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD')
)
cur = conn.cursor()

# Read CSV and handle missing values
with open('occurrence.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f, delimiter='\t')
    
    for row in reader:
        # Skip rows with missing required fields
        if not row.get('institutionCode') or not row.get('scientificName'):
            continue
            
        # Insert institution
        cur.execute("""
            INSERT INTO institutions (institution_code, collection_code, owner_institution_code)
            VALUES (%s, %s, %s)
            ON CONFLICT (institution_code) DO NOTHING
        """, (row['institutionCode'], row['collectionCode'], row['ownerInstitutionCode']))
        
        # Insert species
        cur.execute("""
            INSERT INTO species (scientific_name, scientific_name_id, identification_references)
            VALUES (%s, %s, %s)
            ON CONFLICT (scientific_name) DO NOTHING
        """, (row['scientificName'], row['scientificNameID'], row['identificationReferences']))
        
        # Insert location
        lat = float(row['decimalLatitude']) if row['decimalLatitude'] else None
        lng = float(row['decimalLongitude']) if row['decimalLongitude'] else None
        min_depth = int(row['minimumDepthInMeters']) if row['minimumDepthInMeters'] else None
        max_depth = int(row['maximumDepthInMeters']) if row['maximumDepthInMeters'] else None
        
        cur.execute("""
            INSERT INTO locations (water_body, country, locality, decimal_latitude, decimal_longitude, minimum_depth_meters, maximum_depth_meters)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING
        """, (row['waterBody'], row['country'], row['locality'], lat, lng, min_depth, max_depth))
        
        # Get IDs
        cur.execute("SELECT id FROM institutions WHERE institution_code = %s", (row['institutionCode'],))
        inst_id = cur.fetchone()[0]
        
        cur.execute("SELECT id FROM species WHERE scientific_name = %s", (row['scientificName'],))
        species_id = cur.fetchone()[0]
        
        cur.execute("SELECT id FROM locations WHERE water_body = %s AND country = %s AND locality = %s", 
                   (row['waterBody'], row['country'], row['locality']))
        loc_id = cur.fetchone()[0]
        
        # Insert occurrence
        individual_count = int(row['individualCount']) if row['individualCount'] else None
        event_date = row['eventDate'] if row['eventDate'] else None
        
        cur.execute("""
            INSERT INTO marine_occurrences (
                occurrence_id, catalog_number, institution_id, species_id, location_id,
                basis_of_record, individual_count, sex, life_stage, occurrence_status,
                event_date, habitat, sampling_protocol, identified_by, date_identified
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (occurrence_id) DO NOTHING
        """, (
            row['occurrenceID'], row['catalogNumber'], inst_id, species_id, loc_id,
            row['basisOfRecord'], individual_count, row['sex'], row['lifeStage'], 
            row['occurrenceStatus'], event_date, row['habitat'], row['samplingProtocol'],
            row['identifiedBy'], row['dateIdentified']
        ))

conn.commit()
cur.close()
conn.close()
print("Import completed successfully")