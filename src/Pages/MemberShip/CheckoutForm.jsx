import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();
  const {user} = useAuth()
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      
    } else {
      console.log("[PaymentMethod]", paymentMethod);
     
    }
    if(paymentMethod){
      const {data} = await axiosPublic.patch(`/gold/${user?.email}`);
      Swal.fire({
        position: "top-end",
        icon: "Payment success",
        title: "Your are now Gold Member",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/dashboard')
      
     
    }
    
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn bg-orange-600 btn-sm"
          type="submit"
          //   disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        {/* <p className="text-red-600">{error}</p> */}
        {/* {id && <p className="text-green-600">your transaction id : {id}</p>} */}
      </form>
    </div>
  );
};

export default CheckoutForm;
