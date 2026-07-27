import database from "infra/database";

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public");
}
beforeAll(cleanDatabase);

test("DELETE to /api/v1/migrations should return 405", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "DELETE",
  });
  expect(response1.status).toBe(405);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "DELETE",
  });
  expect(response2.status).toBe(405);

  const response3 = await fetch("http://localhost:3000/api/v1/status", {
    method: "POST",
  });
  expect(response3.status).toBe(200);
  const responseBody3 = await response3.json();
  console.log(responseBody3);
  expect(
    responseBody3.dependencies.postgres.current_connections,
  ).toBeGreaterThan(1);
});
