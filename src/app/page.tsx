"use client";
import Sidebar from "./components/Sidebar";
import Inspector from "./components/Inspector";
import ChatPanel from "./components/ChatPanel";
import { useState } from "react";


type Msg = {role : "user" | "assistant";
  text : string;
};

export default function Home() {
  const[messages,setMessages] = useState<Msg[]>([]);

  const [requestDraft,setRequestDraft] = useState({
    method : "GET",
    url : "",
    headers: { "content-Type" : "application/json" as const },
    body : {},
  });
  
  const [responseDraft,setResposeDraft] = useState({
    status : null as null | number,
    body: null as any,
  });
  return(
    <main className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="h-full p-2 sm:p-4">
        <div className="h-full max-w-screen-2xl mx-auto">
          {/* Mobile Layout (Stacked) */}
          <div className="flex flex-col lg:hidden h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-border/50 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="text-lg font-bold text-foreground">API Testing</div>
              </div>
            </div>
            
            {/* Mobile Content Area - Only Chat Panel */}
            <div className="flex-1 mt-4 overflow-hidden">
              <ChatPanel 
                messages = {messages}
                setMessages = {setMessages}
                requestDraft = {requestDraft}
                setRequestDraft = {setRequestDraft}
                setResponseDraft = {setResposeDraft}
              />
            </div>
          </div>
          
          {/* Desktop Layout (Side by Side) */}
          <div className="hidden lg:flex h-full">
            <div className="h-full max-w-screen-2xl mx-auto grid grid-cols-12 gap-6">
              <section className="col-span-3 transition-all duration-300">
                <Sidebar />
              </section>
              <section className="col-span-6">
                <ChatPanel 
                  messages = {messages}
                  setMessages = {setMessages}
                  requestDraft = {requestDraft}
                  setRequestDraft = {setRequestDraft}
                  setResponseDraft = {setResposeDraft}
                />
              </section>
              <section className="col-span-3">
                <Inspector requestDraft={requestDraft} responseDraft={responseDraft}/>
              </section>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-4 px-4 text-center border-t border-border/20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="text-xs sm:text-sm text-muted-foreground">
          🚀 Website maintained by <span className="font-semibold text-foreground">Adi</span> | Built with ❤️ and Next.js
        </div>
      </footer>
    </main>
  );

}