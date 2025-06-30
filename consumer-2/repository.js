import { parseRawTx } from "../utils/functions.js";

export const saveBlock = async (pool, blockInfo) => {
  const query = `
    INSERT INTO blocks (
     height,hash,chain_id,tx_count,timestamp
    )
    VALUES ($1,$2,$3,$4,$5)
    ON CONFLICT (height) DO NOTHING;
  `;
  await pool.query(query, blockInfo);
};

export const saveTxs = async (pool, blockData, txs) => {
  for (const tx of txs) {
    const parsedTx = await parseRawTx(tx, true);
    const hash = res.data.result.block_id.hash + "_" + newTxs.length; // pseudo hash to ensure uniqueness
    const query = `
    INSERT INTO txs (hash, height, raw_tx, time, parsed_tx)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (hash) DO NOTHING
  `;
    const txInfo = [
      hash,
      blockData[0],
      tx,
      blockData[4],
      JSON.stringify(parsedTx),
    ];
    await pool.query(query, txInfo);
  }
};
