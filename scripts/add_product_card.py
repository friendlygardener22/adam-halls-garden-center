#!/usr/bin/env python3
"""
Add Product Card
Helper script to add product card information to products.
"""

import json
import os
import shutil
from datetime import datetime

def add_product_card(sku, card_files):
    """
    Add product card information to a specific product.
    
    Args:
        sku (str): Product SKU (e.g., 'TRE-ACE-25GAL-001')
        card_files (dict): Dictionary with card file paths
            {
                'card_image': 'path/to/card.png',
                'card_html': 'path/to/card.html',
                'spin_animation': 'path/to/animation.gif',
                'rounded_card': 'path/to/rounded.png'
            }
    """
    
    json_path = "src/api/products.json"
    
    # Read current products
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Find the product by SKU
    product_found = False
    for product in data['products']:
        if product.get('sku') == sku:
            # Copy files to product-cards directory
            dest_dir = "public/images/product-cards"
            os.makedirs(dest_dir, exist_ok=True)
            
            copied_files = {}
            for card_type, source_path in card_files.items():
                if source_path and os.path.exists(source_path):
                    filename = os.path.basename(source_path)
                    dest_path = os.path.join(dest_dir, filename)
                    
                    try:
                        shutil.copy2(source_path, dest_path)
                        copied_files[card_type] = f'/images/product-cards/{filename}'
                        print(f"✅ Copied {card_type}: {filename}")
                    except Exception as e:
                        print(f"❌ Error copying {card_type}: {e}")
                else:
                    print(f"⚠️  File not found for {card_type}: {source_path}")
            
            # Update product with card information
            if copied_files:
                product['product_card'] = copied_files
                
                # Add card images to images array
                if 'images' not in product:
                    product['images'] = []
                
                # Add card images to the images array
                for card_type, file_path in copied_files.items():
                    if card_type in ['card_image', 'rounded_card']:
                        product['images'].append(file_path)
                
                product_found = True
                print(f"✅ Updated product {product['name']} (SKU: {sku}) with card information")
            else:
                print(f"❌ No files were copied for SKU: {sku}")
            break
    
    if not product_found:
        print(f"⚠️  Product with SKU {sku} not found")
        return False
    
    # Write updated data back to file
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    return True

def add_japanese_maple_card():
    """Add the Japanese Maple card as an example."""
    
    card_files = {
        'card_image': r"C:\Users\taylo\OneDrive\Desktop\TRE-ACE-25GAL-001_card.png",
        'card_html': r"C:\Users\taylo\OneDrive\Desktop\TRE-ACE-25GAL-001_card.html",
        'spin_animation': r"C:\Users\taylo\OneDrive\Desktop\japanese_maple_spin_slow.gif",
        'rounded_card': r"C:\Users\taylo\OneDrive\Desktop\japanese_maple_card_rounded.png"
    }
    
    return add_product_card('TRE-ACE-25GAL-001', card_files)

def list_products_with_cards():
    """List all products that have product cards."""
    
    json_path = "src/api/products.json"
    
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    products_with_cards = []
    for product in data['products']:
        if product.get('product_card'):
            products_with_cards.append({
                'id': product['id'],
                'name': product['name'],
                'sku': product.get('sku', 'N/A'),
                'card_files': list(product['product_card'].keys())
            })
    
    return products_with_cards

def main():
    """Main function with menu options."""
    
    print("🎨 Product Card Management System")
    print("=" * 40)
    
    while True:
        print("\nOptions:")
        print("1. Add Japanese Maple card (example)")
        print("2. Add custom product card")
        print("3. List products with cards")
        print("4. Exit")
        
        choice = input("\nEnter your choice (1-4): ").strip()
        
        if choice == '1':
            print("\nAdding Japanese Maple card...")
            success = add_japanese_maple_card()
            if success:
                print("✅ Japanese Maple card added successfully!")
            else:
                print("❌ Failed to add Japanese Maple card")
        
        elif choice == '2':
            print("\nAdding custom product card...")
            sku = input("Enter product SKU: ").strip()
            
            card_image = input("Enter card image path (or press Enter to skip): ").strip()
            card_html = input("Enter card HTML path (or press Enter to skip): ").strip()
            spin_animation = input("Enter spin animation path (or press Enter to skip): ").strip()
            rounded_card = input("Enter rounded card path (or press Enter to skip): ").strip()
            
            card_files = {}
            if card_image:
                card_files['card_image'] = card_image
            if card_html:
                card_files['card_html'] = card_html
            if spin_animation:
                card_files['spin_animation'] = spin_animation
            if rounded_card:
                card_files['rounded_card'] = rounded_card
            
            if card_files:
                success = add_product_card(sku, card_files)
                if success:
                    print(f"✅ Product card added successfully for SKU: {sku}")
                else:
                    print(f"❌ Failed to add product card for SKU: {sku}")
            else:
                print("⚠️  No card files provided")
        
        elif choice == '3':
            print("\nProducts with cards:")
            products_with_cards = list_products_with_cards()
            if products_with_cards:
                for product in products_with_cards:
                    print(f"• {product['name']} (ID: {product['id']}, SKU: {product['sku']})")
                    print(f"  Card files: {', '.join(product['card_files'])}")
            else:
                print("No products have cards yet.")
        
        elif choice == '4':
            print("Goodbye!")
            break
        
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
