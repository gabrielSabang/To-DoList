import Card from '../models/Card.js';

export const getCards = async (req, res) =>{
    try{
        const cards = await Card.find();
        if(!cards)
            return res.status(404).json({message: "No cards Found"});

        return res.status(200).json(cards);
    
    }catch(err){
        return res.status(500).json({message: "Server error"});
    }
}

export const addCard = async (req, res) => {
    const { title, description } = req.body;
    if(!title || !description) 
        return res.status(400).json({message: "Ttile and desc required"});
    
    try{
        const newCard = await Card.create({ title, description });
        return res.status(201).json(newCard);
    }catch(err){
        return res.status(500).json({message: "Server error"});
    }
}

export const delCard = async (req, res) => {
    const { id } = req.params;
    if( !id ) 
        return res.status(400).json({message: "Card ID not found"});
    
    try{
        const card = await Card.findByIdAndDelete(id);
        if(!card)
            return res.status(404).json({message: "Card not found"})
        return res.status(200).json({message: "Card delete successfully"});

    }catch(err){
        return res.status(500).json({message: "Server error"})
    }
}

export const updateCard = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try{
        const card = await Card.findByIdAndUpdate(id, { title, description }, { new: true });
        if(!card)
            return res.status(404).json({message: "Card not Found"});
        
        return res.status(200).json({message: "Card Updated successfully", card})
    }catch(err){
        return res.status(500).json({message: "Server error"})
    }
}