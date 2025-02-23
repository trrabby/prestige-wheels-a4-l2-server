/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'sslcommerz-lts';

declare global {
  const app: express.Express;
  const store_id: string | undefined;
  const store_passwd: string | undefined;
  const is_live: boolean;
  const port: number;

  const data: {
    total_amount: number;
    currency: string;
    tran_id: string;
    success_url: string;
    fail_url: string;
    cancel_url: string;
    ipn_url: string;
    shipping_method: string;
    product_name: string;
    product_category: string;
    product_profile: string;
    cus_name: string;
    cus_email: string;
    cus_add1: string;
    cus_add2: string;
    cus_city: string;
    cus_state: string;
    cus_postcode: string;
    cus_country: string;
    cus_phone: string;
    cus_fax: string;
    ship_name: string;
    ship_add1: string;
    ship_add2: string;
    ship_city: string;
    ship_state: string;
    ship_postcode: string;
    ship_country: string;
  };

  const sslcz: SSLCommerzPayment;
  const initPayment: (req: Request, res: Response) => void;
  const validatePayment: (req: Request, res: Response) => void;
  const transactionQuery: (req: Request, res: Response) => void;
}

interface SSLCommerzPayment {
  init(data: any): Promise<any>;
  validate(data: { val_id: string }): Promise<any>;
  transactionQueryByTransactionId(data: { tran_id: string }): Promise<any>;
}
