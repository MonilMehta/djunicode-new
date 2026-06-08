import { cookies } from "next/headers";
import KeystaticApp from "../keystatic";
import { authenticate } from "../actions";
import { LogoutButton } from "../LogoutButton";

export default async function Page() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("keystatic-auth");
  
  if (authCookie?.value !== "true") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 relative overflow-hidden font-sans">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-25%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]" />
          <div className="absolute bottom-[-25%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
        </div>

        <div className="relative w-full max-w-md bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl shadow-2xl p-8 z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Dashboard Access</h2>
            <p className="text-zinc-400 mt-2 text-sm text-center">
              Please enter your secure passcode to manage the website content.
            </p>
          </div>
          
          <form action={authenticate} className="flex flex-col gap-5">
            <div className="space-y-2">
              <label htmlFor="passcode" className="text-sm font-medium text-zinc-300">
                Passcode
              </label>
              <input 
                type="password" 
                id="passcode"
                name="passcode" 
                placeholder="Enter your passcode..." 
                className="w-full bg-zinc-950/50 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-zinc-600"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/25 active:scale-[0.98] flex justify-center items-center gap-2"
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

  return (
    <>
      <KeystaticApp />
      <LogoutButton />
    </>
  );
}
