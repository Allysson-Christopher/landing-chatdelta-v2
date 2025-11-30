/**
 * API Client para integração com backend FastAPI.
 */

export interface SubscriptionResponse {
  id: string;
  user_id: string;
  plan: string;
  status: 'pending' | 'active' | 'expired' | 'payment_failed' | 'cancelled';
  amount: number;
  currency: string;
  checkout_url: string | null;
  mercadopago_subscription_id: string | null;
  mercadopago_preference_id: string | null;
  start_date: string | null;
  expires_at: string | null;
  next_billing_date: string | null;
  auto_renew: boolean;
  created_at: string;
  updated_at: string;
}

export interface APIError {
  detail: string | { msg: string; type: string }[];
}

/**
 * Custom error para erros da API.
 */
export class APIRequestError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(
    message: string,
    statusCode: number,
    details?: unknown
  ) {
    super(message);
    this.name = 'APIRequestError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

const API_URL = typeof window !== 'undefined' 
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000')
  : 'http://localhost:8000';

/**
 * Busca uma assinatura existente por ID.
 */
export async function getSubscription(
  subscriptionId: string
): Promise<SubscriptionResponse> {
  try {
    const response = await fetch(`${API_URL}/api/subscriptions/${subscriptionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: APIError = await response.json();
      const errorMessage =
        typeof error.detail === 'string'
          ? error.detail
          : 'Erro ao buscar assinatura';

      throw new APIRequestError(errorMessage, response.status, error);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIRequestError) {
      throw error;
    }

    // Erro de rede ou parsing
    throw new APIRequestError(
      'Erro ao conectar com o servidor. Verifique sua conexão.',
      0,
      error
    );
  }
}
