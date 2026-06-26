const request = require("supertest");
const express = require("express");
const rateLimit = require("express-rate-limit");

describe("Rate Limiting", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    // Create a limiter with very low threshold just for this test
    const testLimiter = rateLimit({
      windowMs: 60 * 1000, // 1 minute
      max: 2, // only 2 requests allowed
      message: {
        status: "error",
        message: "Too many requests. Please try again later.",
      },
      standardHeaders: true,
      legacyHeaders: false,
    });

    app.post("/test", testLimiter, (req, res) => {
      res.status(200).json({ status: "ok" });
    });
  });

  it("should allow requests under the limit", async () => {
    const res1 = await request(app).post("/test").send({});
    const res2 = await request(app).post("/test").send({});

    expect(res1.statusCode).toBe(200);
    expect(res2.statusCode).toBe(200);
  });

  it("should return 429 when rate limit is exceeded", async () => {
    // Send 3 requests — first 2 succeed, 3rd should be blocked
    await request(app).post("/test").send({});
    await request(app).post("/test").send({});

    const res = await request(app).post("/test").send({});

    expect(res.statusCode).toBe(429);
    expect(res.body.message).toContain("Too many requests");
  });
});
