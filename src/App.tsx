import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AdminPaymentsList from './pages/AdminPaymentsList';
import AdminPaymentDetailsSettled from './pages/AdminPaymentDetailsSettled';
import AdminPaymentDetailsFailed from './pages/AdminPaymentDetailsFailed';
import AdminPaymentDetailsOnHold from './pages/AdminPaymentDetailsOnHold';
import MerchantPaymentDetailsSettled from './pages/MerchantPaymentDetailsSettled';
import AdminPaymentDetailsRefundModal from './pages/AdminPaymentDetailsRefundModal';

export default function App() {
  return (
    <BrowserRouter basename="/uiux-330-split-payments">
      <Routes>
        <Route path="/payments" element={<AdminPaymentsList />} />
        <Route path="/payments/settled" element={<AdminPaymentDetailsSettled />} />
        <Route path="/payments/failed" element={<AdminPaymentDetailsFailed />} />
        <Route path="/payments/onhold" element={<AdminPaymentDetailsOnHold />} />
        <Route path="/merchant/payments/settled" element={<MerchantPaymentDetailsSettled />} />
        <Route path="/payments/refund" element={<AdminPaymentDetailsRefundModal />} />
        <Route index element={
          <div className="min-h-screen bg-background-neutral-primary-initial flex items-center justify-center">
            <div className="text-center">
              <h1 className="headline-m text-neutral-primary-initial mb-6">UIUX-330: Split Payments</h1>
              <div className="space-y-3">
                <Link to="/payments" className="block label-m text-action-primary-initial hover:underline">Admin Payments List</Link>
                <Link to="/payments/settled" className="block label-m text-action-primary-initial hover:underline">Admin Payment Details (Settled)</Link>
                <Link to="/payments/failed" className="block label-m text-action-primary-initial hover:underline">Admin Payment Details (Failed)</Link>
                <Link to="/payments/onhold" className="block label-m text-action-primary-initial hover:underline">Admin Payment Details (On Hold)</Link>
                <Link to="/merchant/payments/settled" className="block label-m text-action-primary-initial hover:underline">Merchant Payment Details (Settled)</Link>
                <Link to="/payments/refund" className="block label-m text-action-primary-initial hover:underline">Admin Payment Details (Refund Modal)</Link>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
