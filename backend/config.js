const dotenv = require("dotenv");
const Joi = require("joi");
const path = require("path");

dotenv.config();

const envSchema = Joi.object({
  PORT: Joi.number().default(3000),

  CORS_ORIGIN: Joi.string().uri().required(),

  SMTP_HOST: Joi.string().hostname().required(),
  SMTP_PORT: Joi.number().port().required(),
  SMTP_USER: Joi.string().required(),
  SMTP_PASS: Joi.string().required(),
  FROM_EMAIL: Joi.string().email().required(),
}).unknown();

const { error, value: validatedEnv } = envSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  throw new Error(
    `❌ Environment configuration error:\n${error.details
      .map((d) => d.message)
      .join("\n")}`,
  );
}

const config = Object.freeze({
  PORT: validatedEnv.PORT,
  CORS_ORIGIN: validatedEnv.CORS_ORIGIN,
  SMTP_HOST: validatedEnv.SMTP_HOST,
  SMTP_PORT: validatedEnv.SMTP_PORT,
  SMTP_USER: validatedEnv.SMTP_USER,
  SMTP_PASS: validatedEnv.SMTP_PASS,
  FROM_EMAIL: validatedEnv.FROM_EMAIL,
});

module.exports = config;
