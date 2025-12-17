import { assertEquals } from "jsr:@std/assert";
import { exchange } from "../src/exchangeCards.js";

Deno.test("simple test", () => {
  const hand = ["L", "S", "CL", "D", "R", "CA", "CA"];
  const market = ["CA", "D", "R", "R", "CA"];
  assertEquals(exchange(hand, market), {
    hand: ["L", "S", "CL", "D", "R", "R", "R"],
    market: ["CA", "D", "CA", "CA", "CA"],
  });
});
