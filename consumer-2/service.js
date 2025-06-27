import { saveBlock } from "./repository.js";

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
  return await saveBlock(pool, blockData);
};
