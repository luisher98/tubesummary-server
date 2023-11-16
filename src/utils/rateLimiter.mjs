import rateLimit from 'express-rate-limit';

export default function createRateLimiter(maxRequests, windowInMinutes) {
  return rateLimit({
    windowMs: windowInMinutes * 60 * 1000, // Convert minutes to milliseconds
    max: maxRequests, // Max number of requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // You can also add a handler here to customize the response when the rate limit is exceeded.
  });
}
