import { useState } from "react";
import { Icons } from "../../svg/Icons";
import { validateEmail } from "../dashboardComponents/stateController/validators";
import FormController from "../dashboardComponents/FormHandeller/FormHandeller";
import checkPasswordStrength from "../helpers/checkPasswordStrength";

const ResetPassword = ({ toggleProcessingWindow }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passStrength, setPassStrength] = useState(0);

  const defaultDisablity = {
    email: false,
    code: true,
    newPass: true,
    confPass: true,
    passStrength: true,
    btn: true,
  };

  const defaultData = {
    email: "",
    otp: "",
    newPassword: "",
    confirmPass: "",
  };

  const [disabled, setDisabled] = useState(defaultDisablity);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [resetFormData, setResetFormData] = useState(defaultData);

  const form1 = new FormController(
    resetFormData,
    setResetFormData,
    defaultData,
  );

  function changeHandeller(e) {
    console.log(disabled);

    const tempvalue = e.target.value;
    const name = e.target.name;

    switch (name) {
      case "email":
        setDisableSubmit(!validateEmail(tempvalue));
        break;

      case "otp":
        setDisableSubmit(tempvalue.length !== 6);
        break;

      case "newPassword":
        const percent = checkPasswordStrength(tempvalue);

        setPassStrength(percent);

        if (percent >= 60 && resetFormData.confirmPass === tempvalue) {
          setDisableSubmit(false);
        } else {
          setDisableSubmit(true);
        }

        break;

      case "confirmPass":
        if (
          tempvalue === resetFormData.newPassword &&
          resetFormData.newPassword.length >= 6
        ) {
          setDisableSubmit(false);
        } else {
          setDisableSubmit(true);
        }

        break;

      default:
        break;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    toggleProcessingWindow(true);
    // SEND OTP
    if (!disableSubmit && disabled.code && disabled.btn) {
      const res = await form1.sendOTP();
      toggleProcessingWindow(false);
      if (!res) return;

      setDisabled({
        ...disabled,
        email: true,
        code: false,
      });

      setDisableSubmit(true);
      return;
    }

    // VERIFY OTP
    if (!disableSubmit && disabled.email && disabled.btn) {
      const res = await form1.verifyOTP();
      toggleProcessingWindow(false);
      if (!res) return;

      setDisabled({
        ...disabled,
        code: true,
        newPass: false,
        confPass: false,
        passStrength: false,
        btn: false,
      });

      setDisableSubmit(true);
      return;
    }

    // CHANGE PASSWORD
    if (!disabled.btn && !disableSubmit) {
      const res = await form1.handelPassChangeSubmit();
      toggleProcessingWindow(false)
      if (!res) return;

      setResetFormData(defaultData);
      setDisabled(defaultDisablity);
      setDisableSubmit(true);
      setPassStrength(0);
      // toggleProcessingWindow();
      return;
    }


  }

  return (
    <>
      <div
        className="
          w-full
          max-w-[520px]
          mx-auto
          rounded-[32px]
          bg-white/[0.03]
          backdrop-blur-md
          overflow-hidden
          mt-5 md:mt-16
          h-fit
        "
      >
        {/* HEADER */}
        <div
          className="
            px-6
            md:px-8
            py-6
            border-b
            border-white/10
          "
        >
          <div
            className="
              w-16
              h-16
              rounded-3xl
              bg-gradient-to-br
              from-pink-500
              to-purple-600
              flex
              items-center
              justify-center
              shadow-[0_10px_40px_rgba(192,108,191,0.35)]
              mb-5
            "
          >
            <Icons icon="lock" color="white" scale={1.3} />
          </div>

          <h2
            className="
              text-3xl
              font-bold
              bg-gradient-to-r
              from-white
              via-pink-200
              to-purple-300
              bg-clip-text
              text-transparent
            "
          >
            Reset Password
          </h2>

          <p
            className="
              text-white/40
              text-sm
              mt-3
              leading-relaxed
            "
          >
            Create a strong new password for your StudioX dashboard account.
          </p>
        </div>

        {/* FORM */}
        <form
          className="
            px-6
            md:px-8
            py-7
            flex
            flex-col
            gap-5
          "
          onSubmit={handleSubmit}
        >
          {/* EMAIL */}
          {!disabled.email && (
            <div>
              <label
                className="
                  text-sm
                  text-white/60
                  mb-2
                  block
                "
              >
                Email Address
              </label>

              <div
                className="
                  h-[58px]
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-4
                  flex
                  items-center
                  gap-3
                "
              >
                <Icons icon="mail" color="white" scale={1} />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="
                    bg-transparent
                    outline-none
                    text-white
                    placeholder:text-white/25
                    w-full
                  "
                  value={resetFormData.email}
                  onChange={(e) => {
                    form1.handleChange(e);
                    changeHandeller(e);
                  }}
                />
              </div>
            </div>
          )}

          {/* OTP */}
          {!disabled.code && (
            <div>
              <label
                className="
                  text-sm
                  text-white/60
                  mb-2
                  block
                "
              >
                Six Digits Verification Code
              </label>

              <div
                className="
                  h-[58px]
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-4
                  flex
                  items-center
                  gap-3
                "
              >
                <Icons icon="mail" color="white" scale={1} />

                <input
                  type="tel"
                  name="otp"
                  placeholder="Enter 6 digits otp"
                  className="
                    bg-transparent
                    outline-none
                    text-white
                    placeholder:text-white/25
                    w-full
                  "
                  value={resetFormData.otp}
                  onChange={(e) => {
                    form1.handleChange(e);
                    changeHandeller(e);
                  }}
                />
              </div>
            </div>
          )}

          {/* NEW PASSWORD */}
          {!disabled.newPass && (
            <div>
              <label
                className="
                  text-sm
                  text-white/60
                  mb-2
                  block
                "
              >
                New Password
              </label>

              <div
                className="
                  h-[58px]
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-4
                  flex
                  items-center
                  gap-3
                "
              >
                <Icons icon="lock" color="white" scale={1} />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="
                    bg-transparent
                    outline-none
                    text-white
                    placeholder:text-white/25
                    w-full
                  "
                  value={resetFormData.newPassword}
                  name="newPassword"
                  onChange={(e) => {
                    form1.handleChange(e);
                    changeHandeller(e);
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icons
                    icon={showPassword ? "eyeoff" : "eye"}
                    color="white"
                    scale={1}
                  />
                </button>
              </div>
            </div>
          )}

          {/* CONFIRM PASSWORD */}
          {!disabled.confPass && (
            <div>
              <label
                className="
                  text-sm
                  text-white/60
                  mb-2
                  block
                "
              >
                Confirm Password
              </label>

              <div
                className="
                  h-[58px]
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-4
                  flex
                  items-center
                  gap-3
                "
              >
                <Icons icon="shield" color="white" scale={1} />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="
                    bg-transparent
                    outline-none
                    text-white
                    placeholder:text-white/25
                    w-full
                  "
                  name="confirmPass"
                  value={resetFormData.confirmPass}
                  onChange={(e) => {
                    form1.handleChange(e);
                    changeHandeller(e);
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Icons
                    icon={showConfirmPassword ? "eyeoff" : "eye"}
                    color="white"
                    scale={1}
                  />
                </button>
              </div>
            </div>
          )}

          {/* PASSWORD STRENGTH */}
          {!disabled.passStrength && (
            <div>
              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-2
                "
              >
                <span
                  className="
                    text-xs
                    text-white/40
                  "
                >
                  Password Strength
                </span>

                <span
                  className="
                    text-xs
                    text-pink-300
                  "
                >
                  {passStrength < 40
                    ? "Weak"
                    : passStrength < 70
                      ? "Medium"
                      : "Strong"}
                </span>
              </div>

              <div
                className="
                  w-full
                  h-[8px]
                  rounded-full
                  bg-white/10
                  overflow-hidden
                "
              >
                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-pink-500
                    to-purple-500
                  "
                  style={{ width: `${passStrength}%` }}
                />
              </div>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={disableSubmit}
            className={`h-[60px] mt-3 rounded-2xl bg-gradient-to-r
              ${
                disabled.btn
                  ? "from-[#467840] to-[#95c06c] text-white"
                  : "from-[#784069] to-[#c06cbf] text-white hover:scale-[1.01] hover:opacity-95"
              }
              ${
                disableSubmit
                  ? "cursor-not-allowed opacity-70"
                  : "cursor-pointer opacity-100"
              }
              font-semibold text-lg shadow-[0_10px_40px_rgba(120,64,105,0.35)]
              transition-all duration-300
            `}
          >
            {disabled.btn
              ? disabled.email
                ? "Verify code"
                : "Send verification code"
              : "Reset Password"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
