function pretty(v:any){
    try{
        return JSON.stringify(v,null, 2);
    } catch {
        return String(v);
    }
}

function getStatusColor(status: number | null) {
  if (!status) return 'text-gray-500';
  if (status >= 200 && status < 300) return 'text-green-600';
  if (status >= 300 && status < 400) return 'text-yellow-600';
  if (status >= 400 && status < 500) return 'text-orange-600';
  if (status >= 500) return 'text-red-600';
  return 'text-gray-600';
}

function getStatusBg(status: number | null) {
  if (!status) return 'bg-gray-100';
  if (status >= 200 && status < 300) return 'bg-green-100';
  if (status >= 300 && status < 400) return 'bg-yellow-100';
  if (status >= 400 && status < 500) return 'bg-orange-100';
  if (status >= 500) return 'bg-red-100';
  return 'bg-gray-100';
}

export default function Inspector({requestDraft, responseDraft} : {
    requestDraft : any;
    responseDraft : any;
} ) {
  return (
    <div className="h-full rounded-2xl border border-border/50 bg-white/80 backdrop-blur-xl shadow-xl p-6 flex flex-col gap-6 animate-fade-in">
      {/* Request Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-border/50">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <div className="text-lg font-bold text-foreground">Request</div>
        </div>
        
        <div className="space-y-4">
          {/* Method and URL */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Method</label>
              <div className="px-3 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl font-mono text-sm font-semibold text-blue-700">
                {requestDraft.method}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">URL</label>
              <div className="px-3 py-2 bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-xl font-mono text-sm text-slate-700 truncate">
                {requestDraft.url || "-"}
              </div>
            </div>
          </div>

          {/* Headers */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Headers</label>
            <div className="relative">
              <pre className="text-xs bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 rounded-xl p-4 overflow-auto font-mono leading-relaxed shadow-inner">
                {pretty(requestDraft.headers)}
              </pre>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Body</label>
            <div className="relative">
              <pre className="text-xs bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 rounded-xl p-4 overflow-auto font-mono leading-relaxed shadow-inner">
                {pretty(requestDraft.body)}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Response Section */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-border/50">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-lg font-bold text-foreground">Response</div>
        </div>
        
        <div className="space-y-4">
          {/* Status */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</label>
            <div className={`px-3 py-2 ${getStatusBg(responseDraft.status)} border border-opacity-30 rounded-xl font-mono text-sm font-semibold ${getStatusColor(responseDraft.status)} shadow-sm`}>
              {responseDraft.status ?? "-"}
            </div>
          </div>
          
          {/* Response Body */}
          <div className="flex-1 space-y-2 min-h-0">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Body</label>
            <div className="relative h-full">
              <pre className="h-full text-xs bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 rounded-xl p-4 overflow-auto font-mono leading-relaxed shadow-inner">
                {pretty(responseDraft.body)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
