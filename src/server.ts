import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Generate image endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const response = await axios.post(
      'https://api.together.xyz/inference',
      {
        model: 'stabilityai/stable-diffusion-xl-base-1.0',
        prompt,
        max_tokens: 512
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.TOGETHER_AI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
