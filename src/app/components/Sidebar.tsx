"use client";
import { useState } from "react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`h-full rounded-2xl border border-border/50 bg-white/80 backdrop-blur-xl shadow-xl transition-all duration-500 ${isCollapsed ? 'w-16' : 'w-full'} p-4 animate-fade-in`}>
      <div className="flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="text-xl font-bold gradient-text">Test History</div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-muted-foreground hover:text-foreground hover:bg-muted/50 p-2 rounded-xl transition-all duration-200 hover-lift"
        >
          {isCollapsed ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="mt-8 space-y-6">
          <div className="text-center py-8 px-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-sm font-semibold text-blue-900 mb-1">Recent API Tests</div>
            <div className="text-xs text-blue-600">Click any test to view details</div>
          </div>
          
          <div className="space-y-3">
            <div className="group rounded-2xl border border-border/50 bg-white p-4 hover:border-blue-200 hover:bg-blue-50/50 cursor-pointer transition-all duration-300 hover-lift hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-lg">GET</span>
                    <span className="text-sm font-mono text-foreground">/posts</span>
                  </div>
                  <div className="text-xs text-muted-foreground">JSONPlaceholder API</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-semibold text-green-600 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    200 OK
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group rounded-2xl border border-border/50 bg-white p-4 hover:border-green-200 hover:bg-green-50/50 cursor-pointer transition-all duration-300 hover-lift hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-lg">POST</span>
                    <span className="text-sm font-mono text-foreground">/users</span>
                  </div>
                  <div className="text-xs text-muted-foreground">User Creation Test</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-semibold text-green-600 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    201 Created
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group rounded-2xl border border-border/50 bg-white p-4 hover:border-orange-200 hover:bg-orange-50/50 cursor-pointer transition-all duration-300 hover-lift hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-1 text-xs font-semibold bg-orange-100 text-orange-700 rounded-lg">PUT</span>
                    <span className="text-sm font-mono text-foreground">/posts/1</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Update Post Test</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-semibold text-orange-600 flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    200 OK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
