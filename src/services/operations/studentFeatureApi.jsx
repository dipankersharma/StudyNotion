import { apiconnector } from "../apiConnector";
import { studentEndpoint } from "../apis";
// import rzplogo from "../../assets/Logo/rzp_logo.png";
// import { setPaymentLoading } from "../../slices/courseSlice";
// import { resetCart } from "../../slices/cartSlice";

import toast from "react-hot-toast";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFICATION_API,
  COURSE_SUCCESS_EMAIL_API,
} = studentEndpoint;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export const buyCourse = async (
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) => {
  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      console.error("Failed to load Razorpay SDK");
      return;
    }

    // capture payment
    const orderResponse = await apiconnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse.data.success) {
      console.error("Error in creating order:", orderResponse.data.message);
      throw new Error(orderResponse.data.message);
    }
    const options = {
      key: "rzp_test_f6316qipgEKRaZ",
      currency: orderResponse?.data?.currency,
      amount: orderResponse?.data?.amount,
      order_id: orderResponse?.data?.orderId,
      name: "StudyNotion",
      description: "Thank you for purchasing the course",
      // image: rzplogo,
      prefill: {
        name: userDetails?.firstName,
        email: userDetails?.email,
      },
      handler: function (response) {
        // send success mail to student
        sendSuccessEmail(response, orderResponse?.data?.amount, token);

        // verify payment
        verifypayment({ ...response, courses }, token, navigate, dispatch);
      },
    };
    //miss hogya tha
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("oops, payment failed");
      console.log(response.error);
    });
  } catch (error) {
    console.error("Error in buyCourse:", error);
    throw new Error("Failed to initiate course purchase");
  }
};

async function sendSuccessEmail(response, amount, token) {
  try {
    const emailResponse = await apiconnector(
      "POST",
      COURSE_SUCCESS_EMAIL_API,
      {
        orderId: response?.razorpay_order_id,
        paymentId: response?.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!emailResponse.data.success) {
      console.error(
        "Error in sending success email:",
        emailResponse.data.message
      );
    }
  } catch (error) {
    console.error("Error in sendPaymentSuccessEmail:", error);
  }
}

async function verifypayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying payment...");
  // dispatch(setPaymentLoading(true));

  try {
    const res = await apiconnector("POST", COURSE_VERIFICATION_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!res) {
      throw new Error(res.data.message);
    }
    toast.success("Payment verified successfully");
    navigate("/dashboard/enrolled-courses");
    // dispatch(resetCart());
  } catch (error) {
    console.error("Error in verifying payment:", error);
    toast.error("Payment verification failed");
  }
  toast.dismiss(toastId);
  // dispatch(setPaymentLoading(false));
}
