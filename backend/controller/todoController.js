import Card from '../models/Card.js';

export const getCards = async (req, res) => {
    try {
        const cards = await Card.find();
        return res.status(200).json(cards);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const addCard = async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Text is required' });

    try {
        const newCard = await Card.create({ text });
        return res.status(201).json(newCard);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const delCard = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Card ID not found' });

    try {
        const card = await Card.findByIdAndDelete(id);
        if (!card) return res.status(404).json({ message: 'Card not found' });
        return res.status(200).json({ message: 'Card deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const updateCard = async (req, res) => {
    const { id } = req.params;
    const { text, completed } = req.body;

    try {
        const updates = {};
        if (typeof text === 'string') updates.text = text;
        if (typeof completed === 'boolean') updates.completed = completed;

        const card = await Card.findByIdAndUpdate(id, updates, { new: true });
        if (!card) return res.status(404).json({ message: 'Card not found' });

        return res.status(200).json({ message: 'Card updated successfully', card });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}