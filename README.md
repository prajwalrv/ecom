# Red Chilli Lantern - E-commerce Website Setup Guide

## 📋 Overview
This is a premium Chinese restaurant e-commerce website with shopping cart functionality and email ordering system.

## 🎨 Features
- ✅ Premium Chinese restaurant design with red/gold theme
- ✅ Responsive layout (mobile & desktop)
- ✅ Shopping cart with add/remove/quantity controls
- ✅ Menu items with images, descriptions, prices, and tags
- ✅ Customer order form with delivery details
- ✅ Email order notification system
- ✅ Dark/Light theme support
- ✅ Real-time notifications

## 📁 File Structure
```
red/
├── index.html          # Main website file
├── assets/
│   └── red_chilly_latern_assest/
│       ├── unnamed.jpg      # Food images
│       ├── unnamed (1).jpg
│       ├── unnamed (2).jpg
│       ├── unnamed (3).jpg
│       └── Videos...
└── README.md           # This file
```

## 🚀 Quick Start

### Option 1: Open Locally
1. Simply open `index.html` in your web browser
2. The website will work immediately with all features except email sending

### Option 2: Set Up Email Integration (Recommended)

#### Using Formspree (Free & Easy)
1. Go to https://formspree.io
2. Sign up for a free account
3. Create a new form
4. Copy your form endpoint (looks like: `https://formspree.io/f/xyzabc123`)
5. Open `index.html` in a text editor
6. Find line ~850 (search for `YOUR_FORM_ID`)
7. Replace `YOUR_FORM_ID` with your Formspree ID (just the part after `/f/`)
   
   Example:
   ```javascript
   // Before:
   fetch('https://formspree.io/f/YOUR_FORM_ID', {
   
   // After:
   fetch('https://formspree.io/f/xyzabc123', {
   ```

8. Do the same for line ~890 (second occurrence)
9. Save and open the file in your browser

#### Alternative: Using EmailJS
1. Go to https://www.emailjs.com
2. Sign up for free account
3. Create an email service
4. Create an email template with these variables:
   - `{{customer_name}}`
   - `{{customer_phone}}`
   - `{{customer_email}}`
   - `{{delivery_address}}`
   - `{{special_instructions}}`
   - `{{order_items}}`
   - `{{total_amount}}`
   - `{{order_date}}`

5. Get your Service ID, Template ID, and Public Key
6. In `index.html`, uncomment the EmailJS script section and update with your IDs

## 📧 Email Configuration

### Restaurant Email
Update the restaurant contact email in two places:

1. **Footer section** (line ~730):
```html
<p>📧 info@redchillilantern.com</p>
```
Replace with your actual email.

2. **Order notification** (line ~890):
```javascript
formData.append('email', 'info@redchillilantern.com');
```
Replace with your actual email.

## 🎨 Customization

### Update Menu Items
Edit the `menuItems` array (starting around line ~720):

```javascript
const menuItems = [
  {
    id: 1,
    name: 'Your Dish Name',
    price: 299,
    description: 'Description here',
    image: 'assets/red_chilly_latern_assest/your-image.jpg',
    category: 'Category',
    tags: ['Tag1', 'Tag2']
  },
  // Add more items...
];
```

### Update Restaurant Details
1. **Restaurant name**: Update in header (line ~120)
2. **Phone number**: Update in footer (line ~729)
3. **Address**: Update in footer (line ~731)
4. **Hero text**: Update lines ~135-137

### Change Colors
The color scheme is defined in CSS variables (lines ~10-22). Main colors:
- `--accent: #C62828` (Red - main brand color)
- `--gold: #D4AF37` (Gold accent)

## 🌐 Hosting Options

### Option 1: GitHub Pages (Free)
1. Create a GitHub repository
2. Upload `index.html` and `assets` folder
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repo-name`

### Option 2: Netlify (Free)
1. Go to https://www.netlify.com
2. Drag and drop your entire `red` folder
3. Your site goes live instantly with a custom URL

### Option 3: Vercel (Free)
1. Go to https://vercel.com
2. Import your project
3. Deploy with one click

## 📱 Testing

1. **Add items to cart**: Click "Add to Cart" on any menu item
2. **View cart**: Click cart button in header
3. **Update quantities**: Use +/- buttons in cart
4. **Place order**: Fill out the form and click "Place Order"
5. **Check email**: Verify order confirmation is sent

## 🔧 Troubleshooting

### Images not loading
- Make sure the `assets` folder is in the same directory as `index.html`
- Check image paths in the `menuItems` array

### Email not sending
- Verify your Formspree/EmailJS configuration
- Check browser console for errors (F12 → Console tab)
- Ensure you replaced all `YOUR_FORM_ID` placeholders

### Cart not working
- Clear browser cache and refresh
- Check browser console for JavaScript errors

## 📊 Browser Support
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 🔐 Security Notes
- This is a static website, no backend required
- Customer data is sent via secure email service (Formspree uses HTTPS)
- No payment processing (orders are confirmed manually)

## 📞 Support
For customization help or issues, contact your developer.

## 📄 License
This website is created for Red Chilli Lantern. All rights reserved.

---

**Next Steps:**
1. Set up email integration (Formspree recommended)
2. Update restaurant contact details
3. Add/modify menu items as needed
4. Test thoroughly on desktop and mobile
5. Deploy to hosting platform
6. Share the link with customers!

Enjoy your new restaurant website! 🎉🏮