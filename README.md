# tip-gen
tip calculator based on single or multiple people spin car game to see who pays
# What Do I TIP - Complete Website

A fully responsive, mobile-first tip calculator and name spinner application built with vanilla HTML, CSS, and JavaScript.

## 📁 File Structure

```
.
├── index.html          # Main app with calculator, spinner, and FAQ
├── about.html          # About the company
├── contact.html        # Contact form
├── privacy.html        # Privacy policy
├── terms.html          # Terms of use
├── cookies.html        # Cookie policy
├── styles.css          # All styling (responsive, mobile-first)
└── script.js           # All JavaScript functionality
```

## ✨ Key Features

### 🧮 Tip Calculator
- Bill amount input with validation
- Number of people selector (defaults to 1)
- 6 preset tip percentage buttons (10%, 15%, 18%, 20%, 22%, 25%)
- Custom tip percentage input field
- Real-time calculation updates
- Display results:
  - Tip Amount
  - Total with Tip
  - Per Person Tip
  - Per Person Total

### 🎡 Name Spinner (Who Pays the Bill)
- **NEW: Proper Pie Chart Visualization**
  - Equal-sized pie segments for each person
  - Rotating wheel animation with 3-second spin
  - Arrow pointer at the top (fixed position)
  - Random winner selection lands on the pointer
- Add/remove names dynamically
- Delete button (×) next to each name
- Minimum 2 names required to spin
- Names persist in localStorage between sessions
- "X is paying this time!" announcement with animation

### 📚 Additional Sections
- Hero section with call-to-action
- Tipping 101 guide (6 categories: restaurants, delivery, coffee, groups, bars, salons)
- FAQ with 5 common tipping questions
- Helpful disclaimer about tipping customs

### 🎨 Design & Styling
- **Color Palette:**
  - Primary: #d4a574 (warm bronze)
  - Secondary: #8b4645 (burgundy)
  - Accent: #c1956f (light bronze)
  - Dark Text: #2b2b2b
  - Light Background: #f9f7f4

- **Typography:**
  - Display: Playfair Display (serif, elegant headings)
  - Body: Lato (clean, readable)

- **Responsive Breakpoints:**
  - Mobile: 600px and below
  - Tablet: 768px breakpoint
  - Desktop: Full width with max 1200px container

- **Interactive Elements:**
  - Smooth hover transitions
  - Button active states
  - Spinning wheel animation
  - Winner pop-in animation
  - Cookie banner with slide-up animation

### 🔧 JavaScript Features
- **Cookie Consent Management:** Banner appears once, stores preference in localStorage
- **Form Validation:** Real-time validation with error messages
- **Local Storage:** Saves spinner names, cookie consent
- **Accessibility:** Keyboard navigation, screen reader support
- **Performance:** Debounce/throttle utilities included

### 🌐 All Pages Include
- Sticky header with navigation
- Logo text: "What Do I TIP"
- Responsive navigation menu
- Footer with copyright and policy links
- Cookie consent banner
- 4-5 ad placeholder slots per page

## 📱 Responsive Behavior

- **Mobile (< 600px):** Single column layout, touch-optimized buttons
- **Tablet (600-768px):** 2-column calculator, flexible grid
- **Desktop (> 768px):** Full-width with centered content, side columns optional

## 🚀 How to Use

1. Save all files in the same directory
2. Open `index.html` in any modern web browser
3. No server or build tools required
4. Works offline - all functionality is client-side

### Tip Calculator
1. Enter bill amount
2. Click preset tip % or enter custom percentage
3. Results display automatically

### Name Spinner
1. Type a name and click "Add" (or press Enter)
2. Add at least 2 names
3. Click "Spin the Wheel"
4. Watch the pie chart spin
5. Arrow pointer indicates the winner

## 🔐 Privacy & Data Handling

- **No server submissions:** All calculations happen locally
- **Local storage only:** Names stored in browser localStorage (can be deleted anytime)
- **Cookie consent:** Users accept before any tracking
- **No personal data collection:** Contact form is demo only

## 🎯 Features Highlights

✅ Mobile-first design  
✅ No frameworks or dependencies  
✅ Vanilla HTML, CSS, JavaScript only  
✅ Fully responsive (mobile to desktop)  
✅ Accessibility features  
✅ Cookie consent management  
✅ Form validation  
✅ Smooth animations  
✅ SEO-friendly structure  
✅ Ad placeholder slots  
✅ Legal pages (Privacy, Terms, Cookies)  
✅ Contact form  
✅ Local storage persistence  
✅ Proper pie chart with equal segments  
✅ Arrow pointer for winner selection  

## 🛠️ Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Notes

- The contact form doesn't actually send emails (demo only)
- Ad slots are placeholders - integrate with your ad network as needed
- All data is processed client-side for privacy
- Spinner names can be cleared by deleting browser localStorage

---

Built with care for a smooth, elegant user experience. Enjoy calculating tips! 🎉