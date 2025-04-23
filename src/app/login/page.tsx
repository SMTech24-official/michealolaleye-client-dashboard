import LoginForm from "@/components/modules/Auth/LoginForm";
import logo from "../../assets/images/big-logo.png"
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen space-y-12">
      <Image src={logo} alt="logo" height={250} width={250}/>
      <h2 className="text-primary text-5xl font-medium">Sign in</h2>
      <LoginForm />
    </div>
  );
}
