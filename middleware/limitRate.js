import rateLimit from "express-rate-limit";

const limitRate = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes in milliseconds
    max: 25, // Limit each IP to 100 requests per windowMs
    message: "Rate limit exceeded, please try again after 30 minutes",
    standardHeaders: true, // Send standard rate limit headers
    legacyHeaders: false,
});

export default limitRate;
