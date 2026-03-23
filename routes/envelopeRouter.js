import { Router } from "express";
import {
    getAllEnvelopes,
    createNewEnvelope,
    deleteById,
    updateEnvelopeById,
    createTransferTransaction,
} from "../controllers/envelopeController.js";
import { body, validationResult } from "express-validator";

const envelopeRouter = Router();

const validateEnvelope = [
    body("title").trim().isLength({ min: 1, max: 100 }).escape(),
    body("budget").isNumeric().toFloat().isFloat({ min: 0 }),
];

const validateTransfer = [
    body("title").trim().isLength({ min: 1, max: 100 }).escape(),
    body("amount").isNumeric().toFloat().isFloat({ min: 0.01 }),
    body("withdrawId").isMongoId(),
    body("transferId").isMongoId(),
];

// Default envelope router
envelopeRouter.get("/", getAllEnvelopes);

// Post route to default envelope route
envelopeRouter.post("/", validateEnvelope, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    createNewEnvelope(req, res, next);
});

// Make a transfer between envelopes
envelopeRouter.post("/transfer", validateTransfer, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    createTransferTransaction(req, res, next);
});

// Post route for specific envelope by ID, updating the whole envelope
envelopeRouter.post("/:id", updateEnvelopeById);

// Remove route for removing a specific envelope id
envelopeRouter.delete("/:id", deleteById);

export default envelopeRouter;
