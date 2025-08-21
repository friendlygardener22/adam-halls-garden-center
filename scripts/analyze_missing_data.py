#!/usr/bin/env python3
"""
Analyze missing data in the plant catalog CSV
"""

import csv
from collections import defaultdict
from typing import Dict, List, Set

def analyze_missing_data(csv_file_path: str) -> None:
    """Analyze missing data in the CSV file"""
    
    products_with_missing_data = []
    missing_fields_count = defaultdict(int)
    categories_with_missing_data = defaultdict(int)
    
    with open(csv_file_path, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        
        for row in reader:
            missing_fields = []
            
            # Check for missing important fields
            if not row['description'].strip():
                missing_fields.append('description')
                missing_fields_count['description'] += 1
            
            if not row['scientific'].strip():
                missing_fields.append('scientific')
                missing_fields_count['scientific'] += 1
            
            if not row['category'].strip():
                missing_fields.append('category')
                missing_fields_count['category'] += 1
            
            if not row['features'].strip():
                missing_fields.append('features')
                missing_fields_count['features'] += 1
            
            # Check care instructions
            care_fields = ['light', 'water', 'soil', 'fertilizer', 'pruning']
            missing_care = []
            for field in care_fields:
                if not row[field].strip():
                    missing_care.append(field)
                    missing_fields_count[field] += 1
            
            if missing_care:
                missing_fields.append(f"care_instructions ({', '.join(missing_care)})")
            
            # Check size information
            size_fields = ['height', 'width']
            missing_size = []
            for field in size_fields:
                if not row[field].strip():
                    missing_size.append(field)
                    missing_fields_count[field] += 1
            
            if missing_size:
                missing_fields.append(f"size_info ({', '.join(missing_size)})")
            
            # If product has missing data, add to list
            if missing_fields:
                products_with_missing_data.append({
                    'id': row['id'],
                    'name': row['name'],
                    'category': row['category'],
                    'missing_fields': missing_fields
                })
                
                if row['category'].strip():
                    categories_with_missing_data[row['category']] += 1
    
    # Print analysis results
    print("MISSING DATA ANALYSIS")
    print("=" * 50)
    
    print(f"\nTotal products with missing data: {len(products_with_missing_data)}")
    
    print(f"\nMissing field counts:")
    for field, count in sorted(missing_fields_count.items(), key=lambda x: x[1], reverse=True):
        print(f"  * {field}: {count} products")
    
    print(f"\nCategories with missing data:")
    for category, count in sorted(categories_with_missing_data.items(), key=lambda x: x[1], reverse=True):
        print(f"  * {category}: {count} products")
    
    print(f"\nProducts needing descriptions (first 20):")
    for product in products_with_missing_data[:20]:
        print(f"  * ID {product['id']}: {product['name']} ({', '.join(product['missing_fields'])})")
    
    # Generate recommendations
    print(f"\nRECOMMENDATIONS:")
    print("=" * 50)
    
    if missing_fields_count['description'] > 0:
        print(f"* Add descriptions to {missing_fields_count['description']} products")
    
    if missing_fields_count['scientific'] > 0:
        print(f"* Add scientific names to {missing_fields_count['scientific']} products")
    
    if missing_fields_count['category'] > 0:
        print(f"* Categorize {missing_fields_count['category']} products")
    
    if missing_fields_count['features'] > 0:
        print(f"* Add features to {missing_fields_count['features']} products")
    
    care_missing = sum(missing_fields_count[f] for f in ['light', 'water', 'soil', 'fertilizer', 'pruning'])
    if care_missing > 0:
        print(f"* Add care instructions to {care_missing} products")
    
    size_missing = sum(missing_fields_count[f] for f in ['height', 'width'])
    if size_missing > 0:
        print(f"* Add size information to {size_missing} products")
    
    # Save detailed report
    with open('missing_data_report.txt', 'w', encoding='utf-8') as f:
        f.write("MISSING DATA REPORT\n")
        f.write("=" * 50 + "\n\n")
        
        f.write(f"Total products with missing data: {len(products_with_missing_data)}\n\n")
        
        f.write("Products with missing data:\n")
        for product in products_with_missing_data:
            f.write(f"ID {product['id']}: {product['name']} - Missing: {', '.join(product['missing_fields'])}\n")
    
    print(f"\nDetailed report saved to: missing_data_report.txt")

def main():
    csv_file = "c:/Users/taylo/OneDrive/Desktop/plant_catalog_with_image_category.csv"
    analyze_missing_data(csv_file)

if __name__ == "__main__":
    main()
