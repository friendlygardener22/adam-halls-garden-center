#!/usr/bin/env python3
"""
Import updated product data from priority spreadsheet back to JSON format
Handles the priority spreadsheet format with 'new_' columns
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

def import_priority_spreadsheet(csv_file_path: str, output_file_path: str = "src/api/products.json") -> None:
    """Import updated priority CSV data back to JSON format"""
    
    # Load existing product data
    with open(output_file_path, 'r', encoding='utf-8') as f:
        existing_data = json.load(f)
    
    existing_products = {p['id']: p for p in existing_data['products']}
    
    # Read priority spreadsheet
    updated_count = 0
    new_data_count = 0
    
    with open(csv_file_path, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        
        for row in reader:
            product_id = int(row['id'])
            
            # Get existing product or create new one
            if product_id in existing_products:
                product = existing_products[product_id]
                updated_count += 1
            else:
                # This shouldn't happen, but just in case
                product = {
                    "id": product_id,
                    "name": clean_text(row['name']),
                    "scientific": "",
                    "category": "",
                    "price": float(row['price']) if row['price'] else 0.0,
                    "description": "",
                    "images": [],
                    "features": [],
                    "care": {},
                    "size": {},
                    "availability": "In Stock",
                    "image_category": ""
                }
                new_data_count += 1
            
            # Update with new data if provided
            if clean_text(row.get('new_category', '')):
                product['category'] = clean_text(row['new_category'])
            
            if clean_text(row.get('new_description', '')):
                product['description'] = clean_text(row['new_description'])
            
            if clean_text(row.get('new_scientific', '')):
                product['scientific'] = clean_text(row['new_scientific'])
            
            if clean_text(row.get('new_features', '')):
                product['features'] = parse_features(row['new_features'])
            
            # Update care information
            new_light = clean_text(row.get('new_light', ''))
            new_water = clean_text(row.get('new_water', ''))
            new_soil = clean_text(row.get('new_soil', ''))
            new_fertilizer = clean_text(row.get('new_fertilizer', ''))
            new_pruning = clean_text(row.get('new_pruning', ''))
            
            if any([new_light, new_water, new_soil, new_fertilizer, new_pruning]):
                product['care'] = parse_care_object(new_light, new_water, new_soil, new_fertilizer, new_pruning)
            
            # Update size information
            new_height = clean_text(row.get('new_height', ''))
            new_width = clean_text(row.get('new_width', ''))
            
            if any([new_height, new_width]):
                product['size'] = parse_size_object(new_height, new_width)
    
    # Convert back to list
    updated_products = list(existing_products.values())
    
    # Create final JSON structure
    json_data = {
        "products": updated_products,
        "metadata": {
            "total_products": len(updated_products),
            "source": csv_file_path,
            "last_updated": "2024-01-01",
            "import_summary": {
                "products_updated": updated_count,
                "new_products_added": new_data_count
            }
        }
    }
    
    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_file_path), exist_ok=True)
    
    # Write to JSON file
    with open(output_file_path, 'w', encoding='utf-8') as jsonfile:
        json.dump(json_data, jsonfile, indent=2, ensure_ascii=False)
    
    print(f"✅ Imported priority spreadsheet: {csv_file_path}")
    print(f"✅ Updated {output_file_path}")
    print(f"📊 Import Summary:")
    print(f"  - Products updated: {updated_count}")
    print(f"  - New products added: {new_data_count}")
    
    # Show summary of improvements
    products_with_descriptions = sum(1 for p in updated_products if p['description'])
    products_with_care = sum(1 for p in updated_products if any(p['care'].values()))
    products_with_categories = sum(1 for p in updated_products if p['category'])
    
    print(f"\n📈 Data Quality Summary:")
    print(f"  - Products with descriptions: {products_with_descriptions}/{len(updated_products)} ({products_with_descriptions/len(updated_products)*100:.1f}%)")
    print(f"  - Products with care info: {products_with_care}/{len(updated_products)} ({products_with_care/len(updated_products)*100:.1f}%)")
    print(f"  - Products with categories: {products_with_categories}/{len(updated_products)} ({products_with_categories/len(updated_products)*100:.1f}%)")
    
    # Show improvement
    if updated_count > 0:
        print(f"\n🎉 Successfully updated {updated_count} products!")
        print(f"   Your website now has more complete product information.")

def main():
    """Main function to import priority spreadsheet data"""
    
    import sys
    
    # Check if filename was provided as argument
    if len(sys.argv) > 1:
        csv_file = sys.argv[1]
        if not os.path.exists(csv_file):
            print(f"❌ File not found: {csv_file}")
            return
        print(f"📁 Using specified file: {csv_file}")
        import_priority_spreadsheet(csv_file)
        return
    
    # Look for the most recent priority spreadsheet
    csv_files = [f for f in os.listdir('.') if f.startswith('priority_products_') and f.endswith('.csv')]
    
    if not csv_files:
        print("❌ No priority spreadsheet found!")
        print("Run 'python scripts/create_priority_spreadsheet.py' first to create a priority spreadsheet.")
        return
    
    # Use the most recent file
    latest_file = max(csv_files)
    print(f"📁 Found priority spreadsheet: {latest_file}")
    
    # Import the data
    import_priority_spreadsheet(latest_file)

if __name__ == "__main__":
    main()
