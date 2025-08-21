#!/usr/bin/env python3
"""
Create a priority spreadsheet with only products that need descriptions, care info, or categories
"""

import csv
import json
import os
from datetime import datetime

def create_priority_spreadsheet():
    """Create a spreadsheet with only products that need attention"""
    
    # Load current product data
    with open('src/api/products.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    products = data['products']
    
    # Filter products that need attention
    priority_products = []
    
    for product in products:
        needs_description = not product.get('description')
        needs_care = not product.get('care') or not any(product['care'].values())
        needs_category = not product.get('category')
        
        if needs_description or needs_care or needs_category:
            priority_products.append({
                'product': product,
                'needs_description': needs_description,
                'needs_care': needs_care,
                'needs_category': needs_category,
                'priority_score': (needs_description * 3) + (needs_care * 2) + (needs_category * 1)
            })
    
    # Sort by priority score (highest first)
    priority_products.sort(key=lambda x: x['priority_score'], reverse=True)
    
    # Create output filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = f"priority_products_{timestamp}.csv"
    
    # Define CSV columns
    fieldnames = [
        'priority_score', 'id', 'name', 'price', 'current_category', 'current_description',
        'new_category', 'new_description', 'new_scientific', 'new_features',
        'new_light', 'new_water', 'new_soil', 'new_fertilizer', 'new_pruning',
        'new_height', 'new_width', 'notes', 'status'
    ]
    
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for item in priority_products:
            product = item['product']
            
            # Determine priority level
            if item['priority_score'] >= 5:
                priority_level = "HIGH"
            elif item['priority_score'] >= 3:
                priority_level = "MEDIUM"
            else:
                priority_level = "LOW"
            
            row = {
                'priority_score': f"{item['priority_score']} ({priority_level})",
                'id': product.get('id', ''),
                'name': product.get('name', ''),
                'price': product.get('price', ''),
                'current_category': product.get('category', ''),
                'current_description': product.get('description', '')[:100] + '...' if product.get('description') and len(product.get('description', '')) > 100 else product.get('description', ''),
                'new_category': '',
                'new_description': '',
                'new_scientific': '',
                'new_features': '',
                'new_light': '',
                'new_water': '',
                'new_soil': '',
                'new_fertilizer': '',
                'new_pruning': '',
                'new_height': '',
                'new_width': '',
                'notes': '',
                'status': 'PENDING'
            }
            
            writer.writerow(row)
    
    print(f"✅ Created priority spreadsheet: {output_file}")
    print(f"📊 Priority Summary:")
    print(f"  - Total products needing attention: {len(priority_products)}")
    print(f"  - High priority: {sum(1 for item in priority_products if item['priority_score'] >= 5)}")
    print(f"  - Medium priority: {sum(1 for item in priority_products if 3 <= item['priority_score'] < 5)}")
    print(f"  - Low priority: {sum(1 for item in priority_products if item['priority_score'] < 3)}")
    
    # Show top 10 high priority items
    print(f"\n🔥 TOP 10 HIGH PRIORITY PRODUCTS:")
    for i, item in enumerate(priority_products[:10], 1):
        product = item['product']
        print(f"  {i}. {product['name']} (ID: {product['id']}) - Score: {item['priority_score']}")
    
    return output_file

if __name__ == "__main__":
    create_priority_spreadsheet()
