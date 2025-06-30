import { saveBlock, saveTxs } from "./repository.js";

export const addBlockInfo = async (pool, data) => {
  const blockResultdata = data?.result;
  const blockHeaderData = data?.result?.block?.header;
  const blockData = [
    +blockHeaderData?.height,
    blockResultdata?.block_id?.hash,
    blockHeaderData?.chain_id,
    blockResultdata?.block?.data?.txs?.length,
    blockHeaderData?.time,
  ];
  if (!blockData[3]) return await saveBlock(pool, blockData);
  return (
    await Promise.allSettled([
      saveBlock(pool, blockData),
      saveTxs(pool, blockData, blockResultdata?.block?.data?.txs),
    ])
  )
    .filter(({ status }) => status === "fulfilled")
    .map(({ value }) => value);
};
