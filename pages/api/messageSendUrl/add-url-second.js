import { getXataClient } from "../../../src/xata";
const xata = getXataClient();

const handler = async (req, res) => {
  const data = await xata.db.secondUrl.create(req.body);
  res.send(data);
};

export default handler;
