import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authenticate } from "../actions";

export default async function Page() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("vault-auth");
  
  if (authCookie?.value === "true") {
    redirect("/keystatic");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center mb-5 border border-zinc-200 dark:border-zinc-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-zinc-600 dark:text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">Vault Access</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm text-center">
            Enter your passcode to access the content management system.
          </p>
        </div>
        
        <form action={authenticate} className="flex flex-col gap-5">
          <div className="space-y-2">
            <label htmlFor="passcode" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Passcode
            </label>
            <input 
              type="password" 
              id="passcode"
              name="passcode" 
              placeholder="Enter passcode" 
              className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2"
          >
            <span>Unlock</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
