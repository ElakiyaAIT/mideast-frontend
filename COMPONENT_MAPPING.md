# Landing Page - Component Mapping Guide

This document maps each section of the landing page design to its corresponding React component.

---

## 🗺️ Visual Component Map

```
┌─────────────────────────────────────────────────────────┐
│  📍 Section 1: NAVIGATION                               │
│  Component: LandingNavbar                               │
│  File: src/components/landing/LandingNavbar.tsx         │
│  ─────────────────────────────────────────────────────  │
│  • Logo: MIDCAT                                         │
│  • Links: Home, Auctions, About Us, Contact            │
│  • Button: Login                                        │
│  • Mobile: Hamburger menu                               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  📍 Section 2: HERO                                     │
│  Component: Hero                                        │
│  File: src/components/landing/Hero.tsx                  │
│  ─────────────────────────────────────────────────────  │
│  • Title: "QUALITY, USED HEAVY EQUIPMENT"              │
│  • Highlighted: "FOR SALE"                              │
│  • Description: Marketplace text                        │
│  • CTA Button: "Browse Inventory"                      │
│  • Background: Construction equipment image             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  📍 Section 3: UPCOMING AUCTIONS                        │
│  Component: UpcomingAuctions                            │
│  File: src/components/landing/UpcomingAuctions.tsx      │
│  ─────────────────────────────────────────────────────  │
│  • Title: "UPCOMING AUCTIONS"                           │
│  • Cards:                                               │
│    - Image                                              │
│    - Title: "NORTH-EAST REGIONAL..."                   │
│    - Date: Calendar icon + date                        │
│    - Location: Pin icon + location                     │
│    - Badge: "Live Auction"                             │
│    - Button: "View Details"                            │
│  • CTA: "View All Auctions"                            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  📍 Section 4: BROWSE EQUIPMENT CATEGORIES              │
│  Component: BrowseCategories                            │
│  File: src/components/landing/BrowseCategories.tsx      │
│  ─────────────────────────────────────────────────────  │
│  • Background: Yellow/Orange gradient                   │
│  • Title: "BROWSE EQUIPMENT CATEGORIES"                 │
│  • Grid: 3 columns (6 items)                           │
│    - Wheel Loaders                                      │
│    - Bulldozers                                         │
│    - Excavator                                          │
│    - Rollers                                            │
│    - Track Units                                        │
│    - Others                                             │
│  • Each card:                                           │
│    - Category image                                     │
│    - Category name                                      │
│    - Hover: Scale + overlay                            │
│  • CTA: "View All Categories"                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  📍 Section 5: ABOUT / COMPANY INFO                     │
│  Component: AboutSection                                │
│  File: src/components/landing/AboutSection.tsx          │
│  ─────────────────────────────────────────────────────  │
│  • Layout: Two columns                                  │
│  • Left: Image gallery (3 images, grid)                │
│  • Right:                                               │
│    - Title: "WE PROVIDE THE BEST QUALITY..."           │
│    - Description: Company info paragraph                │
│    - Feature list with checkmarks:                     │
│      ✓ Wide selection                                   │
│      ✓ Thorough inspection                              │
│      ✓ Competitive pricing                              │
│      ✓ Expert support                                   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  📍 Section 6: LATEST EQUIPMENT                         │
│  Component: LatestEquipment                             │
│  File: src/components/landing/LatestEquipment.tsx       │
│  Uses: EquipmentCard                                    │
│  File: src/components/landing/EquipmentCard.tsx         │
│  ─────────────────────────────────────────────────────  │
│  • Title: "LATEST EQUIPMENT"                            │
│  • Grid: 3 columns (6+ items)                          │
│  • Each EquipmentCard contains:                        │
│    - Equipment image                                    │
│    - Badge: "Excellent" / "Good" / "Like New"          │
│    - Name: "HD 785-5 Truck"                            │
│    - Model: "Komatsu HD785-5"                          │
│    - Year: 2018                                         │
│    - Hours: 5,200h                                      │
│    - Location: Pin icon + "New York, USA"              │
│    - Price: "$185,000"                                  │
│    - Seller: "MIDCAT"                                   │
│    - Buttons: "Details" + "Bid Now"                    │
│  • CTA: "View All Equipment"                           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  📍 Section 7: INDUSTRY LEADER / STATS                  │
│  Component: IndustryLeader                              │
│  File: src/components/landing/IndustryLeader.tsx        │
│  ─────────────────────────────────────────────────────  │
│  • Background: Dark (gray-900)                          │
│  • Title: "INDUSTRY LEADER IN CONSTRUCTION..."         │
│  • Grid: 4 columns                                      │
│  • Each stat card:                                      │
│    - Icon: Award/Package/Users/TrendingUp              │
│    - Value: "25+" / "10,000+" / "500+" / "98%"         │
│    - Label: Years / Equipment / Clients / Satisfaction │
│    - Description: Short text                            │
│  • Icon backgrounds: Yellow/orange gradient            │
│  • CTA: "Learn More About Us"                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  📍 Section 8: TESTIMONIALS / REVIEWS                   │
│  Component: Testimonials                                │
│  File: src/components/landing/Testimonials.tsx          │
│  ─────────────────────────────────────────────────────  │
│  • Title: "WHAT CUSTOMERS SAY ABOUT US"                 │
│  • Grid: 3 columns                                      │
│  • Each testimonial card:                               │
│    - Quote icon (decorative)                            │
│    - Star rating (5 stars)                             │
│    - Review text                                        │
│    - Avatar circle (with initial)                      │
│    - Name: "Adam Johnson"                              │
│    - Role + Company: "CEO, Johnson Construction"       │
│  • Background: Gray-50 cards on white                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  📍 Section 9: FOOTER                                   │
│  Component: LandingFooter                               │
│  File: src/components/landing/LandingFooter.tsx         │
│  ─────────────────────────────────────────────────────  │
│  • Background: Dark (gray-900)                          │
│  • Layout: 5 columns                                    │
│    Column 1-2 (wide):                                   │
│      - Logo + MIDCAT                                    │
│      - Company description                              │
│      - Contact info:                                    │
│        • Address with pin icon                          │
│        • Phone with phone icon                          │
│        • Email with mail icon                           │
│    Column 3: "Our Company"                              │
│      - About Us                                         │
│      - Our Team                                         │
│      - Careers                                          │
│      - News                                             │
│    Column 4: "Our Services"                             │
│      - Buy Equipment                                    │
│      - Sell Equipment                                   │
│      - Auctions                                         │
│      - Financing                                        │
│    Column 5: "Support"                                  │
│      - Help Center                                      │
│      - FAQs                                             │
│      - Contact Us                                       │
│      - Terms                                            │
│  • Bottom bar:                                          │
│    - Copyright: "© 2026 Mid-East..."                   │
│    - Social icons: Facebook, Twitter, LinkedIn, Insta  │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 Component Hierarchy

```
HomePage
├── Hero
├── UpcomingAuctions
│   └── Container
│       └── Auction Cards (map)
├── BrowseCategories
│   └── Container
│       └── Category Cards (map)
├── AboutSection
│   └── Container
│       ├── Images
│       └── Content
├── LatestEquipment
│   └── Container
│       └── EquipmentCard (map)
├── IndustryLeader
│   └── Container
│       └── Stat Cards (map)
└── Testimonials
    └── Container
        └── Testimonial Cards (map)
```

**Note:** When using PublicLayout, the navbar and footer are provided by PublicHeader and PublicFooter instead of LandingNavbar and LandingFooter.

---

## 🎨 Design Element Mapping

### Colors Used

| Design Element        | Tailwind Class                                                     | Hex Color       |
| --------------------- | ------------------------------------------------------------------ | --------------- |
| Primary/Brand         | `bg-primary-500`                                                   | #ebdb34         |
| Hero Background       | `bg-gradient-to-r from-primary-500 to-primary-600`                 | Yellow gradient |
| Categories Background | `bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600` | Yellow gradient |
| Dark Section          | `bg-gray-900`                                                      | Dark gray       |
| Light Section         | `bg-gray-50`                                                       | Off-white       |
| White Section         | `bg-white`                                                         | White           |
| Text Primary          | `text-gray-900`                                                    | Black           |
| Text Secondary        | `text-gray-700`                                                    | Dark gray       |
| Text Tertiary         | `text-gray-600`                                                    | Medium gray     |

### Typography Mapping

| Design Element | Tailwind Class                               | Size    |
| -------------- | -------------------------------------------- | ------- |
| Main Headings  | `text-3xl md:text-4xl lg:text-5xl font-bold` | 48-60px |
| Section Titles | `text-2xl font-bold`                         | 24px    |
| Card Titles    | `text-xl font-bold`                          | 20px    |
| Body Text      | `text-base` or `text-lg`                     | 16-18px |
| Small Text     | `text-sm`                                    | 14px    |
| Extra Small    | `text-xs`                                    | 12px    |

### Spacing Mapping

| Design Element            | Tailwind Class         | Pixels  |
| ------------------------- | ---------------------- | ------- |
| Section Padding (Mobile)  | `py-16`                | 64px    |
| Section Padding (Desktop) | `lg:py-24`             | 96px    |
| Card Gap                  | `gap-6` or `gap-8`     | 24-32px |
| Container Padding         | `px-4 sm:px-6 lg:px-8` | 16-32px |
| Internal Spacing          | `space-y-6`            | 24px    |

### Responsive Grid Mapping

| Section      | Mobile   | Tablet    | Desktop   |
| ------------ | -------- | --------- | --------- |
| Auctions     | 1 column | 2 columns | 3 columns |
| Categories   | 1 column | 2 columns | 3 columns |
| Equipment    | 1 column | 2 columns | 3 columns |
| Stats        | 1 column | 2 columns | 4 columns |
| Testimonials | 1 column | 2 columns | 3 columns |

---

## 🔗 Component Props Mapping

### Hero Props

```typescript
title → Main heading text
highlightedText → "FOR SALE" part
description → Below title text
buttonText → CTA button label
onButtonClick → Button click handler
backgroundImage → Hero background image
```

### Auction Card Props

```typescript
title → Auction name
date → Auction date
location → Venue address
description → Short description
image → Auction image
```

### Category Card Props

```typescript
name → Category name
image → Category image
count → Number of items (optional)
```

### Equipment Card Props

```typescript
name → Equipment name
model → Equipment model
year → Manufacturing year
hours → Operating hours
location → Current location
price → Current bid/price
image → Equipment photo
condition → Condition badge
seller → Seller name
```

### Testimonial Props

```typescript
name → Customer name
company → Company name
role → Job title
content → Review text
rating → Star rating (1-5)
avatar → Profile image (optional)
```

### Stat Card Props

```typescript
icon → Lucide icon component
value → Stat number
label → Stat label
description → Stat description
```

---

## 🎯 Interactive Elements Mapping

| Visual Element         | Component        | Event Handler         |
| ---------------------- | ---------------- | --------------------- |
| Login button           | LandingNavbar    | `onLoginClick`        |
| Browse Inventory       | Hero             | `onButtonClick`       |
| View Details (auction) | UpcomingAuctions | Card click            |
| View All Auctions      | UpcomingAuctions | `onViewAllClick`      |
| Category card          | BrowseCategories | `onCategoryClick(id)` |
| View All Categories    | BrowseCategories | `onViewAllClick`      |
| Details button         | EquipmentCard    | `onViewDetails(id)`   |
| Bid Now button         | EquipmentCard    | `onBidClick(id)`      |
| View All Equipment     | LatestEquipment  | `onViewAllClick`      |
| Learn More             | IndustryLeader   | `onLearnMoreClick`    |
| Footer links           | LandingFooter    | React Router Links    |
| Social icons           | LandingFooter    | External links        |

---

## 📐 Layout Structure

```
┌────────────────────────────────────────────────────┐
│ PublicLayout (or LandingNavbar)                    │
├────────────────────────────────────────────────────┤
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │ Hero Section                                  │ │
│  │ (Full width with Container inside)           │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │ Upcoming Auctions                            │ │
│  │ Container → Grid → Cards                     │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │ Browse Categories                            │ │
│  │ Container → Grid → Cards                     │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │ About Section                                │ │
│  │ Container → 2 Columns                        │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │ Latest Equipment                             │ │
│  │ Container → Grid → EquipmentCards            │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │ Industry Leader                              │ │
│  │ Container → Grid → Stat Cards                │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │ Testimonials                                 │ │
│  │ Container → Grid → Review Cards              │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
├────────────────────────────────────────────────────┤
│ PublicFooter (or LandingFooter)                    │
└────────────────────────────────────────────────────┘
```

---

## 🎨 Visual Effects Mapping

| Design Effect        | Implementation                                        |
| -------------------- | ----------------------------------------------------- |
| Card hover lift      | `hover:-translate-y-2 transition-all`                 |
| Image hover zoom     | `hover:scale-110 transition-transform`                |
| Button hover scale   | `hover:scale-[1.02] transition-transform`             |
| Shadow on hover      | `hover:shadow-xl`                                     |
| Gradient backgrounds | `bg-gradient-to-r from-primary-500 to-primary-600`    |
| Rounded corners      | `rounded-2xl` (large), `rounded-lg` (medium)          |
| Glass morphism       | `glass` utility class (not used in current design)    |
| Badge styling        | `bg-primary-500 text-gray-900 px-4 py-2 rounded-full` |
| Icon styling         | Lucide React icons with `h-5 w-5` or `h-6 w-6`        |

---

## 📱 Responsive Behavior Mapping

### Mobile (< 640px)

- Single column layouts
- Hamburger menu
- Stacked navigation
- Full-width buttons
- Reduced padding

### Tablet (640px - 1024px)

- 2-column grids
- Expanded navigation (md breakpoint)
- Moderate padding
- Side-by-side elements

### Desktop (> 1024px)

- 3-4 column grids
- Full navigation bar
- Maximum padding
- Optimal spacing
- Hover effects active

---

## 🔍 Finding Components

Need to modify a specific section? Here's how to find it:

| What I See         | Component File                 | Props to Change                    |
| ------------------ | ------------------------------ | ---------------------------------- |
| Top navigation     | `landing/LandingNavbar.tsx`    | `navLinks`, `logoSrc`              |
| Hero background    | `landing/Hero.tsx`             | `backgroundImage`                  |
| Hero text          | `landing/Hero.tsx`             | `title`, `description`             |
| Auction cards      | `landing/UpcomingAuctions.tsx` | `auctions` array                   |
| Category images    | `landing/BrowseCategories.tsx` | `categories` array                 |
| Company info       | `landing/AboutSection.tsx`     | `title`, `description`, `features` |
| Equipment listings | `landing/LatestEquipment.tsx`  | `equipment` array                  |
| Equipment card     | `landing/EquipmentCard.tsx`    | `equipment` object                 |
| Stats numbers      | `landing/IndustryLeader.tsx`   | `stats` array                      |
| Customer reviews   | `landing/Testimonials.tsx`     | `testimonials` array               |
| Footer content     | `landing/LandingFooter.tsx`    | `sections`, `socialLinks`          |

---

## ✅ Quick Checklist

When customizing, remember to update:

- [ ] Images in `/src/assets/`
- [ ] Text content in component props
- [ ] Links/navigation handlers
- [ ] Colors in `tailwind.config.js`
- [ ] Social media links
- [ ] Contact information
- [ ] Company name/branding
- [ ] Copyright year

---

**This mapping guide helps you quickly locate and modify any section of the landing page!**
