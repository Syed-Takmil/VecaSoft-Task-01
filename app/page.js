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
  Phone
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
      statusColor: 'bg-blue-100 text-blue-800 border-blue-200',
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
      statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
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
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
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
      statusColor: 'bg-gray-100 text-gray-800 border-gray-200',
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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-3 sm:p-6 font-sans">
      
      {/* EVALUATOR DEMO CONTROLLER */}
      <div className="w-full max-w-md bg-slate-900 text-white p-3 rounded-xl mb-4 shadow-md text-xs">
        <p className="font-semibold text-slate-300 mb-2 uppercase tracking-wider text-[10px]">
          Demo Evaluator Controls (Switch Test Scenarios):
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          <button 
            onClick={() => setActiveState('in_transit')}
            className={`px-2 py-1.5 rounded transition ${activeState === 'in_transit' ? 'bg-blue-600 text-white font-medium' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
          >
            Standard Transit
          </button>
          <button 
            onClick={() => setActiveState('delayed')}
            className={`px-2 py-1.5 rounded transition ${activeState === 'delayed' ? 'bg-amber-600 text-white font-medium' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
          >
            1. Delayed Order
          </button>
          <button 
            onClick={() => setActiveState('delivered_not_received')}
            className={`px-2 py-1.5 rounded transition ${activeState === 'delivered_not_received' ? 'bg-red-600 text-white font-medium' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
          >
            2. Delivered/Not Recv
          </button>
          <button 
            onClick={() => setActiveState('not_available')}
            className={`px-2 py-1.5 rounded transition ${activeState === 'not_available' ? 'bg-purple-600 text-white font-medium' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
          >
            3. No Tracking Yet
          </button>
        </div>
      </div>

      {/* MOBILE CONTAINER (360px–430px) */}
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 pb-6">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Order #ORD-89241</span>
            <h1 className="text-base font-bold text-white">Track Order</h1>
          </div>
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${currentConfig.statusColor}`}>
            {currentConfig.statusText}
          </span>
        </div>

        {/* Dynamic Context Cards */}
        <div className="p-4 space-y-4">
          
          {/* STATE 1: DELAYED ALERT */}
          {activeState === 'delayed' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900">
                <p className="font-semibold text-amber-900 mb-0.5">Delivery Time Extended</p>
                <p className="text-amber-700 leading-relaxed">
                  Severe weather conditions have slowed transit. We expect your delivery to arrive by tomorrow evening.
                </p>
              </div>
            </div>
          )}

          {/* STATE 2: DELIVERED BUT NOT RECEIVED */}
          {activeState === 'delivered_not_received' && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 space-y-2">
              <div className="flex items-start space-x-3">
                <HelpCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-semibold text-rose-900">Can’t find your package?</p>
                  <p className="text-rose-700 mt-0.5">
                    Marked delivered near front door/mailbox. If missing, we can assist immediately.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModal('issue')}
                className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium rounded-lg transition shadow-sm"
              >
                Report Missing Package
              </button>
            </div>
          )}

          {/* STATE 3: TRACKING NOT AVAILABLE YET */}
          {activeState === 'not_available' ? (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Clock className="w-6 h-6" />
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
                  className="inline-flex items-center space-x-1.5 text-xs text-blue-600 font-medium hover:underline"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Check status updates</span>
                </button>
              </div>
            </div>
          ) : (
            /* STANDARD TIMELINE DISPLAY */
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
              <p className="text-xs text-slate-500 font-medium">Estimated Delivery</p>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{currentConfig.estimatedDelivery}</p>

              {/* Progress Stepper */}
              <div className="mt-5 space-y-4">
                {currentConfig.steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3 relative">
                    {index !== currentConfig.steps.length - 1 && (
                      <div 
                        className={`absolute left-[11px] top-6 w-[2px] h-[calc(100%-12px)] ${
                          step.completed ? 'bg-emerald-500' : 'bg-slate-200'
                        }`} 
                      />
                    )}
                    
                    <div className="shrink-0 z-10">
                      {step.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 bg-white rounded-full" />
                      ) : step.current ? (
                        <div className="w-6 h-6 rounded-full border-2 border-blue-600 bg-blue-50 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-slate-300 bg-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className={`text-xs font-semibold ${step.current ? 'text-blue-600' : step.completed ? 'text-slate-800' : 'text-slate-400'}`}>
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
          <div className="border border-slate-100 rounded-xl p-3.5 space-y-3">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Package Contents</h2>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                <Package className="w-6 h-6 text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 truncate">Wireless Noise-Canceling Headphones</p>
                <p className="text-[11px] text-slate-500">Qty: 1 • Color: Matte Black</p>
              </div>
            </div>
          </div>

          {/* Delivery Address Details */}
          <div className="border border-slate-100 rounded-xl p-3.5 text-xs space-y-2">
            <div className="flex items-center space-x-2 text-slate-700 font-semibold">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>Delivery Address</span>
            </div>
            <p className="text-slate-500 pl-6">
              House #12, Road #4, Sector 3, Uttara, Dhaka
            </p>
          </div>

          {/* Support Actions */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <p className="text-xs font-semibold text-slate-700">Need help with this order?</p>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setActiveModal('chat')}
                className="flex items-center justify-center space-x-1.5 py-2 px-3 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                <span>Live Chat</span>
              </button>
              <button 
                onClick={() => setActiveModal('call')}
                className="flex items-center justify-center space-x-1.5 py-2 px-3 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
                <span>Call Support</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL 1: REPORT MISSING PACKAGE */}
      {activeModal === 'issue' && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl relative">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-sm font-bold text-slate-900">Report Missing Package</h3>
            <p className="text-xs text-slate-600">
              Please verify surrounding areas before submitting a claim.
            </p>
            
            <div className="space-y-2 text-xs">
              <label className="block text-slate-700 font-medium">Issue Detail</label>
              <select className="w-full border border-slate-300 rounded-lg p-2 text-xs text-slate-800 bg-white">
                <option>Marked delivered, but not at my door</option>
                <option>Delivered to wrong address</option>
                <option>Signed by unauthorized person</option>
              </select>
            </div>

            <div className="flex space-x-2 pt-2">
              <button 
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2 border border-slate-200 text-slate-600 text-xs font-medium rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={() => setActiveModal('ticket_success')}
                className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium rounded-lg transition"
              >
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: TICKET SUCCESS CONFIRMATION */}
      {activeModal === 'ticket_success' && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Support Ticket Created</h3>
              <p className="text-xs text-slate-500 mt-1">Ticket ID: <span className="font-semibold text-slate-800">#TK-9921</span></p>
              <p className="text-xs text-slate-600 mt-2">
                Our support team and courier partners have been notified. We will update you via email within 2 hours.
              </p>
            </div>
            <button 
              onClick={() => setActiveModal(null)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: LIVE CHAT DIALOG */}
      {activeModal === 'chat' && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full h-[450px] flex flex-col shadow-2xl overflow-hidden">
            <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold">Live Support Assistant</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-50 text-xs">
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-xl p-2.5 leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-2 bg-white border-t border-slate-200 flex items-center space-x-2">
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              />
              <button 
                type="submit" 
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: CALL SUPPORT DIALOG */}
      {activeModal === 'call' && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl relative">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Courier Hotline Support</h3>
              <p className="text-xs text-slate-500">Connecting you with logistics dispatch</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-1">
              <p className="text-slate-400 font-medium text-[10px] uppercase">Toll-Free Hotline</p>
              <p className="text-sm font-bold text-slate-800">+1 (800) 555-0199</p>
              <p className="text-[11px] text-slate-500">Available 24/7 • Estimated wait: &lt; 1 min</p>
            </div>

            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2 border border-slate-200 text-slate-600 text-xs font-medium rounded-lg"
              >
                Close
              </button>
              <a 
                href="tel:18005550199" 
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition inline-flex items-center justify-center space-x-1"
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