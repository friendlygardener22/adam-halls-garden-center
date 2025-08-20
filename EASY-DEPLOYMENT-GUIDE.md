# 🚀 Easy Deployment Guide - Update Your Live Site in 30 Seconds!

## ⚡ **Super Simple Workflow for Making Changes**

### **Step 1: Make Changes in Cursor**
- Edit any file in Cursor (pages, content, styling, etc.)
- Save your changes (Ctrl+S)

### **Step 2: Deploy in 30 Seconds**
```bash
# Option 1: One-click deployment (EASIEST)
./deploy.bat

# Option 2: Manual commands
npm run build
vercel --prod
```

### **Step 3: See Changes Live**
- Your changes are live in 30-60 seconds!
- No complicated setup needed

## 📁 **Quick Change Guide**

### **Most Common Changes You'll Make:**

#### **1. Update Business Hours/Contact Info**
**Files to edit:**
- `src/app/page.tsx` (Homepage)
- `src/app/contact/ContactClient.tsx` (Contact page)
- `src/app/garden/page.tsx` (Garden Center page)

#### **2. Add New Products**
**File to edit:**
- `src/api/products.json` (Product database)

#### **3. Update Team Information**
**Files to edit:**
- `src/app/about/page.tsx` (About page)
- `src/app/contact/ContactClient.tsx` (Team contact section)

#### **4. Change Prices**
**File to edit:**
- `src/api/products.json` (Product prices)

#### **5. Update Plant Care Content**
**File to edit:**
- `src/app/plant-care-guide/page.tsx` (Plant care guide)

## 🔄 **Automated Deployment Options**

### **Option 1: GitHub + Vercel (Recommended)**
1. **Setup (One-time):**
   ```bash
   git init
   git add .
   git commit -m "Initial website"
   git remote add origin https://github.com/yourusername/garden-center
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to vercel.com
   - Import from GitHub
   - Auto-deploy on every change!

3. **Future Changes:**
   ```bash
   # Make changes in Cursor, then:
   git add .
   git commit -m "Updated content"
   git push
   # Site updates automatically!
   ```

### **Option 2: Direct Vercel Deploy**
```bash
# Just run this after any changes:
./deploy.bat
```

## 📝 **Common Content Updates**

### **Quick Content Changes:**

#### **Homepage Hero Text:**
File: `src/app/page.tsx`
```tsx
// Find this section and edit:
<h1 className="...">Your New Title Here</h1>
<p className="...">Your new description here</p>
```

#### **Add New Plant:**
File: `src/api/products.json`
```json
{
  "id": "new-plant-001",
  "name": "New Plant Name",
  "scientificName": "Scientific Name",
  "price": 4.99,
  "description": "Plant description here",
  // ... other fields
}
```

#### **Update Business Hours:**
Files: `src/app/page.tsx`, `src/app/contact/ContactClient.tsx`, `src/app/garden/page.tsx`
```tsx
// Find and update:
<p>Monday - Sunday: 8:00 AM - 6:00 PM</p>
```

#### **Change Team Member Info:**
File: `src/app/about/page.tsx`
```tsx
// Find and update team member details:
{
  name: "New Team Member",
  title: "Their Job Title",
  phone: "951-XXX-XXXX",
  bio: "Their description"
}
```

## 🎨 **Style Changes**

### **Update Colors:**
File: `src/app/globals.css`
```css
/* Change green theme colors */
.bg-green-800 { background-color: your-new-color; }
.text-green-800 { color: your-new-color; }
```

### **Update Logo:**
1. Replace `public/images/logo.jpg` with your new logo
2. Keep the same filename or update references in `src/components/Navigation.tsx`

## 🚨 **Important Tips**

### **Before Making Changes:**
1. **Test locally first:**
   ```bash
   npm run dev
   # Open http://localhost:3001 to preview
   ```

2. **Always build before deploying:**
   ```bash
   npm run build
   # Make sure no errors before deploying
   ```

### **Common Issues:**
- **Build fails?** Check for syntax errors in your changes
- **Images not showing?** Make sure they're in the `public/images/` folder
- **Page not found?** Check file names and routing

## 📞 **Emergency Fixes**

### **If Something Breaks:**
1. **Revert changes:**
   ```bash
   git checkout HEAD~1 -- filename.tsx
   git add .
   git commit -m "Reverted problematic change"
   git push
   ```

2. **Or restore from backup:**
   - Copy files from backup
   - Redeploy with `./deploy.bat`

## 🎯 **Quick Deployment Checklist**

Before deploying changes:
- [ ] Test locally (`npm run dev`)
- [ ] Build successfully (`npm run build`)
- [ ] Check for errors
- [ ] Deploy (`./deploy.bat`)
- [ ] Verify live site

## 🌟 **You're All Set!**

Now you can:
1. **Make any changes** in Cursor
2. **Run `./deploy.bat`**
3. **See changes live** in 30 seconds!

**It's that easy!** 🚀
