import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const MemberShip = () => {
    return (
        <div>
            MemberShip
            <div>
            <Elements stripe={stripePromise}>
        <CheckoutForm></CheckoutForm>
            </Elements>
            </div>
        </div>
    );
};

export default MemberShip;