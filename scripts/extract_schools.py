import pdfplumber
import json
import sys
import os

pdf_path = "/Users/kalaimani/Downloads/School_Block_Information_2026.pdf"
output_path = "/Users/kalaimani/Student Registration Details/src/data/schools.ts"

# Ensure src/data directory exists
os.makedirs(os.path.dirname(output_path), exist_ok=True)

data = {}

print("Extracting data from PDF... this may take a couple of minutes.")

with pdfplumber.open(pdf_path) as pdf:
    total_pages = len(pdf.pages)
    for i, page in enumerate(pdf.pages):
        table = page.extract_table()
        if table:
            for row in table:
                # Skip header or empty rows
                if not row or not row[0] or row[0] == 'S NO':
                    continue
                
                # Check if it has enough columns
                if len(row) >= 4:
                    district = row[1]
                    block = row[2]
                    school_name = row[3]
                    
                    if district and block and school_name:
                        district = district.strip()
                        block = block.strip()
                        school_name = school_name.strip()
                        
                        if district not in data:
                            data[district] = {}
                        if block not in data[district]:
                            data[district][block] = []
                        if school_name not in data[district][block]:
                            data[district][block].append(school_name)
                            
        if (i + 1) % 50 == 0:
            print(f"Processed {i + 1}/{total_pages} pages...")

print(f"Processed {total_pages}/{total_pages} pages.")

ts_content = f"""// This file is auto-generated from the PDF
export type SchoolData = Record<string, Record<string, string[]>>;

export const schoolData: SchoolData = {json.dumps(data, indent=2)};
"""

with open(output_path, "w") as f:
    f.write(ts_content)

print(f"Successfully generated {output_path}")
