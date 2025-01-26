import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
    const stripe = useStripe();
  const elements = useElements();
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
    //   setError(error?.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    //   setError(" ");
    }
    // //confirm payment
    // const { paymentIntent, error: confirmError } =
    //   await stripe.confirmCardPayment(clientSecret, {
    //     payment_method: {
    //       card: card,
    //       billing_details: {
    //         name: user?.displayName || "anonymous",
    //         email: user?.email || "anonymous",
    //       },
    //     },
    //   });
    // if (confirmError) {
    //   console.log("confirm Error");
    // } else {
    //   console.log("payment intent", paymentIntent);
    //   if (paymentIntent.status == "succeeded") {
    //     setId(paymentIntent.id);

    //     //save the payment in database
    //     const payment = {
    //       email: user.email,
    //       price: totalPrice,
    //       transactionId: paymentIntent.id,
    //       date: new Date(), //utc date convert. use moment js to
    //       cartIds: cart.map((item) => item._id),
    //       menuItemIds: cart.map((item) => item.menuId),
    //       status: "pending",
    //     };
    //     const res = await axiosSecure.post(`/payments`, payment);
    //     console.log(res.data);
    //     if (res.data?.paymentResult?.insertedId) {
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "success",
    //         title: "Your work has been saved",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       navigate("/dashboard/paymentHistory");
    //     }
    //     refetch();
    //   }
    // }
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
