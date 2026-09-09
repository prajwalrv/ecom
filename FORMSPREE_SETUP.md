# Formspree Setup Guide for Red Chilli Lantern

## Quick Setup (5 minutes)

### Step 1: Create Formspree Account
1. Go to: https://formspree.io
2. Click "Get Started" or "Sign Up"
3. Sign up with your email (free plan is perfect for restaurants)
4. Verify your email address

### Step 2: Create Your Form
1. After logging in, click "New Form"
2. Give it a name: "Red Chilli Lantern Orders"
3. You'll get a form endpoint that looks like: `xyzabc123`
4. **COPY THIS ID** - you'll need it in the next step

### Step 3: Configure Email Recipient
1. In Formspree dashboard, go to your form settings
2. Set "Email notifications to:" to your restaurant email
   Example: `redchillilantern@gmail.com` or `orders@yourrestaurant.com`
3. Save settings

### Step 4: Update Your Website
Once you have your Formspree Form ID (looks like `xyzabc123`):

1. Open `index.html` in a text editor (Notepad, VS Code, etc.)
2. Press `Ctrl+F` to search for: `YOUR_FORM_ID`
3. You'll find it in TWO places (around lines 850 and 890)
4. Replace `YOUR_FORM_ID` with your actual ID

**Example:**
```javascript
// BEFORE:
fetch('https://formspree.io/f/YOUR_FORM_ID', {

// AFTER (if your ID is xyzabc123):
fetch('https://formspree.io/f/xyzabc123', {
```

5. Save the file
6. Open `index.html` in your browser

### Step 5: Test Your Order System
1. Open the website
2. Add items to cart
3. Click "Cart" button
4. Fill in the order form with test data:
   - Name: Test Customer
   - Phone: +91 98765 43210
   - Email: your.email@gmail.com (use your real email to receive the test)
   - Address: Test Address, Bangalore
5. Click "Place Order"
6. Check your email - you should receive the order details!

### What Happens When Customer Orders:
1. Customer adds items to cart
2. Customer fills order form
3. Order is sent to YOUR restaurant email
4. Customer gets confirmation
5. You receive order with:
   - Customer name, phone, email
   - Delivery address
   - All items ordered with quantities
   - Total amount
   - Special instructions (if any)

### Formspree Free Plan Limits:
- ✅ 50 submissions per month (perfect for starting)
- ✅ Email notifications
- ✅ No credit card required
- ✅ Upgrade later if you get more orders (good problem to have!)

### Troubleshooting:
- **Spam folder**: Check spam - first emails might land there
- **Not receiving**: Verify email in Formspree settings
- **"Failed to send"**: Check your Form ID is correct in BOTH places
- **Browser console errors**: Press F12, check Console tab for red errors

### Alternative Email Options:
If Formspree doesn't work, you can also use:
- **EmailJS**: https://www.emailjs.com (similar setup)
- **Web3Forms**: https://web3forms.com (even simpler)
- **Netlify Forms**: Free if hosting on Netlify

---

## Quick Reference:

**Your website file:** `C:\Users\PrajwalVenkatesh\Desktop\red\index.html`

**What to update:**
1. Line ~850: Replace `YOUR_FORM_ID` with your Formspree ID
2. Line ~890: Replace `YOUR_FORM_ID` with your Formspree ID
3. Line ~729: Update phone number
4. Line ~730: Update restaurant email
5. Line ~731: Update address

**Need help?** Just ask me to update these for you once you have your Formspree ID!