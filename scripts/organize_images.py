#!/usr/bin/env python3
"""
Organize images based on image categories from the plant catalog CSV
"""

import csv
import os
import shutil
from collections import defaultdict
from pathlib import Path
from typing import Dict, List, Set

def analyze_image_categories(csv_file_path: str) -> Dict[str, List[str]]:
    """Analyze image categories and their associated images"""
    
    image_categories = defaultdict(list)
    unique_images = set()
    
    with open(csv_file_path, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        
        for row in reader:
            image_path = row['images'].strip()
            image_category = row['image_category'].strip()
            
            if image_path and image_category:
                image_categories[image_category].append({
                    'path': image_path,
                    'product_name': row['name'],
                    'product_id': row['id']
                })
                unique_images.add(image_path)
    
    return dict(image_categories), unique_images

def create_image_organization_plan(image_categories: Dict[str, List[str]]) -> None:
    """Create a plan for organizing images"""
    
    print("IMAGE ORGANIZATION ANALYSIS")
    print("=" * 50)
    
    print(f"\nImage Categories Found:")
    for category, images in sorted(image_categories.items()):
        print(f"  * {category}: {len(images)} images")
    
    print(f"\nRECOMMENDED FOLDER STRUCTURE:")
    print("=" * 50)
    
    for category, images in sorted(image_categories.items()):
        if category == "Nursery Generic":
            print(f"  public/images/plants/generic/")
            print(f"     - {len(images)} generic nursery images")
        else:
            # Clean category name for folder
            folder_name = category.lower().replace(' ', '-').replace('jpeg', '').replace('jpg', '').strip('-')
            print(f"  public/images/plants/{folder_name}/")
            print(f"     - {len(images)} {category} images")
    
    print(f"\nORGANIZATION RECOMMENDATIONS:")
    print("=" * 50)
    
    # Analyze generic images
    generic_images = image_categories.get("Nursery Generic", [])
    if generic_images:
        print(f"* {len(generic_images)} products use generic nursery images")
        print("  -> Consider taking specific photos for these products")
        print("  -> Or create product-specific placeholder images")
    
    # Find unique image categories
    specific_categories = [cat for cat in image_categories.keys() if cat != "Nursery Generic"]
    if specific_categories:
        print(f"* {len(specific_categories)} specific image categories found:")
        for cat in specific_categories:
            print(f"  -> {cat}")
    
    # Check for missing images
    print(f"\nIMAGE VALIDATION:")
    print("=" * 50)
    
    missing_images = []
    existing_images = []
    
    for category, images in image_categories.items():
        for img in images:
            image_path = img['path']
            full_path = f"public{image_path}"
            
            if os.path.exists(full_path):
                existing_images.append(image_path)
            else:
                missing_images.append({
                    'path': image_path,
                    'category': category,
                    'product': img['product_name']
                })
    
    print(f"Existing images: {len(existing_images)}")
    print(f"Missing images: {len(missing_images)}")
    
    if missing_images:
        print(f"\nMissing images (first 10):")
        for img in missing_images[:10]:
            print(f"  * {img['path']} (used by {img['product']})")

def create_image_organization_script(image_categories: Dict[str, List[str]]) -> None:
    """Create a script to organize images into folders"""
    
    script_content = '''#!/usr/bin/env python3
"""
Script to organize plant images into categorized folders
"""

import os
import shutil
from pathlib import Path

def organize_images():
    """Organize images into categorized folders"""
    
    # Create base directory
    base_dir = Path("public/images/plants")
    base_dir.mkdir(parents=True, exist_ok=True)
    
    # Image organization mapping
    image_organization = {
'''
    
    for category, images in sorted(image_categories.items()):
        if category == "Nursery Generic":
            folder_name = "generic"
        else:
            folder_name = category.lower().replace(' ', '-').replace('jpeg', '').replace('jpg', '').strip('-')
        
        script_content += f"        '{folder_name}': [\n"
        for img in images:
            script_content += f"            '{img['path']}',  # {img['product_name']}\n"
        script_content += "        ],\n"
    
    script_content += '''    }
    
    # Organize images
    for folder_name, image_paths in image_organization.items():
        folder_path = base_dir / folder_name
        folder_path.mkdir(exist_ok=True)
        
        print(f"Creating folder: {folder_path}")
        
        for image_path in image_paths:
            source_path = Path(f"public{image_path}")
            if source_path.exists():
                # Get filename
                filename = source_path.name
                dest_path = folder_path / filename
                
                # Copy image to organized folder
                shutil.copy2(source_path, dest_path)
                print(f"  Copied: {filename}")
            else:
                print(f"  Missing: {image_path}")
    
    print("Image organization completed!")

if __name__ == "__main__":
    organize_images()
'''
    
    with open('scripts/organize_images_execute.py', 'w', encoding='utf-8') as f:
        f.write(script_content)
    
    print(f"\nImage organization script created: scripts/organize_images_execute.py")

def generate_image_metadata(image_categories: Dict[str, List[str]]) -> None:
    """Generate metadata about images for the application"""
    
    metadata = {
        "image_categories": {},
        "product_image_mapping": {},
        "statistics": {
            "total_products": 0,
            "unique_images": 0,
            "categories": len(image_categories)
        }
    }
    
    all_products = 0
    unique_images = set()
    
    for category, images in image_categories.items():
        metadata["image_categories"][category] = {
            "count": len(images),
            "images": [img['path'] for img in images]
        }
        
        for img in images:
            all_products += 1
            unique_images.add(img['path'])
            metadata["product_image_mapping"][img['product_id']] = {
                "name": img['product_name'],
                "image": img['path'],
                "category": category
            }
    
    metadata["statistics"]["total_products"] = all_products
    metadata["statistics"]["unique_images"] = len(unique_images)
    
    # Save metadata
    import json
    with open('image_metadata.json', 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=2)
    
    print(f"\nImage metadata saved to: image_metadata.json")

def main():
    csv_file = "c:/Users/taylo/OneDrive/Desktop/plant_catalog_with_image_category.csv"
    
    # Analyze image categories
    image_categories, unique_images = analyze_image_categories(csv_file)
    
    # Create organization plan
    create_image_organization_plan(image_categories)
    
    # Create organization script
    create_image_organization_script(image_categories)
    
    # Generate metadata
    generate_image_metadata(image_categories)
    
    print(f"\nImage analysis completed!")

if __name__ == "__main__":
    main()
