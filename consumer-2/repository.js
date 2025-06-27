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
