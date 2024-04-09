import { expect, test, beforeAll } from "vitest";
import createLogger, { Logger } from "../src/main";

let logger: Logger | null = null;

beforeAll(async () => {
  logger = await createLogger({
    logToConsole: true,
    logToServer: true,
    serverEndpoint: "amqp://localhost:5672",
    secret: "secret",
  });
});

test("logger should be defined", () => {
  expect(logger).toBeDefined();
});

test("send log to server", async () => {
  await logger!.info({message: "this is a test log"})
});
