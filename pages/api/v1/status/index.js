import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseName = process.env.POSTGRES_DB;
  const postgresQuery = "SHOW server_version;";
  const maxConnectionsQuery =
    "SELECT setting as max_connections FROM pg_settings WHERE name = 'max_connections';";
  const currentConnectionsQuery = {
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  };
  const version = (await database.query(postgresQuery)).rows[0].server_version;

  const currentConnectionsResult = await database.query(
    currentConnectionsQuery,
  );
  const currentConnectionsValue = currentConnectionsResult.rows[0].count;

  const max_connections = (await database.query(maxConnectionsQuery)).rows[0]
    .max_connections;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      postgres: {
        version: version,
        max_connections: parseInt(max_connections),
        current_connections: currentConnectionsValue,
      },
    },
  });
}

export default status;
