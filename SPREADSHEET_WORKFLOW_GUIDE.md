# Adam Halls Garden Center - Spreadsheet Workflow Guide

## 🚀 Quick Start: Spreadsheet-Based Product Management

This guide shows you how to easily add and change product information using spreadsheets - much faster than editing individual files!

## 📋 Available Spreadsheet Tools

### 1. **Export Current Data** (`scripts/export_to_spreadsheet.py`)
Creates a complete editable spreadsheet with all 890 products.

### 2. **Priority Spreadsheet** (`scripts/create_priority_spreadsheet.py`)
Creates a focused spreadsheet with only products that need attention.

### 3. **Import Updated Data** (`scripts/import_priority_spreadsheet.py`)
Imports your edited priority spreadsheet back into the website.

## 🔄 Recommended Workflow

### **Step 1: Create Priority Spreadsheet**
```bash
python scripts/create_priority_spreadsheet.py
```
This creates `priority_products_[timestamp].csv` with only products needing attention.

### **Step 2: Edit in Excel/Google Sheets**
- Open the CSV file in Excel or Google Sheets
- Fill in the missing information in the "new_" columns
- Save the file

### **Step 3: Import Back to Website**
```bash
python scripts/import_priority_spreadsheet.py
```
This updates your website with the new information from the priority spreadsheet.

## 📊 Spreadsheet Column Guide

### **Priority Spreadsheet Columns:**

| Column | Description | What to Fill |
|--------|-------------|--------------|
| `priority_score` | How urgent this product needs attention | Auto-generated |
| `id` | Product ID | Read-only |
| `name` | Product name | Read-only |
| `price` | Current price | Read-only |
| `current_category` | Current category (if any) | Read-only |
| `current_description` | Current description (if any) | Read-only |
| `new_category` | **NEW** - Add proper category | Trees, Shrubs, Perennials, etc. |
| `new_description` | **NEW** - Add product description | 2-3 sentences about the plant |
| `new_scientific` | **NEW** - Scientific name | Latin name if known |
| `new_features` | **NEW** - Key features | Separate with semicolons (;) |
| `new_light` | **NEW** - Light requirements | Full sun, Partial shade, etc. |
| `new_water` | **NEW** - Watering needs | Low, Moderate, High water |
| `new_soil` | **NEW** - Soil requirements | Well-draining, Rich, etc. |
| `new_fertilizer` | **NEW** - Fertilization | Monthly, Spring only, etc. |
| `new_pruning` | **NEW** - Pruning instructions | When and how to prune |
| `new_height` | **NEW** - Mature height | 3-5 ft, 10-15 ft, etc. |
| `new_width` | **NEW** - Mature width | 2-3 ft, 8-10 ft, etc. |
| `notes` | **NEW** - Any additional notes | Special care, seasonal info |
| `status` | **NEW** - Work status | PENDING, IN PROGRESS, COMPLETE |

## 🎯 Priority Levels

### **HIGH Priority (Score 5-6)**
- Missing description AND care info
- Start with these first!

### **MEDIUM Priority (Score 3-4)**
- Missing description OR care info
- Work on these next

### **LOW Priority (Score 1-2)**
- Only missing category or minor info
- Handle these last

## 💡 Tips for Fast Data Entry

### **Categories (use these exact names):**
- Trees
- Shrubs
- Perennials
- Annuals
- Succulents
- Tropical
- Fruit
- Tools
- Supplies

### **Light Requirements:**
- Full Sun
- Partial Shade
- Full Shade
- Morning Sun
- Afternoon Shade

### **Water Requirements:**
- Low Water (drought tolerant)
- Moderate Water
- High Water (keep moist)
- Deep, infrequent watering

### **Features (separate with semicolons):**
- Drought tolerant
- Heat tolerant
- Cold hardy
- Deer resistant
- Attracts butterflies
- Low maintenance
- Fast growing
- Evergreen
- Deciduous

## 📝 Example Data Entry

### **Before (Empty):**
```
name: "Bush 1gallon"
new_category: ""
new_description: ""
new_light: ""
new_water: ""
```

### **After (Filled):**
```
name: "Bush 1gallon"
new_category: "Shrubs"
new_description: "Versatile evergreen shrub perfect for hedges and foundation plantings. Dense foliage provides year-round interest and privacy screening."
new_light: "Full Sun to Partial Shade"
new_water: "Moderate Water"
new_features: "Evergreen; Low maintenance; Drought tolerant; Fast growing"
new_height: "3-5 ft"
new_width: "2-3 ft"
```

## 🔧 Advanced Workflow

### **Batch Processing:**
1. Create priority spreadsheet
2. Sort by priority_score (highest first)
3. Work on 10-20 products at a time
4. Import after each batch
5. Check website to see improvements

### **Team Collaboration:**
1. Create priority spreadsheet
2. Split products among team members
3. Each person works on their assigned products
4. Combine all spreadsheets
5. Import final version

### **Quality Control:**
1. Import spreadsheet
2. Check website for formatting
3. Fix any issues in spreadsheet
4. Re-import if needed

## 📈 Progress Tracking

After each import, you'll see:
- How many products now have descriptions
- How many products now have care info
- How many products now have categories
- Overall improvement percentage

## 🚨 Troubleshooting

### **Common Issues:**
1. **CSV not found**: Make sure you're in the right directory
2. **Import errors**: Check for special characters in descriptions
3. **Format issues**: Use semicolons (;) to separate features
4. **Encoding problems**: Save CSV as UTF-8

### **Need Help?**
- Check the generated reports in the root directory
- Review the import summary for specific errors
- Ensure all required columns are present

## 🎉 Benefits of This Approach

✅ **10x Faster** than editing individual files  
✅ **Visual Interface** - see all products at once  
✅ **Batch Processing** - work on multiple products  
✅ **Progress Tracking** - see improvements immediately  
✅ **Team Friendly** - multiple people can work together  
✅ **Backup Safe** - original data is preserved  

---

**Ready to start?** Run `python scripts/create_priority_spreadsheet.py` to create your first priority spreadsheet!
