import { getXataClient } from '../../../src/xata';
const xata = getXataClient();

const handler = async (req, res) => {
  const results = await xata.db.appointment.getMany();
  // results.sort((a, b) => b.xata.createdAt - a.xata.createdAt);
  res.send(results);
};

export default handler;