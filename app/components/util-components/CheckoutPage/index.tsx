import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isReady, setIsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>(
    "pi_3RA1SdSFABbG4PeF19kUKruI_secret_NEdSvbylY3rKVBB1smcfpo3f6"
  );
  const [loading, setLoading] = useState(false);

  const onGo = async () => {};

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 1000);
  }, []);

  if (!isReady) {
    return <h1>asdasd</h1>;
  }
  return (
    <div>
      {clientSecret && <PaymentElement />}

      <button onClick={() => onGo()}>GO</button>
    </div>
  );
};

export default CheckoutPage;
