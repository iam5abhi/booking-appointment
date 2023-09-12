import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useEffect, useState } from "react";
import { userAuth } from "../../components/firebase/UserFirebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

const App = () => {
  const router = useRouter()
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, loadings] = useAuthState(userAuth);

  function onCaptchVerify() {
    if (typeof window !== "undefined" && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(userAuth, 'recaptcha-container', {size: "invisible",});
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = typeof window !== "undefined" ? window.recaptchaVerifier : null;

    if (appVerifier) {
      const formatPh = "+91" + ph;

      signInWithPhoneNumber(userAuth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          toast.success("OTP sent successfully!");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }

  function onOTPVerify() {
    setLoading(true);
    if (typeof window !== "undefined") {
      window.confirmationResult
        .confirm(otp)
        .then(async (res) => {
          router.push('/')
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    if (loadings) {
      // maybe trigger a loadings screen
      return;
    }
    if (user) router.push('/');
  }, [user, loading]);

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (<></>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <input value={otp} maxLength={6} onChange={(event)=>setOtp(event.target.value)} />
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-white text-center"
                >
                  Verify your phone number
                </label>
                {/* <PhoneInput country={"in"} value={ph} onChange={setPh} /> */}
                <input value={ph} onChange={(event)=>setPh(event.target.value)} />
                <button
                  onClick={onSignup}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default App;
