import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const MemberShip = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-700">
          Upgrade to unlock unlimited posts and exclusive features!
        </p>
        <h1 className="text-4xl font-bold text-gold-600 mt-2">
          Become a Gold Member
        </h1>
      </div>

      <div className="mt-6">
        <div className="p-6 bg-gray-50 rounded-lg shadow-inner border border-gray-300">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>

      <div className="mt-4 text-center text-gray-500">
        <p className="text-sm">
          Secure payments are processed via Stripe. Your data is protected.
        </p>
      </div>
    </div>
  );
};

export default MemberShip;
