import axios from 'axios';

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

export const generateMindfulContent = async (prompt) => {
  try {
    const response = await axios.post(
      MISTRAL_API_URL,
      {
        model: 'mistral-tiny',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_MISTRAL_API_KEY}`
        }
      }
    );

    return response.data.choices[0]?.message?.content || 
           "Couldn't generate a response. Try again!";
    
  } catch (error) {
    console.error('Mistral API Error:', error);
    return "Sorry, I'm having a moment. Please try again shortly.";
  }
};