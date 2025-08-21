#!/usr/bin/env python3
"""
Import updated product data from spreadsheet back to JSON format
"""

import csv
import json
import os
from typing import Dict, List, Any

def clean_text(text: str) -> str:
    """Clean and normalize text fields"""
    if not text or text.strip() == '':
        return ""
    return text.strip()

def parse_features(features: str) -> List[str]:
    """Parse features string into list"""
    if not features or features.strip() == '':
        return []
    return [f.strip() for f in features.split(';') if f.strip()]

def parse_care_object(light: str, water: str, soil: str, fertilizer: str, pruning: str) -> Dict[str, str]:
    """Create care object from individual care fields"""
    care = {}
    if clean_text(light):
        care["light"] = clean_text(light)
    if clean_text(water):
        care["water"] = clean_text(water)
    if clean_text(soil):
        care["soil"] = clean_text(soil)
    if clean_text(fertilizer):
        care["fertilizer"] = clean_text(fertilizer)
    if clean_text(pruning):
        care["pruning"] = clean_text(pruning)
    return care

def parse_size_object(height: str, width: str) -> Dict[str, str]:
    """Create size object from height and width fields"""
    size = {}
    if clean_text(height):
        size["height"] = clean_text(height)
    if clean_text(width):
        size["width"] = clean_text(width)
    return size

def import_from_spreadsheet(csv_file_path: str, output_file_path: str = "src/api/products.json") -> None:
    """Import updated CSV data back to JSON format"""
    
    products = []
    
    with open(csv_file_path, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        
        for row in reader:
            # Parse images as array
            images = [clean_text(row['images'])] if clean_text(row['images']) else []
            
            # Create product object
            product = {
                "id": int(row['id']),
                "name": clean_text(row['name']),
                "scientific": clean_text(row['scientific']),
                "category": clean_text(row['category']),
                "price": float(row['price']) if row['price'] else 0.0,
                "description": clean_text(row['description']),
                "images": images,
                "features": parse_features(row['features']),
                "care": parse_care_object(
                    row['light'], row['water'], row['soil'], 
                    row['fertilizer'], row['pruning']
                ),
                "size": parse_size_object(row['height'], row['width']),
                "availability": clean_text(row['availability']),
                "image_category": clean_text(row['image_category'])
            }
            
            products.append(product)
    
    # Create final JSON structure
    json_data = {
        "products": products,
        "metadata": {
            "total_products": len(products),
            "source": csv_file_path,
            "last_updated": "2024-01-01"
        }
    }
    
    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_file_path), exist_ok=True)
    
    # Write to JSON file
    with open(output_file_path, 'w', encoding='utf-8') as jsonfile:
        json.dump(json_data, jsonfile, indent=2, ensure_ascii=False)
    
    print(f"✅ Imported {len(products)} products from {csv_file_path}")
    print(f"✅ Updated {output_file_path}")
    
    # Show summary of improvements
    products_with_descriptions = sum(1 for p in products if p['description'])
    products_with_care = sum(1 for p in products if any(p['care'].values()))
    products_with_categories = sum(1 for p in products if p['category'])
    
    print(f"\n📊 Updated Summary:")
    print(f"  - Products with descriptions: {products_with_descriptions}/{len(products)}")
    print(f"  - Products with care info: {products_with_care}/{len(products)}")
    print(f"  - Products with categories: {products_with_categories}/{len(products)}")

def main():
    """Main function to import spreadsheet data"""
    
    # Look for the most recent editable spreadsheet
    csv_files = [f for f in os.listdir('.') if f.startswith('product_catalog_editable_') and f.endswith('.csv')]
    
    if not csv_files:
        print("❌ No editable spreadsheet found!")
        print("Run 'python scripts/export_to_spreadsheet.py' first to create an editable spreadsheet.")
        return
    
    # Use the most recent file
    latest_file = max(csv_files)
    print(f"📁 Found editable spreadsheet: {latest_file}")
    
    # Import the data
    import_from_spreadsheet(latest_file)

if __name__ == "__main__":
    main()
