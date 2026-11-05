import { useState } from "react";
import { Input } from "../../ui/input";
import type { InterfaceUser } from "../../../types/type";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router";
import { toast } from "../../ui/toast";

interface UserInterface {
  user: InterfaceUser;
  otp: string;
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [generatedOtp, setGeneratedOtp] = useState<string>("");
  const [otpInput, setOtpInput] = useState<string>("");
  const [screen, setScreen] = useState<"login" | "otp">("login");
  const [errorBackend, setErrorBackend] = useState<string>("");

  const handleLogin = async () => {
    try {
      setErrorBackend("");
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();

      if (!res.ok) {
        toast.add({
          title: "ERROR",
          description: `${result.message} `,
        });
        setErrorBackend(result.message || "Something went wrong");
      } else {
        setGeneratedOtp(String(result.data.otp));
        setScreen("otp");
        setTimeout(() => {
          toast.add({
            title: "OTP created",
            description: `OTP: ${String(result.data.otp)} `,
          });
        }, 2000);
      }
    } catch (error) {
      setErrorBackend(`${errorBackend}`);
    }
  };

  const handleOtpValid = () => {
    if (!otpInput) return;

    if (otpInput === generatedOtp) {
      navigate("/dashboard");
    } else {
      alert("Invalid OTP");
    }
  };
  return (
    <div className=" w-full  rounded-2xl m-auto min-h-screen flex items-center justify-center bg-slate-100">
      {screen === "login" ? (
        <div className="w-[20%] flex flex-col gap-2 bg-gray-300 p-5 rounded-2xl align-middle">
          <h3 className="text-center font-semibold text-2xl">LOGIN</h3>
          <div className="flex flex-col gap-2">
            <span className="text-slate-600 pl-1 text-[14px]">
              Enter Your Email to get the OTP
            </span>
            <Input
              className="bg-white"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button variant={"outline"} onClick={handleLogin} disabled={!email}>
            Get OTP
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2 bg-gray-300 p-5 rounded-2xl">
          <h3 className="text-center font-semibold text-2xl">OTP VERIFY</h3>
          <span>Enter Your OTP to LOGIN</span>
          <Input
            className="bg-white"
            type="text"
            placeholder="Enter your OTP"
            onChange={(e) => setOtpInput(e.target.value)}
            value={otpInput}
          />
          <Button variant={"outline"} onClick={handleOtpValid}>
            LOGIN
          </Button>
        </div>
      )}
    </div>
  );
}

export default Login;
