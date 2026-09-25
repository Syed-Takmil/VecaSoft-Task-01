"use client"
import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Package, 
  AlertTriangle, 
  HelpCircle, 
  PhoneCall, 
  MessageSquare, 
  RefreshCw,
  MapPin,
  X,
  Send,
  Phone,
  Sparkles,
  Bot
} from 'lucide-react';

export default function OrderTrackingScreen() {
  const [activeState, setActiveState] = useState('in_transit');
  
  // Modal Visibility States
  const [activeModal, setActiveModal] = useState(null); // 'issue' | 'chat' | 'call' | 'ticket_success' | null
  const [chatMessages, setChatMessages] = useState([
    { sender: 'agent', text: 'Hello! I am your AI delivery assistant. How can I help you with order #ORD-89241?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Dynamic Content Configuration
  const stateConfig = {
    in_transit: {
      statusText: 'Out for Delivery',
      statusColor: 'bg-blue-500/10 text-blue-700 border-blue-200 shadow-blue-500/5',
      badgePulse: true,
      estimatedDelivery: 'Today, by 6:00 PM',
      steps: [
        { title: 'Processing', timestamp: 'Sep 24, 09:30 AM', completed: true, current: false },
        { title: 'Shipped', timestamp: 'Sep 24, 04:15 PM', completed: true, current: false },
        { title: 'Out for Delivery', timestamp: 'Sep 25, 08:00 AM', completed: true, current: true },
        { title: 'Delivered', timestamp: 'Pending', completed: false, current: false },
      ]
    },
    delayed: {
      statusText: 'Shipment Delayed',
      statusColor: 'bg-amber-500/10 text-amber-700 border-amber-200 shadow-amber-500/5',
      badgePulse: true,
      estimatedDelivery: 'Updated: Tomorrow, Sep 26',
      steps: [
        { title: 'Processing', timestamp: 'Sep 22, 10:00 AM', completed: true, current: false },
        { title: 'Shipped', timestamp: 'Sep 23, 02:00 PM', completed: true, current: false },
        { title: 'Out for Delivery', timestamp: 'Delayed in transit', completed: false, current: true },
        { title: 'Delivered', timestamp: 'Pending', completed: false, current: false },
      ]
    },
    delivered_not_received: {
      statusText: 'Delivered',
      statusColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-200 shadow-emerald-500/5',
      badgePulse: false,
      estimatedDelivery: 'Delivered on Sep 25 at 2:15 PM',
      steps: [
        { title: 'Processing', timestamp: 'Sep 23, 09:00 AM', completed: true, current: false },
        { title: 'Shipped', timestamp: 'Sep 24, 11:00 AM', completed: true, current: false },
        { title: 'Out for Delivery', timestamp: 'Sep 25, 08:30 AM', completed: true, current: false },
        { title: 'Delivered', timestamp: 'Sep 25, 02:15 PM', completed: true, current: true },
      ]
    },
    not_available: {
      statusText: 'Order Confirmed',
      statusColor: 'bg-slate-500/10 text-slate-700 border-slate-200 shadow-slate-500/5',
      badgePulse: false,
      estimatedDelivery: 'Preparing shipment details...',
      steps: []
    }
  };

  const currentConfig = stateConfig[activeState];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setChatMessages(prev => [
      ...prev, 
      { sender: 'user', text: inputMessage },
      { sender: 'agent', text: 'Thanks for reaching out! A human agent is reviewing your tracking history.' }
    ]);
    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col items-center p-3 sm:p-6 font-sans">
      
      {/* EVALUATOR DEMO CONTROLLER */}
      <div className="w-full max-w-md bg-slate-900 text-white p-3 rounded-xl mb-4 shadow-xl text-xs backdrop-blur-md">
        <p className="font-semibold text-slate-300 mb-2 uppercase tracking-wider text-[10px] flex items-center justify-between">
          <span>Demo Evaluator Controls (Switch Test Scenarios)</span>
          <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          <button 
            onClick={() => setActiveState('in_transit')}
            className={`px-2 py-1.5 rounded-lg transition-all duration-200 ${activeState === 'in_transit' ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30 scale-[1.02]' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
          >
            Standard Transit
          </button>
          <button 
            onClick={() => setActiveState('delayed')}
            className={`px-2 py-1.5 rounded-lg transition-all duration-200 ${activeState === 'delayed' ? 'bg-amber-600 text-white font-medium shadow-md shadow-amber-600/30 scale-[1.02]' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
          >
            1. Delayed Order
          </button>
          <button 
            onClick={() => setActiveState('delivered_not_received')}
            className={`px-2 py-1.5 rounded-lg transition-all duration-200 ${activeState === 'delivered_not_received' ? 'bg-rose-600 text-white font-medium shadow-md shadow-rose-600/30 scale-[1.02]' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
          >
            2. Delivered/Not Recv
          </button>
          <button 
            onClick={() => setActiveState('not_available')}
            className={`px-2 py-1.5 rounded-lg transition-all duration-200 ${activeState === 'not_available' ? 'bg-purple-600 text-white font-medium shadow-md shadow-purple-600/30 scale-[1.02]' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
          >
            3. No Tracking Yet
          </button>
        </div>
      </div>

      {/* MOBILE CONTAINER (360px–430px) */}
      <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100/80 transition-all duration-300 hover:shadow-slate-200/60 pb-6">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10 pointer-events-none" />
          <div className="relative z-10">
            <span className="text-xs text-slate-400 tracking-wide font-mono">Order #ORD-89241</span>
            <h1 className="text-base font-bold text-white tracking-tight">Track Order</h1>
          </div>
          <div className="relative z-10 flex items-center space-x-1.5">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm transition-all duration-300 flex items-center space-x-1.5 ${currentConfig.statusColor}`}>
              {currentConfig.badgePulse && (
                <span className="w-2 h-2 rounded-full bg-current animate-ping" />
              )}
              <span>{currentConfig.statusText}</span>
            </span>
          </div>
        </div>

        {/* Dynamic Context Cards */}
        <div className="p-4 space-y-4">
          
          {/* STATE 1: DELAYED ALERT */}
          {activeState === 'delayed' && (
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3.5 flex items-start space-x-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="p-2 bg-amber-100 text-amber-700 rounded-xl shrink-0 mt-0.5 animate-bounce">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="text-xs text-amber-900">
                <p className="font-semibold text-amber-900 mb-0.5">Delivery Time Extended</p>
                <p className="text-amber-700/90 leading-relaxed">
                  Severe weather conditions have slowed transit. We expect your delivery to arrive by tomorrow evening.
                </p>
              </div>
            </div>
          )}

          {/* STATE 2: DELIVERED BUT NOT RECEIVED */}
          {activeState === 'delivered_not_received' && (
            <div className="bg-rose-50/80 border border-rose-200/80 rounded-2xl p-3.5 space-y-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-rose-100 text-rose-700 rounded-xl shrink-0 mt-0.5">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-rose-900">Can’t find your package?</p>
                  <p className="text-rose-700/90 mt-0.5 leading-relaxed">
                    Marked delivered near front door/mailbox. If missing, we can assist immediately.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModal('issue')}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-rose-600/20"
              >
                Report Missing Package
              </button>
            </div>
          )}

          {/* STATE 3: TRACKING NOT AVAILABLE YET */}
          {activeState === 'not_available' ? (
            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-6 text-center space-y-3 shadow-inner animate-in fade-in duration-300">
              <div className="relative w-12 h-12 bg-slate-200/80 text-slate-500 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <Clock className="w-6 h-6 animate-spin" style={{ animationDuration: '8s' }} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-ping" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-slate-800 text-sm">Tracking Information Processing</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Your order is being prepared at our fulfillment center. Tracking details usually update within 24 hours.
                </p>
              </div>
              <div className="pt-2">
                <button 
                  onClick={() => setActiveState('in_transit')}
                  className="inline-flex items-center space-x-1.5 text-xs text-blue-600 font-semibold hover:text-blue-700 group transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Check status updates</span>
                </button>
              </div>
            </div>
          ) : (
            /* STANDARD TIMELINE DISPLAY */
            <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 shadow-sm animate-in fade-in duration-300">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Estimated Delivery</p>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{currentConfig.estimatedDelivery}</p>

              {/* Progress Stepper */}
              <div className="mt-5 space-y-4">
                {currentConfig.steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3 relative group">
                    {index !== currentConfig.steps.length - 1 && (
                      <div 
                        className={`absolute left-[11px] top-6 w-[2px] h-[calc(100%-12px)] transition-colors duration-500 ${
                          step.completed ? 'bg-emerald-500' : 'bg-slate-200'
                        }`} 
                      />
                    )}
                    
                    <div className="shrink-0 z-10">
                      {step.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 bg-white rounded-full transition-transform duration-200 group-hover:scale-110 shadow-sm" />
                      ) : step.current ? (
                        <div className="w-6 h-6 rounded-full border-2 border-blue-600 bg-blue-50 flex items-center justify-center shadow-md shadow-blue-500/20">
                          <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-slate-300 bg-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className={`text-xs font-semibold transition-colors duration-200 ${step.current ? 'text-blue-600' : step.completed ? 'text-slate-800' : 'text-slate-400'}`}>
                        {step.title}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{step.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Item Summary */}
          <div className="border border-slate-100 rounded-2xl p-3.5 space-y-3 shadow-sm hover:border-slate-200 transition-colors">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Package Contents</h2>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-slate-100/80 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Package className="w-6 h-6 text-slate-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 truncate">Wireless Noise-Canceling Headphones</p>
                <p className="text-[11px] text-slate-500">Qty: 1 • Color: Matte Black</p>
              </div>
            </div>
          </div>

          {/* Delivery Address Details */}
          <div className="border border-slate-100 rounded-2xl p-3.5 text-xs space-y-2 shadow-sm hover:border-slate-200 transition-colors">
            <div className="flex items-center space-x-2 text-slate-700 font-semibold">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Delivery Address</span>
            </div>
            <p className="text-slate-500 pl-6 leading-relaxed">
              House #12, Road #4, Sector 3, Uttara, Dhaka
            </p>
          </div>

          {/* Support Actions */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <p className="text-xs font-semibold text-slate-700">Need help with this order?</p>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setActiveModal('chat')}
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-all shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                <span>Live Chat</span>
              </button>
              <button 
                onClick={() => setActiveModal('call')}
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-all shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call Support</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL 1: REPORT MISSING PACKAGE */}
      {activeModal === 'issue' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl relative border border-slate-100 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-sm font-bold text-slate-900">Report Missing Package</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Please verify surrounding areas before submitting a claim.
            </p>
            
            <div className="space-y-2 text-xs">
              <label className="block text-slate-700 font-semibold">Issue Detail</label>
              <select className="w-full border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 bg-slate-50/50 outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all">
                <option>Marked delivered, but not at my door</option>
                <option>Delivered to wrong address</option>
                <option>Signed by unauthorized person</option>
              </select>
            </div>

            <div className="flex space-x-2 pt-2">
              <button 
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setActiveModal('ticket_success')}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-rose-600/20 active:scale-[0.98]"
              >
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: TICKET SUCCESS CONFIRMATION */}
      {activeModal === 'ticket_success' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Support Ticket Created</h3>
              <p className="text-xs text-slate-500 mt-1">Ticket ID: <span className="font-semibold text-slate-800 font-mono">#TK-9921</span></p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Our support team and courier partners have been notified. We will update you via email within 2 hours.
              </p>
            </div>
            <button 
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all shadow-md active:scale-[0.98]"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: LIVE CHAT DIALOG */}
      {activeModal === 'chat' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full h-[460px] flex flex-col shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-emerald-500/20 rounded-lg">
                  <Bot className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-xs font-semibold block">Live Support Assistant</span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
                  </span>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50/50 text-xs">
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1 duration-200`}
                >
                  <div 
                    className={`max-w-[82%] rounded-2xl p-3 leading-relaxed shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-2.5 bg-white border-t border-slate-100 flex items-center space-x-2">
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 text-xs border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-slate-50/50"
              />
              <button 
                type="submit" 
                className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-600/20"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: CALL SUPPORT DIALOG */}
      {activeModal === 'call' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl relative border border-slate-100 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <Phone className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Courier Hotline Support</h3>
              <p className="text-xs text-slate-500">Connecting you with logistics dispatch</p>
            </div>

            <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3 text-xs space-y-1 shadow-inner">
              <p className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider">Toll-Free Hotline</p>
              <p className="text-base font-bold text-slate-800 font-mono">+1 (800) 555-0199</p>
              <p className="text-[11px] text-emerald-600 font-medium">Available 24/7 • Estimated wait: &lt; 1 min</p>
            </div>

            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
              <a 
                href="tel:18005550199" 
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-emerald-600/20 active:scale-[0.98] inline-flex items-center justify-center space-x-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}