"use client";
import { useState } from "react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`h-full rounded-2xl border border-border/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-xl transition-all duration-500 ${isCollapsed ? 'w-16' : 'w-full'} p-2 sm:p-4 animate-fade-in`}>
      <div className="flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="text-sm sm:text-xl font-bold gradient-text hidden sm:block">Test History</div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 sm:p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 hidden sm:flex"
        >
          {isCollapsed ? (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="mt-4 sm:mt-8 space-y-4 sm:space-y-6">
          <div className="text-center py-4 sm:py-8 px-2 sm:px-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-800">
            <div className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Recent API Tests</div>
            <div className="text-xs text-blue-600 dark:text-blue-300">Click any test to view details</div>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <div className="group rounded-2xl border border-border/50 bg-white dark:bg-slate-800 p-2 sm:p-4 hover:border-blue-200 hover:bg-blue-50/50 dark:hover:border-blue-700 dark:hover:bg-blue-900/20 cursor-pointer transition-all duration-300 hover-lift hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1">
                    <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg">GET</span>
                    <span className="text-xs sm:text-sm font-mono text-foreground truncate">/posts</span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">JSONPlaceholder API</div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  <div className="text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="hidden sm:inline">200 OK</span>
                    <span className="sm:hidden">200</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group rounded-2xl border border-border/50 bg-white dark:bg-slate-800 p-2 sm:p-4 hover:border-green-200 hover:bg-green-50/50 dark:hover:border-green-700 dark:hover:bg-green-900/20 cursor-pointer transition-all duration-300 hover-lift hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1">
                    <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-semibold bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg">POST</span>
                    <span className="text-xs sm:text-sm font-mono text-foreground truncate">/users</span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">User Creation Test</div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  <div className="text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="hidden sm:inline">201 Created</span>
                    <span className="sm:hidden">201</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group rounded-2xl border border-border/50 bg-white dark:bg-slate-800 p-2 sm:p-4 hover:border-orange-200 hover:bg-orange-50/50 dark:hover:border-orange-700 dark:hover:bg-orange-900/20 cursor-pointer transition-all duration-300 hover-lift hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1">
                    <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-semibold bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg">PUT</span>
                    <span className="text-xs sm:text-sm font-mono text-foreground truncate">/posts/1</span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">Update Post Test</div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  <div className="text-xs font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full"></div>
                    <span className="hidden sm:inline">200 OK</span>
                    <span className="sm:hidden">200</span>
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
