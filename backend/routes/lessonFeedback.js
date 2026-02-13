const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // Initialise client with my private API key
});

// Calls OpenAI API for feedback using POST HTTP method
router.post('/', async (req, res) => {
    try{
        const {lessonPlan} = req.body; // Takes lessonplan from request body

        if (!lessonPlan || lessonPlan.trim() === 0) { // Checking text input
            return res.status(400).json({
                error: 'You must input lesson plan text'
            });
        }

        if (!process.env.OPENAI_API_KEY){ // Checking API key
            return res.status(500).json({
                error: 'You must configure and set your OpenAI API key'
            });
        }

        // Actually using the model now
        const completeResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system",
                content: `You are an expert EFL teacher with over a decade of experience. You are giving detailed feedback on a lesson plan. 
                            Focus on objectives, following TEFL methodologies (specifically PPP & TTT). 
                            Give areas for improvement and strengths to be built on. 
                            Keep feedback encouraging but also concise.`
            },
            {
                role: "user",
                content: `This is the lesson plan: ${lessonPlan}`
            }
        ],
        temperature: 0.7,
        max_tokens: 500,
        });

        const feedback = completeResponse.choices[0].message.content; // Takes the feedback?

        res.json({ feedback });
    } catch (error) {
        console.error('Error generating feedback:', error);

        if(error.code === 'invalid_api_key') {
            return res.status(401).json({
                error: 'Invalid API key. Check your settins please.'
            });
        }

        if (error.code === 'insufficient_quota') {
            return res.status(403).json({
                error: 'API quota has been exceeded. Check your account for usage details.'
            });
        }
            res.status(500).json({
                error: 'An error occurred. Please try again later.'
            });
        }
    });

    module.exports = router;