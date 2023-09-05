import { getXataClient } from '../../../src/xata';
const xata = getXataClient();

const handler = async (req, res) => {
  const results = await xata.db.secondUrl.getMany();
  res.send(results);
};

export default handler;