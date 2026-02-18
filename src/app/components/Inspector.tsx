function pretty(v:any){
    try{
        return JSON.stringify(v,null, 2);
    } catch {
        return String(v);
    }
}

function getStatusColor(status: number | null) {
  if (!status) return 'text-gray-500 dark:text-gray-400';
  if (status >= 200 && status < 300) return 'text-green-600 dark:text-green-400';
  if (status >= 300 && status < 400) return 'text-yellow-600 dark:text-yellow-400';
  if (status >= 400 && status < 500) return 'text-orange-600 dark:text-orange-400';
  if (status >= 500) return 'text-red-600 dark:text-red-400';
  return 'text-gray-600 dark:text-gray-400';
}

function getStatusBg(status: number | null) {
  if (!status) return 'bg-gray-100 dark:bg-gray-800';
  if (status >= 200 && status < 300) return 'bg-green-100 dark:bg-green-900/30';
  if (status >= 300 && status < 400) return 'bg-yellow-100 dark:bg-yellow-900/30';
  if (status >= 400 && status < 500) return 'bg-orange-100 dark:bg-orange-900/30';
  if (status >= 500) return 'bg-red-100 dark:bg-red-900/30';
  return 'bg-gray-100 dark:bg-gray-800';
}

export default function Inspector({requestDraft, responseDraft} : {
    requestDraft : any;
    responseDraft : any;
} ) {
  return (
    <div className="h-full rounded-2xl border border-border/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-xl p-3 sm:p-6 flex flex-col gap-4 sm:gap-6 animate-fade-in">
      {/* Request Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-border/50">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <div className="text-sm sm:text-lg font-bold text-foreground">Request</div>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          {/* Method and URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <div className="space-y-1 sm:space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Method</label>
              <div className="px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border border-blue-200 dark:border-blue-800 rounded-xl font-mono text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300">
                {requestDraft.method}
              </div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">URL</label>
              <div className="px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800 dark:to-gray-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs sm:text-sm text-slate-700 dark:text-slate-300 truncate">
                {requestDraft.url || "-"}
              </div>
            </div>
          </div>

          {/* Headers */}
          <div className="space-y-1 sm:space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Headers</label>
            <div className="relative">
              <pre className="text-xs bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800 dark:to-gray-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 sm:p-4 overflow-auto font-mono leading-relaxed shadow-inner text-slate-700 dark:text-slate-300 max-h-32">
                {pretty(requestDraft.headers)}
              </pre>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-1 sm:space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Body</label>
            <div className="relative">
              <pre className="text-xs bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800 dark:to-gray-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 sm:p-4 overflow-auto font-mono leading-relaxed shadow-inner text-slate-700 dark:text-slate-300 max-h-32">
                {pretty(requestDraft.body)}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Response Section */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-border/50">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-sm sm:text-lg font-bold text-foreground">Response</div>
        </div>
        
        <div className="flex-1 space-y-3 sm:space-y-4 min-h-0">
          <div className="space-y-1 sm:space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</label>
            <div className={`px-2 sm:px-3 py-1.5 sm:py-2 ${getStatusBg(responseDraft.status)} border border-opacity-30 rounded-xl font-mono text-xs sm:text-sm font-semibold ${getStatusColor(responseDraft.status)} shadow-sm`}>
              {responseDraft.status ?? "-"}
            </div>
          </div>
          
          {/* Response Body */}
          <div className="flex-1 space-y-1 sm:space-y-2 min-h-0">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Body</label>
            <div className="relative h-full">
              <pre className="h-full text-xs bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800 dark:to-gray-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 sm:p-4 overflow-auto font-mono leading-relaxed shadow-inner text-slate-700 dark:text-slate-300">
                {pretty(responseDraft.body)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
