import { cookies } from "next/headers";
import KeystaticApp from "../keystatic";
import { authenticate } from "../../vault/actions";
import { LogoutButton } from "../../vault/LogoutButton";

export default async function Page() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("vault-auth");
  
  if (authCookie?.value !== "true") {
    return <div>Please login via /vault</div>;
  }

  return (
    <div className="keystatic-wrapper">
      <KeystaticApp />
      <LogoutButton />
    </div>
  );
}
