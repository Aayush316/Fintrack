const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

exports.savingsPlanRoute= async (req, res) => {
    const {
        income,
        expenses,
        goals,
        currentSavings,
        investments,
        debt,
        riskProfile,
        age,
        dependents,
        savingsRatio,
    } = req.body;

    // Construct the prompt for the Gemini LLM
    const prompt = `
    The customer has a monthly income of ${income}, monthly expenses of ${expenses}, and has the following goals: ${goals}. 
    They currently have ${currentSavings} in savings and ${investments} in investments. 
    They are ${age} years old, with ${dependents} dependents. 
    The customer has ${debt} in debt and prefers to save ${savingsRatio}% of their income. 
    The customer's risk profile is ${riskProfile}. 
    Based on this information, please generate a personalized savings plan.
    `;

    try {
        // Generate content using the Gemini model
        const result = await model.generateContent(prompt);
        const savingsPlan = result.response.text();
        res.json({ savingsPlan });
    } catch (error) {
        console.error('Error generating savings plan', error);
        res.status(500).json({ message: 'Error generating savings plan', error: error.message });
    }
};
