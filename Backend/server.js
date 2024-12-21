const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Route to generate a funny excuse
app.post('/generate-excuse', async (req, res) => {
  const { category } = req.body;

  const prompt = `Generate a short and simple excuse for the following category: ${category}. Keep it humanized, humorous, and over-the-top, about 20-30 words, and make it funny and try some new excuse everytime like "I couldn't come to work because my cat staged a protest and refused to let me leave the house.", "I can't log in because my keyboard thinks it's a piano." , "My little brother used my homework to build a paper mache volcano.", "My internet is down because my neighbor cut the cable while chasing a raccoon", "My dog ate my homework, then threw it up, and it was gross.", "I can’t come because I’m binge-watching a show about how to make excuses." .`;


  try {
    const result = await model.generateContent(prompt);

    // Log the candidates array to understand its structure
    console.log('Full Candidate Object:', JSON.stringify(result.response.candidates, null, 2));

    // Access the text from content.parts[0].text
    const excuse = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    // Return the generated excuse
    res.json({ category, excuse });
  } catch (error) {
    console.error('Error generating excuse:', error.message);
    res.status(500).json({ error: 'Failed to generate excuse' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
