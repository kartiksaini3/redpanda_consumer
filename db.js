const createTablesQueries = `
-- to generate UUID
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS blocks (
  height BIGINT PRIMARY KEY,
  hash TEXT UNIQUE NOT NULL,                   
  chain_id TEXT NOT NULL,
  tx_count INT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL
);
`;

export const createTables = async (pool) => {
  try {
    await pool.query(createTablesQueries);
    console.log("Tables created");
  } catch (err) {
    console.error("Error creating tables : ", err);
  }
};
