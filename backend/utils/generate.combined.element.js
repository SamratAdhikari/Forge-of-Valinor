import Groq from "groq-sdk";

// Initialize Groq with the API key
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to generate a combined element
export const generateCombinedElement = async (element1, element2) => {
    const prompt = `
        You are supposed to act as an alchemy game, where combining two words generates a new word that logically relates to the combination of those words.
        Combine ${element1} and ${element2} to create a new element. Your response should ONLY include the JSON format: {name: 'name', emoji: 'emoji'}.
        
        Rules:
        - Ensure the name is a single word if possible. If the new word cannot be easily understood, use multiple simple words.
        - Include exactly one emoji in double quotes.
        - The new element should be clear, concise, and related to the combination. It should be a noun.
        - Avoid overly complex or obscure combinations. The generated word should make sense based on common knowledge or real-world associations.
        - For example: Fire + Water = {name: 'Steam', emoji: '💨'} or Earth + Water = {name: 'Mud', emoji: '🌧️'}.
        
        The generated word must come from common sense and be something the general population can understand and relate to. 
    `;

    try {
        // Get chat completion from Groq
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: prompt,
                },
            ],
            model: "llama3-8b-8192",
        });

        // Parse the returned content
        let resultText = chatCompletion.choices[0]?.message?.content.trim();

        const result = JSON.parse(resultText);

        console.log(resultText);

        return {
            combinedName: result.name,
            combinedEmoji: result.emoji,
        };
    } catch (error) {
        console.error("Error generating combined element:", error);
        throw new Error("Please try combining again");
    }
};
