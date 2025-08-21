#!/usr/bin/env python3
"""
Export current product data to spreadsheet format for easy editing
"""

import csv
import json
import os
from datetime import datetime

def export_to_spreadsheet():
    """Export current product data to CSV for easy editing"""
    
    # Load current product data
    with open('src/api/products.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    products = data['products']
    
    # Create output filename with timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = f"product_catalog_editable_{timestamp}.csv"
    
    # Define CSV columns
    fieldnames = [
        'id', 'name', 'scientific', 'category', 'price', 'availability',
        'description', 'features', 'light', 'water', 'soil', 'fertilizer',
        'pruning', 'height', 'width', 'images', 'image_category',
        'needs_description', 'needs_care', 'needs_category', 'priority_level'
    ]
    
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for product in products:
            # Determine what needs to be added
            needs_description = 'YES' if not product.get('description') else 'NO'
            needs_care = 'YES' if not product.get('care') or not any(product['care'].values()) else 'NO'
            needs_category = 'YES' if not product.get('category') else 'NO'
            
            # Determine priority level
            if needs_description == 'YES' and needs_care == 'YES':
                priority = 'HIGH'
            elif needs_description == 'YES' or needs_care == 'YES':
                priority = 'MEDIUM'
            else:
                priority = 'LOW'
            
            # Prepare row data
            row = {
                'id': product.get('id', ''),
                'name': product.get('name', ''),
                'scientific': product.get('scientific', ''),
                'category': product.get('category', ''),
                'price': product.get('price', ''),
                'availability': product.get('availability', ''),
                'description': product.get('description', ''),
                'features': '; '.join(product.get('features', [])),
                'light': product.get('care', {}).get('light', ''),
                'water': product.get('care', {}).get('water', ''),
                'soil': product.get('care', {}).get('soil', ''),
                'fertilizer': product.get('care', {}).get('fertilizer', ''),
                'pruning': product.get('care', {}).get('pruning', ''),
                'height': product.get('size', {}).get('height', ''),
                'width': product.get('size', {}).get('width', ''),
                'images': '; '.join(product.get('images', [])),
                'image_category': product.get('image_category', ''),
                'needs_description': needs_description,
                'needs_care': needs_care,
                'needs_category': needs_category,
                'priority_level': priority
            }
            
            writer.writerow(row)
    
    print(f"✅ Exported {len(products)} products to: {output_file}")
    print(f"📊 Summary:")
    print(f"  - Products needing descriptions: {sum(1 for p in products if not p.get('description'))}")
    print(f"  - Products needing care info: {sum(1 for p in products if not p.get('care') or not any(p['care'].values()))}")
    print(f"  - Products needing categories: {sum(1 for p in products if not p.get('category'))}")
    
    return output_file

if __name__ == "__main__":
    export_to_spreadsheet()
