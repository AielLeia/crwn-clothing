import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  FormContainer,
  PaymentButton,
  PaymentFormContainer,
} from './payment-form.styles.jsx';

import { selectCartTotal } from '../../store/cart/cart.selector.js';
import { selectCurrentUser } from '../../store/user/user.selector.js';
import { BUTTON_TYPE_CLASSES } from '../button/button.types.js';

const PaymentForm = () => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payement-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const clientSecret = response.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(JSON.stringify(paymentResult.error));
    }
  };

  return (
    <PaymentFormContainer>
      <h2>Credit card payment : </h2>
      <FormContainer onSubmit={paymentHandler}>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export { PaymentForm };
