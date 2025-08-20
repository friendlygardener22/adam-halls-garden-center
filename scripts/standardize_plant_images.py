import os
import shutil
import re
from pathlib import Path

# Directories to scan for images
SOURCE_DIRS = [
    'assets/Adam Halls Garden Center Main Infromation/Plants',
    'assets/images',
]
TARGET_DIR = 'public/images/plants'

# Supported image extensions
EXTENSIONS = ['.jpg', '.jpeg', '.png']

def slugify(name):
    # Lowercase, replace spaces and non-alphanum with hyphens
    name = name.lower()
    name = re.sub(r'[^a-z0-9]+', '-', name)
    name = re.sub(r'-+', '-', name)
    return name.strip('-')

def main():
    Path(TARGET_DIR).mkdir(parents=True, exist_ok=True)
    plant_image_count = {}
    for src_dir in SOURCE_DIRS:
        for filename in os.listdir(src_dir):
            if not any(filename.lower().endswith(ext) for ext in EXTENSIONS):
                continue
            # Try to extract plant name from filename (remove numbers, extensions)
            base = os.path.splitext(filename)[0]
            # Remove trailing numbers and dashes
            base = re.sub(r'[-_]?\d+$', '', base)
            plant_slug = slugify(base)
            # Count images for this plant
            count = plant_image_count.get(plant_slug, 0) + 1
            plant_image_count[plant_slug] = count
            ext = os.path.splitext(filename)[1].lower()
            new_name = f"{plant_slug}-{count}{ext}"
            src_path = os.path.join(src_dir, filename)
            dest_path = os.path.join(TARGET_DIR, new_name)
            shutil.copy2(src_path, dest_path)
            print(f"Copied {src_path} -> {dest_path}")
    print("All images standardized and moved to public/images/plants/")

if __name__ == "__main__":
    main() 