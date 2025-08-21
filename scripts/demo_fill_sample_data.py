#!/usr/bin/env python3
"""
Demo script to fill in sample data for the first few products
This shows how the priority spreadsheet system works
"""

import csv
import os

def demo_fill_sample_data():
    """Fill in sample data for demonstration"""
    
    # Find the most recent priority spreadsheet
    csv_files = [f for f in os.listdir('.') if f.startswith('priority_products_') and f.endswith('.csv')]
    
    if not csv_files:
        print("❌ No priority spreadsheet found!")
        print("Run 'python scripts/create_priority_spreadsheet.py' first.")
        return
    
    latest_file = max(csv_files)
    print(f"📁 Found priority spreadsheet: {latest_file}")
    
    # Read the original data
    rows = []
    with open(latest_file, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        rows = list(reader)
    
    # Sample data for first 5 products
    sample_data = {
        4: {  # Bush 1gallon
            'new_category': 'Shrubs',
            'new_description': 'Versatile evergreen shrub perfect for hedges and foundation plantings. Dense foliage provides year-round interest and privacy screening.',
            'new_scientific': 'Buxus sempervirens',
            'new_features': 'Evergreen; Low maintenance; Drought tolerant; Fast growing',
            'new_light': 'Full Sun to Partial Shade',
            'new_water': 'Moderate Water',
            'new_soil': 'Well-draining, rich organic soil',
            'new_fertilizer': 'Spring application of balanced fertilizer',
            'new_pruning': 'Prune in late winter or early spring',
            'new_height': '3-5 ft',
            'new_width': '2-3 ft',
            'status': 'COMPLETE'
        },
        5: {  # Bush 5gallon
            'new_category': 'Shrubs',
            'new_description': 'Larger specimen shrub ideal for landscape focal points. Provides excellent structure and can be trained into various shapes.',
            'new_scientific': 'Buxus sempervirens',
            'new_features': 'Evergreen; Low maintenance; Drought tolerant; Versatile',
            'new_light': 'Full Sun to Partial Shade',
            'new_water': 'Moderate Water',
            'new_soil': 'Well-draining, rich organic soil',
            'new_fertilizer': 'Spring application of balanced fertilizer',
            'new_pruning': 'Prune in late winter or early spring',
            'new_height': '4-6 ft',
            'new_width': '3-4 ft',
            'status': 'COMPLETE'
        },
        6: {  # Giant Bird Of Paradise 5 Gallon
            'new_category': 'Tropical',
            'new_description': 'Majestic tropical plant with large paddle-shaped leaves and striking bird-like flowers. Perfect statement plant for patios and tropical gardens.',
            'new_scientific': 'Strelitzia nicolai',
            'new_features': 'Exotic flowers; Large leaves; Heat tolerant; Great container plant',
            'new_light': 'Full Sun to bright filtered light',
            'new_water': 'Regular water, keep soil moist but not soggy',
            'new_soil': 'Rich, well-draining potting mix',
            'new_fertilizer': 'Monthly during growing season',
            'new_pruning': 'Remove dead leaves and spent flowers',
            'new_height': '6-8 ft',
            'new_width': '4-5 ft',
            'status': 'COMPLETE'
        },
        7: {  # Pygmy Palm 14"
            'new_category': 'Tropical',
            'new_description': 'Compact palm perfect for small spaces and containers. Slow-growing with graceful fronds that add tropical flair to any setting.',
            'new_scientific': 'Phoenix roebelenii',
            'new_features': 'Compact; Slow growing; Drought tolerant; Container friendly',
            'new_light': 'Full Sun to Partial Shade',
            'new_water': 'Moderate water, allow soil to dry between waterings',
            'new_soil': 'Well-draining, slightly acidic soil',
            'new_fertilizer': 'Spring and summer with palm fertilizer',
            'new_pruning': 'Remove dead fronds only',
            'new_height': '6-8 ft',
            'new_width': '3-4 ft',
            'status': 'COMPLETE'
        },
        8: {  # Pygmy Palm 17"
            'new_category': 'Tropical',
            'new_description': 'Larger specimen of the popular pygmy palm. Perfect for creating a tropical oasis in your landscape with its graceful arching fronds.',
            'new_scientific': 'Phoenix roebelenii',
            'new_features': 'Graceful fronds; Drought tolerant; Low maintenance; Tropical look',
            'new_light': 'Full Sun to Partial Shade',
            'new_water': 'Moderate water, allow soil to dry between waterings',
            'new_soil': 'Well-draining, slightly acidic soil',
            'new_fertilizer': 'Spring and summer with palm fertilizer',
            'new_pruning': 'Remove dead fronds only',
            'new_height': '8-10 ft',
            'new_width': '4-5 ft',
            'status': 'COMPLETE'
        }
    }
    
    # Update rows with sample data
    for row in rows:
        product_id = int(row['id'])
        if product_id in sample_data:
            for key, value in sample_data[product_id].items():
                row[key] = value
    
    # Create demo file
    demo_file = f"demo_filled_{latest_file}"
    with open(demo_file, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = rows[0].keys()
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    
    print(f"✅ Created demo file: {demo_file}")
    print(f"📝 Sample data filled for products: {list(sample_data.keys())}")
    print(f"\n🎯 Next steps:")
    print(f"1. Open {demo_file} in Excel/Google Sheets")
    print(f"2. See how the 'new_' columns are filled with sample data")
    print(f"3. Run: python scripts/import_priority_spreadsheet.py")
    print(f"4. Check your website to see the updated products!")

if __name__ == "__main__":
    demo_fill_sample_data()
