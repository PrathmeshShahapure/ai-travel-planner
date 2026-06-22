import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROK_API_KEY });

export const generateTravelPlan = async (
  destination,
  days,
  budgetType,
  interests
) => {
    const prompt = `
    Generate a travel plan for:
    
    Destination: ${destination}
    Days: ${days}
    Budget Type: ${budgetType}
    Interests: ${interests.join(", ")}
    
    Return ONLY a valid JSON object.
    
    Required JSON structure:
    
    {
      "itinerary": [
        {
          "day": 1,
          "activities": ["activity1", "activity2"]
        }
      ],
      "budgetEstimate": {
        "flights": 0,
        "accommodation": 0,
        "food": 0,
        "activities": 0,
        "total": 0
      },
      "hotels": [
        {
          "name": "",
          "type": ""
        }
      ],
      "mustDo": [],
      "travelTips": []
    }
    
    Do not include markdown.
    Do not include explanations.
    Return JSON only.
    `;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
  });
  return JSON.parse(response.choices[0].message.content);
};

export const regenerateDayPlan = async (
  destination,
  day,
) => {
  const prompt = `
Destination: ${destination}

Regenerate Day ${day}.

User Instruction:regenerate the day activities for the given day.

Return ONLY valid JSON:

{
  "day": ${day},
  "activities": [ "activity 1",
    "activity 2",
    "activity 3"]
}

Activities must be an array of strings.
Example:
{
  "day": 1,
  "activities": [
    "Visit Sinhagad Fort",
    "Explore Katraj Ghat",
    "Walk along the Mula River"
  ]
}

Do not include markdown.
Return JSON only.
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  return JSON.parse(
    response.choices[0].message.content
  );
};