const createTablesQueries = `
-- to generate UUID
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS blocks (
  height BIGINT PRIMARY KEY,
  hash TEXT UNIQUE NOT NULL,                   
  proposer_address TEXT NOT NULL,
  time TIMESTAMPTZ NOT NULL,
  chain_id TEXT NOT NULL,
  tx_count INT NOT NULL,
  total_gas_used BIGINT,
  total_gas_wanted BIGINT
);

CREATE TABLE IF NOT EXISTS transactions (
  tx_hash TEXT PRIMARY KEY,
  height BIGINT REFERENCES blocks(height) ON DELETE CASCADE,
  index_in_block INT NOT NULL,
  type TEXT NOT NULL,
  sender TEXT,
  recipient TEXT,
  contract_address TEXT,
  amount TEXT,
  fee TEXT,
  gas_used BIGINT,
  gas_wanted BIGINT,
  success BOOLEAN NOT NULL DEFAULT true,
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
