import { loadStripe } from '@stripe/stripe-js';

import { STRIPE_PUBLISHABLE_KEY } from '../env-loader/env.util';

export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
