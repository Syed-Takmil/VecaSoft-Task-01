import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col items-center p-3 sm:p-6 font-sans">
      
      {/* Skeleton Controller Bar */}
      <div className="w-full max-w-md bg-slate-900/80 p-3 rounded-xl mb-4 animate-pulse">
        <div className="h-3 bg-slate-700 rounded w-2/3 mb-3" />
        <div className="grid grid-cols-2 gap-1.5">
          <div className="h-7 bg-slate-800 rounded-lg" />
          <div className="h-7 bg-slate-800 rounded-lg" />
          <div className="h-7 bg-slate-800 rounded-lg" />
          <div className="h-7 bg-slate-800 rounded-lg" />
        </div>
      </div>

      {/* Skeleton Mobile Card */}
      <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-4 space-y-4 animate-pulse">
        
        {/* Header Skeleton */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="h-2.5 bg-slate-200 rounded w-20" />
            <div className="h-4 bg-slate-200 rounded w-28" />
          </div>
          <div className="h-6 bg-slate-200 rounded-full w-24" />
        </div>

        {/* Status Card Skeleton */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-4">
          <div className="space-y-1.5">
            <div className="h-2.5 bg-slate-200 rounded w-24" />
            <div className="h-4 bg-slate-200 rounded w-40" />
          </div>

          {/* Stepper Skeleton */}
          <div className="space-y-4 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-slate-200 shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-3 bg-slate-200 rounded w-28" />
                  <div className="h-2.5 bg-slate-200 rounded w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Package Content Skeleton */}
        <div className="border border-slate-100 rounded-2xl p-3.5 flex items-center space-x-3">
          <div className="w-12 h-12 bg-slate-200 rounded-xl shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-3 bg-slate-200 rounded w-3/4" />
            <div className="h-2.5 bg-slate-200 rounded w-1/2" />
          </div>
        </div>

        {/* Buttons Skeleton */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="h-9 bg-slate-200 rounded-xl" />
          <div className="h-9 bg-slate-200 rounded-xl" />
        </div>

      </div>
    </div>
  );
}