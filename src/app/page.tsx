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
      <div className="h-full p-4">
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
    </main>
  );

}