import { Router } from "express";
import {
    getAllEnvelopes,
    createNewEnvelope,
    deleteById,
    updateEnvelopeById,
    createTransferTransaction,
} from "../controllers/envelopeController.js";

const envelopeRouter = Router();

// Default envelope router
envelopeRouter.get("/", getAllEnvelopes);

// Post route to default envelope route
envelopeRouter.post("/", createNewEnvelope);

// Make a transfer between envelopes
envelopeRouter.post("/transfer", createTransferTransaction);

// Post route for specific envelope by ID, updating the whole envelope
envelopeRouter.post("/:id", updateEnvelopeById);

// Remove route for removing a specific envelope id
envelopeRouter.delete(":id", deleteById);

export default envelopeRouter;
