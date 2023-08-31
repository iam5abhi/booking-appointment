import { getXataClient } from '../../../src/xata';
const xata = getXataClient();

const handler = async (req, res) => {

  const results = await xata.db.homePage.getAll();
  res.send(results);
};

export default handler;