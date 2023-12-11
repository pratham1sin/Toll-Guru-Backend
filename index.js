const express = require('express');
const app = express();
const cors = require('cors')

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(204).end();
  });

  app.use(cors())

  app.use(express.json())
  app.use(express.urlencoded({extended:true}))
  




app.post('/origin-destination-waypoints', async (req, res) => {
  const {From, To}=req.body
  const from={"address": From}
  const to={"address":To}
      try {
        const tollGuruResponse = await fetch('https://apis.tollguru.com/toll/v2/origin-destination-waypoints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '4BnDDg8LPFtR6mGrJg4MfPNtrHhH9p9n',
              },
            body: JSON.stringify({from, to})
          });
  
      const tollGuruData = await tollGuruResponse.json();
      res.json(tollGuruData);
    } catch (error) {
      console.error('Error during proxy request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Your routes and other middleware here...

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
