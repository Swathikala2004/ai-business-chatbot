import {
  StandardCheckoutClient,
  Env,
  StandardCheckoutPayRequest
} from "@phonepe-pg/pg-sdk-node";

const client = StandardCheckoutClient.getInstance(
  process.env.PHONEPE_CLIENT_ID,
  process.env.PHONEPE_CLIENT_SECRET,
  Number(process.env.PHONEPE_CLIENT_VERSION || 1),
  process.env.PHONEPE_ENV === "PRODUCTION" ? Env.PRODUCTION : Env.SANDBOX
);

export const createPayment = async (req, res) => {
  try {
    const { amount, plan } = req.body;

    const merchantOrderId = `ORDER_${Date.now()}`;

    const redirectUrl =
      `${process.env.FRONTEND_URL}/plans?orderId=${merchantOrderId}&plan=${plan}`;

    const request = StandardCheckoutPayRequest.build_request(
      merchantOrderId,
      amount,
      redirectUrl
    );

    const response = await client.pay(request);

    res.json({
      success: true,
      checkoutUrl: response.redirectUrl,
      merchantOrderId
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const checkPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    const response = await client.getOrderStatus(orderId);

    res.json({
      success: true,
      status: response.state,
      data: response
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};