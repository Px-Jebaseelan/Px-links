# Phoenix Links - Quick Start Guide

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- MongoDB connection string (local or cloud)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the project root:
```
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Using Phoenix Links

### Step 1: Create Your Profile
1. Click "Create Profile"
2. Enter a username (3+ characters, alphanumeric)
3. You'll be redirected to your dashboard

### Step 2: Add Links
1. Click "Add Link" or go to `/` 
2. Enter the URL
3. **(Optional)** Add a title and description
4. Click "Add Link"

### Step 3: Manage Your Links
- **View**: All links appear in your dashboard with click counts
- **Search**: Use the search bar to filter by title, URL, or description
- **Edit**: Click "Edit" to update link details
- **Delete**: Click "Delete" and confirm to remove a link
- **Copy**: Click "Copy" to get the URL in your clipboard
- **Share**: Click "Copy Link" in the header to share your profile

### Step 4: Logout
Click the "Logout" button to clear your session and return home.

---

## 🔗 Share Your Links

Your profile URL format: `http://localhost:3000/[username]`

Anyone can visit your profile and click your links. Each click is tracked and displayed.

---

## 🛠️ Features Overview

| Feature | Description |
|---------|-------------|
| **Create Profile** | Set up your unique username |
| **Add Links** | Create links with optional titles and descriptions |
| **Click Tracking** | See how many times each link has been clicked |
| **Search/Filter** | Find links quickly using the search bar |
| **Edit Links** | Update URL, title, and description anytime |
| **Delete Links** | Remove links with one click |
| **Copy URLs** | Quick clipboard access for sharing |
| **Responsive Design** | Works on mobile, tablet, and desktop |

---

## 📊 Dashboard Features

Your dashboard shows:
- Your username with a copy button for easy sharing
- Search bar to filter your links
- All your links with:
  - Link title (if added)
  - Link description (if added)
  - Full URL
  - Click count
  - Action buttons (Edit, Delete, Copy)

---

## 🎯 Tips & Tricks

1. **Better Organization**: Add descriptive titles to categorize your links
2. **Descriptions Help**: Use descriptions to tell visitors what each link is about
3. **Quick Share**: Use "Copy Link" to share your profile on social media
4. **Edit Anytime**: Broke a link? Edit it without deleting and recreating
5. **Track Performance**: Check the click counts to see which links are popular

---

## 🐛 Troubleshooting

### Username Already Exists
- The username is taken. Try a different one.

### Links Not Showing
- Make sure your MongoDB connection is working
- Check the browser console for errors
- Try refreshing the page

### Can't Edit/Delete Links
- Make sure you're logged in with the correct account
- Clear localStorage and log back in
- Check the browser console for error messages

### Changes Not Saving
- Check your internet connection
- Ensure MongoDB is running and accessible
- Check the NEXT_PUBLIC_API_URL in .env.local

---

## 📝 API Reference

### Create User
```
POST /api/users
{ "username": "john" }
```

### Create Link
```
POST /api/links
{
  "username": "john",
  "link": "https://example.com",
  "title": "My Link",
  "description": "Description here"
}
```

### Get Links
```
GET /api/links?username=john
```

### Update Link
```
PUT /api/links
{
  "linkId": "507f1f77bcf86cd799439011",
  "link": "https://new-url.com",
  "title": "Updated Title",
  "description": "Updated description"
}
```

### Delete Link
```
DELETE /api/links
{ "linkId": "507f1f77bcf86cd799439011" }
```

### Track Click
```
POST /api/links/click
{ "linkId": "507f1f77bcf86cd799439011" }
```

---

## 🎨 Customization

### Change Colors
Edit the Tailwind classes in components:
- Primary: `indigo-600` → change to any Tailwind color
- Secondary: `purple-600` → change to any Tailwind color

### Change Font
Update `app/layout.tsx` to import different Google Fonts

### Add More Fields
Extend the Link model in `models/Links.ts` and update components accordingly

---

## 📚 Project Structure

```
phoenix-links/
├── app/
│   ├── components/          # Reusable React components
│   ├── api/                 # API routes
│   ├── [username]/          # Dynamic user profile pages
│   ├── layout.tsx           # Root layout with navbar
│   └── page.tsx             # Home page
├── models/                  # MongoDB schemas
├── lib/                     # Utility functions
├── components/ui/           # Shadcn UI components
└── public/                  # Static assets
```

---

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
1. Build: `npm run build`
2. Start: `npm start`
3. Set environment variables on your platform

---

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Review the ENHANCEMENTS.md file for feature documentation
3. Check MongoDB connection settings
4. Ensure all dependencies are installed

---

Happy link sharing! 🔗✨
