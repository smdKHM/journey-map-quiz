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
