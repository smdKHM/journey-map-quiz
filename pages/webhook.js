// pages/api/webhook.js

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Forward the request to Zapier
    const zapierResponse = await fetch(
      'https://hooks.zapier.com/hooks/catch/10688144/urhi3mm/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
      }
    );

    const data = await zapierResponse.json();
    
    // Send success response back to the client
    res.status(200).json({ success: true, data });
    
  } catch (error) {
    console.error('Error forwarding to Zapier:', error);
    res.status(500).json({ error: 'Failed to send to Zapier' });
  }
}
```

---

### **Step 5: Commit the File**

1. Scroll down to the **"Commit new file"** section
2. In the commit message box, type: **`Add webhook API route to fix CORS`**
3. Click the green **"Commit new file"** button

---

## **📸 Visual Guide:**
```
1. Click "api" folder
   ↓
2. Click "Add file" → "Create new file"
   ↓
3. Type filename: webhook.js
   ↓
4. Paste the code
   ↓
5. Commit new file
