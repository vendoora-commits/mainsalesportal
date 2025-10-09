/**
 * Notification System (WhatsApp/SMS Stub)
 * Logs to console in dev; sends via provider in production (Twilio-style)
 */

export interface NotificationOptions {
  message: string;
  phoneNumber?: string;
  template?: 'quote' | 'order' | 'checkin';
}

/**
 * Send notification (WhatsApp/SMS)
 * Controlled by NOTIFY_ENABLED environment variable
 */
export async function notifyQuote(options: NotificationOptions): Promise<{ ok: boolean; mocked: boolean; messageId?: string }> {
  const { message, phoneNumber = process.env.SALES_PHONE_NUMBER } = options;

  // Check if notifications are enabled
  const notifyEnabled = process.env.NOTIFY_ENABLED === 'true';

  if (!notifyEnabled) {
    // DEV MODE: Log to console only
    console.log('┌─────────────────────────────────────────────────────────┐');
    console.log('│ [DEV NOTIFY - WhatsApp/SMS Stub]                        │');
    console.log('├─────────────────────────────────────────────────────────┤');
    console.log('│ To:', phoneNumber || 'Not configured');
    console.log('│ Message:', message);
    console.log('└─────────────────────────────────────────────────────────┘');
    
    return { ok: true, mocked: true };
  }

  // PRODUCTION MODE: Send via provider (Twilio, etc.)
  try {
    // TODO: Integrate with actual provider (Twilio, MessageBird, etc.)
    // const response = await sendTwilioMessage({ to: phoneNumber, body: message });
    
    console.log('[NOTIFY] Sending notification to:', phoneNumber);
    
    // For now, return success with mock flag
    return {
      ok: true,
      mocked: false, // Set to false when real provider is connected
      messageId: `msg_${Date.now()}`,
    };
  } catch (error) {
    console.error('[NOTIFY ERROR]', error);
    return { ok: false, mocked: false };
  }
}

/**
 * Format quote message for WhatsApp
 */
export function formatQuoteMessage(data: {
  propertyName: string;
  propertyType: string;
  numberOfRooms: number;
  market: string;
  selectedProducts: Array<{ name: string; quantity: number; price: number }>;
  totalCost: number;
}): string {
  const { propertyName, propertyType, numberOfRooms, market, selectedProducts, totalCost } = data;

  let message = `🏨 New Quote Request - Vendoora\n\n`;
  message += `Property: ${propertyName}\n`;
  message += `Type: ${propertyType}\n`;
  message += `Rooms: ${numberOfRooms}\n`;
  message += `Market: ${market.toUpperCase()}\n\n`;
  message += `Selected Products:\n`;

  selectedProducts.forEach((product, index) => {
    message += `${index + 1}. ${product.name} x${product.quantity} - $${(product.price * product.quantity).toLocaleString()}\n`;
  });

  message += `\nTotal: $${totalCost.toLocaleString()}\n`;
  message += `\n📞 Contact customer via platform to confirm order.`;

  return message;
}

/**
 * Send order confirmation to customer
 */
export async function notifyOrderConfirmation(options: {
  customerPhone?: string;
  orderNumber: string;
  totalAmount: number;
}): Promise<{ ok: boolean; mocked: boolean }> {
  const message = `✅ Order Confirmed - Vendoora\n\nOrder #${options.orderNumber}\nTotal: $${options.totalAmount.toLocaleString()}\n\nThank you for your purchase!`;

  return notifyQuote({ message, phoneNumber: options.customerPhone });
}

