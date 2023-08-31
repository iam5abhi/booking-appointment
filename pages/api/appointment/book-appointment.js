// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getXataClient } from "../../../src/xata";
const xata = getXataClient();

const handler = async (req, res) => {
  const data = await xata.db.appointment.create(req.body);
  res.send(data);
};

export default handler;
