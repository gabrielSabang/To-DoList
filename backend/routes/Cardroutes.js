import express from "express";
import { getCards, addCard, delCard, updateCard }  from "../controller/todoController.js";
const route = express.Router();


route.get("/cardList", getCards);
route.post("/createCard", addCard);
route.delete("/delCard/:id", delCard);
route.put("/updateCard/:id", updateCard);


export default route;