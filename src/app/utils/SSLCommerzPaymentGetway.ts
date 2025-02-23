/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import SSLCommerzPayment from 'sslcommerz-lts';

const store_id: string | undefined = process.env.STORE_ID;
const store_passwd: string | undefined = process.env.STORE_PASSWD;
const is_live: boolean = process.env.IS_LIVE === 'true';

if (!store_id || !store_passwd) {
  throw new Error(
    'SSLCommerz store credentials are not set in environment variables',
  );
}

const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

const initPayment = (req: Request, res: Response) => {
  const data = req.body;
  data.tran_id = `REF${Date.now()}`; // Generate a unique transaction ID
  sslcz
    .init(data)
    .then((apiResponse: any) => {
      res.json({ url: apiResponse.GatewayPageURL });
    })
    .catch((error: any) => {
      res
        .status(500)
        .json({ error: 'Payment initialization failed', details: error });
    });
};

const validatePayment = (req: Request, res: Response) => {
  const { val_id } = req.body;

  sslcz
    .validate({ val_id })
    .then((response: any) => {
      res.json(response);
    })
    .catch((error: any) => {
      res
        .status(500)
        .json({ error: 'Payment validation failed', details: error });
    });
};

const transactionQuery = (req: Request, res: Response) => {
  const { tran_id } = req.body;

  sslcz
    .transactionQueryByTransactionId({ tran_id })
    .then((response: any) => {
      res.json(response);
    })
    .catch((error: any) => {
      res
        .status(500)
        .json({ error: 'Transaction query failed', details: error });
    });
};

export const SSLUtils = { initPayment, validatePayment, transactionQuery };
