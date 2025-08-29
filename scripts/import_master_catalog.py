#!/usr/bin/env python3
"""
Import Master Plant Catalog
Updates the products.json with comprehensive plant data from the updated master catalog CSV.
"""

import csv
import json
import os
from datetime import datetime

def clean_text(text):
    """Clean and format text fields."""
    if not text or text.strip() == '':
        return ""
    return text.strip()

def parse_features(tags):
    """Parse tags into features list."""
    if not tags:
        return []
    # Split by comma and clean
    features = [tag.strip() for tag in tags.split(',') if tag.strip()]
    return features[:5]  # Limit to 5 features

def parse_care_info(row):
    """Parse care information from row."""
    care = {}
    
    if clean_text(row.get('Sun')):
        care['light'] = clean_text(row['Sun'])
    
    if clean_text(row.get('Water')):
        care['water'] = clean_text(row['Water'])
    
    if clean_text(row.get('Soil')):
        care['soil'] = clean_text(row['Soil'])
    
    if clean_text(row.get('CareSummary')):
        care['general'] = clean_text(row['CareSummary'])
    
    return care

def parse_size_info(row):
    """Parse size information from row."""
    size = {}
    
    if clean_text(row.get('MatureHeight_ft')):
        height = row['MatureHeight_ft']
        if height and height != '0':
            size['height'] = f"{height} ft mature"
    
    if clean_text(row.get('MatureWidth_ft')):
        width = row['MatureWidth_ft']
        if width and width != '0':
            size['width'] = f"{width} ft mature"
    
    return size

def determine_category(row):
    """Determine the best category from the data."""
    category = clean_text(row.get('Category', ''))
    subcategory = clean_text(row.get('Subcategory', ''))
    
    # Map categories to our standard categories
    category_mapping = {
        'Tree': 'Trees',
        'Tropical Plant': 'Tropical',
        'Vine/Shrub': 'Shrubs',
        'Palm': 'Palms',
        'Fruit Tree': 'Fruit Trees',
        'Shrub': 'Shrubs',
        'Perennial': 'Perennials',
        'Succulent': 'Succulents',
        'Succulent Shrub': 'Succulents',
        'Misc': 'Other'
    }
    
    if category in category_mapping:
        return category_mapping[category]
    
    # Fallback based on plant name
    plant_name = clean_text(row.get('PlantName', '')).lower()
    if 'palm' in plant_name:
        return 'Palms'
    elif 'tree' in plant_name:
        return 'Trees'
    elif 'shrub' in plant_name or 'bush' in plant_name:
        return 'Shrubs'
    elif 'cactus' in plant_name or 'succulent' in plant_name:
        return 'Succulents'
    else:
        return 'Other'

def extract_product_id(sku):
    """Extract product ID from SKU."""
    if not sku:
        return None
    
    # Try to extract the number from the end of SKU
    parts = sku.split('-')
    if len(parts) >= 3:
        try:
            return int(parts[-1])
        except ValueError:
            pass
    
    return None

def create_product_from_row(row, product_id):
    """Create a product object from a CSV row."""
    
    # Basic product info
    product = {
        "id": product_id,
        "name": clean_text(row.get('CommonName', row.get('PlantName', ''))),
        "scientific": clean_text(row.get('PlantName', '')),
        "category": determine_category(row),
        "price": float(row.get('Price', 0)) if row.get('Price') else 0,
        "availability": "In Stock" if int(row.get('StockQty', 0)) > 0 else "Out of Stock",
        "sku": clean_text(row.get('SKU', '')),
        "container_size": clean_text(row.get('ContainerSize', '')),
        "supplier": clean_text(row.get('Supplier', '')),
        "location": clean_text(row.get('Location', '')),
        "last_updated": clean_text(row.get('LastUpdated', ''))
    }
    
    # Description and features
    if clean_text(row.get('Uses')):
        product["description"] = clean_text(row['Uses'])
    elif clean_text(row.get('CareSummary')):
        product["description"] = clean_text(row['CareSummary'])
    else:
        product["description"] = f"Beautiful {product['name']} perfect for your garden."
    
    # Features from tags
    features = parse_features(row.get('Tags', ''))
    if features:
        product["features"] = features
    else:
        product["features"] = []
    
    # Care information
    care = parse_care_info(row)
    if care:
        product["care"] = care
    else:
        product["care"] = {}
    
    # Size information
    size = parse_size_info(row)
    if size:
        product["size"] = size
    else:
        product["size"] = {}
    
    # Additional plant characteristics
    if clean_text(row.get('BloomColor')):
        product["bloom_color"] = clean_text(row['BloomColor'])
    
    if clean_text(row.get('BloomSeason')):
        product["bloom_season"] = clean_text(row['BloomSeason'])
    
    if clean_text(row.get('GrowthRate')):
        product["growth_rate"] = clean_text(row['GrowthRate'])
    
    if clean_text(row.get('USDAZones')):
        product["usda_zones"] = clean_text(row['USDAZones'])
    
    if clean_text(row.get('FrostTolerance_F')):
        product["frost_tolerance"] = clean_text(row['FrostTolerance_F'])
    
    if clean_text(row.get('DroughtTolerance')):
        product["drought_tolerance"] = clean_text(row['DroughtTolerance'])
    
    if clean_text(row.get('PetSafe')):
        product["pet_safe"] = clean_text(row['PetSafe'])
    
    if clean_text(row.get('Edible')):
        product["edible"] = clean_text(row['Edible'])
    
    # Images (placeholder for now)
    product["images"] = []
    
    # Advertisement text
    if clean_text(row.get('Advertisement')):
        product["advertisement"] = clean_text(row['Advertisement'])
    
    return product

def import_master_catalog():
    """Import the master plant catalog CSV and update products.json."""
    
    csv_path = r"C:\Users\taylo\OneDrive\Desktop\master_plant_catalog_updated.csv"
    json_path = "src/api/products.json"
    
    print("Importing Master Plant Catalog...")
    print(f"CSV Source: {csv_path}")
    print(f"JSON Target: {json_path}")
    
    # Read existing products to preserve images and custom fields
    existing_products = {}
    if os.path.exists(json_path):
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            for product in data.get('products', []):
                existing_products[product.get('id')] = product
        print(f"Found {len(existing_products)} existing products")
    
    # Read CSV and create new products
    new_products = []
    updated_count = 0
    new_count = 0
    
    with open(csv_path, 'r', encoding='utf-8') as csvfile:
        # Skip the first empty line
        next(csvfile)
        
        reader = csv.DictReader(csvfile)
        
        for row in reader:
            # Extract product ID from SKU
            product_id = extract_product_id(row.get('SKU'))
            if not product_id:
                product_id = len(new_products) + 1
            
            # Create new product from CSV data
            new_product = create_product_from_row(row, product_id)
            
            # Check if this product already exists
            if product_id in existing_products:
                # Merge with existing data, preserving images and custom fields
                existing = existing_products[product_id]
                
                # Preserve images and image_category from existing data
                if existing.get('images'):
                    new_product['images'] = existing['images']
                if existing.get('image_category'):
                    new_product['image_category'] = existing['image_category']
                
                # Update all other fields with new data
                for key, value in new_product.items():
                    if key not in ['images', 'image_category']:  # Don't overwrite images
                        existing[key] = value
                
                new_products.append(existing)
                updated_count += 1
            else:
                new_products.append(new_product)
                new_count += 1
    
    # Create final products data
    products_data = {
        "total_products": len(new_products),
        "last_updated": datetime.now().isoformat(),
        "source": "master_plant_catalog_updated.csv",
        "products": new_products
    }
    
    # Write to JSON file
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(products_data, f, indent=2, ensure_ascii=False)
    
    # Print summary
    print("\nImport Summary:")
    print(f"Total Products: {len(new_products)}")
    print(f"New Products: {new_count}")
    print(f"Updated Products: {updated_count}")
    print(f"Products with Complete Data: {sum(1 for p in new_products if p.get('description') and p.get('care'))}")
    print(f"Products Needing Attention: {sum(1 for p in new_products if not p.get('description') or not p.get('care'))}")
    
    # Show sample of updated products
    print("\nSample Updated Products:")
    for i, product in enumerate(new_products[:5]):
        print(f"{i+1}. {product['name']} - ${product['price']} - {product['category']}")
        if product.get('description'):
            print(f"   Description: {product['description'][:100]}...")
        if product.get('care'):
            print(f"   Care: {len(product['care'])} care fields")
    
    print(f"\nProducts database updated successfully!")
    print(f"File saved to: {json_path}")

if __name__ == "__main__":
    import_master_catalog()
