import Groq from "groq-sdk"; // Import the Groq SDK

// Initialize Groq with your API key
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to generate a combined element
export const generateCombinedElement = async (element1, element2) => {
    const prompt = `
        You are supposed to act as the alchemy game, where combining two words generates a new word related to that word.
        Combine ${element1} and ${element2} to create a new element. 
        Your response should ONLY include the JSON format: {'name': 'name', 'emoji': 'emoji'}.
        Do not include any additional text or explanations. 
        Ensure the name is a single word if possible, if the new word cannot be understood in simple word, use multiple words.
        and include exactly one emoji in double quotes.
        Example: Fire + Water = {name: 'Steam', emoji: '💨'}
        Never use double quote.
        The generated word must be generated from common sense. and generate only those words that the general population can understand and relate to.
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
            model: "llama3-8b-8192", // Use the specified LLaMA3 model
        });

        // Parse the returned content
        const resultText = chatCompletion.choices[0]?.message?.content.trim();
        // Assuming the result is in the required JSON format
        const result = JSON.parse(resultText);

        return {
            combinedName: result.name,
            combinedEmoji: result.emoji,
        };
    } catch (error) {
        console.error("Error generating combined element:", error);
        throw new Error("Failed to generate combined element");
    }
};
