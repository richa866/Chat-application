"use client"

import { useState, useEffect } from "react"



export default function IncomingCallModal({
  isVisible,
  callerName,
  callerAvatar,
  onAccept,
  onReject,
}) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

      {/* Modal */}
      <div
        className={`relative transform transition-all duration-500 ${isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl max-w-sm w-full">
          {/* Caller Avatar */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {callerAvatar ? (
                  <img
                    src={callerAvatar || "/placeholder.svg"}
                    alt={callerName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  callerName.charAt(0).toUpperCase()
                )}
              </div>
              {/* Pulsing ring animation */}
              <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-pulse"></div>
            </div>
          </div>

          {/* Caller Info */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-white mb-2">{callerName}</h3>
            <p className="text-white/70 text-sm">Incoming call</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6">
            {/* Reject Button */}
            <button
              onClick={onReject}
              className="w-16 h-16 rounded-full bg-red-500/80 backdrop-blur-sm border border-red-400/30 flex items-center justify-center text-white hover:bg-red-500 transition-all duration-200 shadow-lg hover:scale-105 active:scale-95"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l-8 8m0-8l8 8" />
              </svg>
            </button>

            {/* Accept Button */}
            <button
              onClick={onAccept}
              className="w-16 h-16 rounded-full bg-green-500/80 backdrop-blur-sm border border-green-400/30 flex items-center justify-center text-white hover:bg-green-500 transition-all duration-200 shadow-lg hover:scale-105 active:scale-95"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </button>
          </div>

          {/* Swipe hint */}
          <div className="text-center mt-6">
            <p className="text-white/50 text-xs">Swipe to decline and send a text</p>
          </div>
        </div>
      </div>
    </div>
  )
}
