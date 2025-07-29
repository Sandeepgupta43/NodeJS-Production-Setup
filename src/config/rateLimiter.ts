import { RateLimiterMemory } from 'rate-limiter-flexible'

// Create memory-based rate limiter
export const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'middleware',
  points: 10, // 10 requests
  duration: 60, // per 60 seconds per IP
})


