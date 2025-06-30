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
    const query = `
    INSERT INTO txs (hash, height, raw_tx, time)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (hash) DO NOTHING
  `;
    const txInfo = [blockData[1], blockData[0], tx, blockData[4]];

    await pool.query(query, txInfo);
  }
};
