test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();
  console.log(responseBody);

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.postgres.version).toBeDefined();
  expect(responseBody.dependencies.postgres.version).toBe("16.0");

  expect(responseBody.dependencies.postgres.current_connections).toBeDefined();
  expect(responseBody.dependencies.postgres.current_connections).toBe(1);

  expect(responseBody.dependencies.postgres.max_connections).toBeDefined();
  expect(responseBody.dependencies.postgres.max_connections).toBe(100);
});
