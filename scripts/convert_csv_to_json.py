#!/usr/bin/env python3
"""
Convert plant catalog CSV to JSON format for Adam Halls Garden Center API
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

def convert_csv_to_json(csv_file_path: str, output_file_path: str) -> None:
    """Convert CSV file to JSON format"""
    
    products = []
    
    with open(csv_file_path, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        
        for row in reader:
            # Parse images as array (even though CSV has single image)
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
            "source": "plant_catalog_with_image_category.csv",
            "conversion_date": "2024-01-01"
        }
    }
    
    # Write to JSON file
    with open(output_file_path, 'w', encoding='utf-8') as jsonfile:
        json.dump(json_data, jsonfile, indent=2, ensure_ascii=False)
    
    print(f"Converted {len(products)} products to {output_file_path}")

def main():
    # File paths
    csv_file = "c:/Users/taylo/OneDrive/Desktop/plant_catalog_with_image_category.csv"
    output_file = "src/api/products.json"
    
    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    # Convert CSV to JSON
    convert_csv_to_json(csv_file, output_file)
    
    print("CSV to JSON conversion completed!")

if __name__ == "__main__":
    main()
