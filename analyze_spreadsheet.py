#!/usr/bin/env python3
"""
Analyze the plant catalog CSV spreadsheet
"""

import csv
from collections import defaultdict, Counter

def analyze_spreadsheet():
    csv_file = "c:/Users/taylo/OneDrive/Desktop/plant_catalog_with_image_category.csv"
    
    with open(csv_file, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        data = list(reader)
    
    print("=" * 60)
    print("PLANT CATALOG SPREADSHEET ANALYSIS")
    print("=" * 60)
    
    # Basic statistics
    print(f"\n📊 BASIC STATISTICS:")
    print(f"Total Products: {len(data)}")
    
    # Price analysis
    prices = [float(row['price']) for row in data if row['price']]
    print(f"Price Range: ${min(prices):.2f} - ${max(prices):.2f}")
    print(f"Average Price: ${sum(prices)/len(prices):.2f}")
    
    # Data completeness
    print(f"\n📝 DATA COMPLETENESS:")
    print(f"Products with descriptions: {sum(1 for row in data if row['description'].strip())}")
    print(f"Products without descriptions: {sum(1 for row in data if not row['description'].strip())}")
    print(f"Products with scientific names: {sum(1 for row in data if row['scientific'].strip())}")
    print(f"Products with categories: {sum(1 for row in data if row['category'].strip())}")
    
    # Image categories
    print(f"\n🖼️ IMAGE CATEGORIES:")
    image_categories = Counter(row['image_category'] for row in data if row['image_category'])
    for category, count in image_categories.most_common():
        print(f"  {category}: {count} products")
    
    # Price distribution
    print(f"\n💰 PRICE DISTRIBUTION:")
    price_ranges = {
        "Under $10": 0,
        "$10-$25": 0,
        "$25-$50": 0,
        "$50-$100": 0,
        "$100-$200": 0,
        "Over $200": 0
    }
    
    for price in prices:
        if price < 10:
            price_ranges["Under $10"] += 1
        elif price < 25:
            price_ranges["$10-$25"] += 1
        elif price < 50:
            price_ranges["$25-$50"] += 1
        elif price < 100:
            price_ranges["$50-$100"] += 1
        elif price < 200:
            price_ranges["$100-$200"] += 1
        else:
            price_ranges["Over $200"] += 1
    
    for range_name, count in price_ranges.items():
        percentage = (count / len(prices)) * 100
        print(f"  {range_name}: {count} products ({percentage:.1f}%)")
    
    # Sample products by price range
    print(f"\n📋 SAMPLE PRODUCTS BY PRICE RANGE:")
    
    # Under $10
    cheap_products = [row for row in data if float(row['price']) < 10][:5]
    print(f"\nUnder $10 (Sample):")
    for product in cheap_products:
        print(f"  • {product['name']} - ${product['price']}")
    
    # $25-$50
    mid_products = [row for row in data if 25 <= float(row['price']) < 50][:5]
    print(f"\n$25-$50 (Sample):")
    for product in mid_products:
        print(f"  • {product['name']} - ${product['price']}")
    
    # Over $200
    expensive_products = [row for row in data if float(row['price']) > 200][:5]
    print(f"\nOver $200 (Sample):")
    for product in expensive_products:
        print(f"  • {product['name']} - ${product['price']}")
    
    # Complete products
    print(f"\n✅ COMPLETE PRODUCTS (with descriptions):")
    complete_products = [row for row in data if row['description'].strip()]
    for product in complete_products:
        print(f"  • {product['name']} - ${product['price']} - {product['category']}")
    
    # Column analysis
    print(f"\n📋 COLUMN ANALYSIS:")
    columns = ['id', 'name', 'scientific', 'category', 'price', 'availability', 
               'description', 'features', 'light', 'water', 'soil', 'fertilizer', 
               'pruning', 'height', 'width', 'images', 'image_category']
    
    for col in columns:
        filled_count = sum(1 for row in data if row[col].strip())
        percentage = (filled_count / len(data)) * 100
        print(f"  {col}: {filled_count}/{len(data)} ({percentage:.1f}%)")

if __name__ == "__main__":
    analyze_spreadsheet()
