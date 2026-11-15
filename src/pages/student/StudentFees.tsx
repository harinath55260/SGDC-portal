import React, { useState } from 'react';
import { DEMO_FEES } from '../../services/collegeData';
import { useNotification } from '../../context/NotificationContext';
import { DollarSign, CheckCircle2, Clock, Download, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';
import { BackButton } from '../../components/common/BackButton';

interface StudentFeesProps {
  onBack?: () => void;
}

export const StudentFees: React.FC<StudentFeesProps> = ({ onBack }) => {
  const { showToast } = useNotification();
  const [fees, setFees] = useState(DEMO_FEES);
  const [payModalItem, setPayModalItem] = useState<any | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const totalFee = fees.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalPaid = fees.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalPending = fees.reduce((acc, curr) => acc + curr.pendingAmount, 0);

  const handlePayNow = () => {
    if (!payModalItem) return;
    setIsProcessing(true);

    setTimeout(() => {
      const txnId = `TXN2026${Math.floor(100000 + Math.random() * 900000)}`;
      const recNo = `SGDC-REC-${Math.floor(7000 + Math.random() * 2000)}`;
      
      setFees(prev => prev.map(f => {
        if (f.id === payModalItem.id) {
          return {
            ...f,
            paidAmount: f.totalAmount,
            pendingAmount: 0,
            status: 'paid',
            receipts: [
              ...f.receipts,
              {
                receiptNo: recNo,
                date: new Date().toISOString().split('T')[0],
                amount: f.pendingAmount,
                paymentMethod: paymentMethod === 'upi' ? 'UPI / QR Code' : 'NetBanking HDFC',
                transactionId: txnId,
                status: 'SUCCESS'
              }
            ]
          };
        }
        return f;
      }));

      setIsProcessing(false);
      setPayModalItem(null);
      showToast(`Payment of ₹${payModalItem.pendingAmount.toLocaleString()} successful! Receipt: ${recNo}`, 'success', 'Fee Payment Confirmed');
    }, 1200);
  };

  const handleDownloadReceipt = (rec: any, title: string) => {
    const content = `================================================
SHRI GNANAMBICA DEGREE COLLEGE (AUTONOMOUS)
Madanapalle, Andhra Pradesh - 517325
OFFICIAL FEE PAYMENT RECEIPT
================================================
Receipt No    : ${rec.receiptNo}
Transaction ID: ${rec.transactionId}
Payment Date  : ${rec.date}
Student Name  : K. Harinath
Roll Number   : 22042BCA
Fee Category  : ${title}
Amount Paid   : ₹${rec.amount.toLocaleString()}
Payment Method: ${rec.paymentMethod}
Status        : SUCCESS (Digitally Verified)
================================================
Generated via SGDC Student Portal.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${rec.receiptNo}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • Fee Portal
        </span>
      </div>

      {/* Header */}
      <div>
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
          Accounts & Finance Wing
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-outfit mt-2">
          College Fee Ledger & Payments
        </h1>
        <p className="text-xs text-slate-500">
          Shri Gnanambica Degree College (Autonomous), Madanapalle
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase">Total Fee Assessed</div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-outfit mt-1">
            ₹{totalFee.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 mt-1">Across enrolled academic semesters</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-bold text-emerald-500 uppercase">Total Paid to Date</div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-outfit mt-1">
            ₹{totalPaid.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-600 mt-1">Verified with Finance Counter</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-bold text-rose-500 uppercase">Current Pending Dues</div>
          <div className="text-3xl font-black text-rose-600 dark:text-rose-400 font-outfit mt-1">
            ₹{totalPending.toLocaleString()}
          </div>
          <div className="text-xs text-rose-500 mt-1">Due before: October 15, 2026</div>
        </div>
      </div>

      {/* Fee Items List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white font-outfit">
          Semester Fee Breakdown
        </h3>

        <div className="space-y-4">
          {fees.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                    Semester {item.semester}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                </div>
                <div className="text-xs text-slate-500 flex flex-wrap gap-x-4">
                  <span>Total: <strong>₹{item.totalAmount.toLocaleString()}</strong></span>
                  <span>Paid: <strong className="text-emerald-600">₹{item.paidAmount.toLocaleString()}</strong></span>
                  <span>Due Date: <strong>{item.dueDate}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                {item.status === 'paid' ? (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Paid in Full
                    </span>
                    {item.receipts.length > 0 && (
                      <button
                        onClick={() => handleDownloadReceipt(item.receipts[0], item.title)}
                        className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> Receipt
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setPayModalItem(item)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-all hover:scale-105"
                  >
                    <span>Pay Dues (₹{item.pendingAmount.toLocaleString()})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Online Payment Modal */}
      {payModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Online Fee Payment Gateway
              </h3>
              <button onClick={() => setPayModalItem(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-xs space-y-1">
              <div className="text-slate-600 dark:text-slate-300">Category: <strong>{payModalItem.title}</strong></div>
              <div className="text-lg font-black text-blue-950 dark:text-blue-200">
                Amount to Pay: ₹{payModalItem.pendingAmount.toLocaleString()}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Select Secure Method</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-colors ${
                    paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50 text-blue-900 dark:bg-blue-950' : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  📱 UPI / QR (GPay, PhonePe)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-colors ${
                    paymentMethod === 'netbanking' ? 'border-blue-600 bg-blue-50 text-blue-900 dark:bg-blue-950' : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  🏦 NetBanking / Debit
                </button>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>256-bit SSL encrypted. Card numbers are never stored.</span>
            </div>

            <button
              onClick={handlePayNow}
              disabled={isProcessing}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
            >
              {isProcessing ? 'Authorizing with Bank...' : `Authorize Payment of ₹${payModalItem.pendingAmount.toLocaleString()}`}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
