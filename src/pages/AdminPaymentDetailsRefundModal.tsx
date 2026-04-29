import { useState } from 'react';
import { Breadcrumbs, Badge, Button, Card, StatusTag, Tabs, Tab, Modal, Alert } from '@paysera/ui';

type Beneficiary = {
  name: string;
  identifier: string;
  amount: string;
  status: string;
  statusVariant: 'success' | 'warning' | 'critical' | 'disabled';
  description: string;
  avatarColor: string;
  initials: string;
};

const beneficiaries: Beneficiary[] = [
  { name: 'UAB Paysera LT', identifier: 'EVP3710002583421', amount: '€728.17', status: 'Refunded', statusVariant: 'critical', description: 'Platform fee (50%)', avatarColor: 'bg-surface-action-primary-initial', initials: 'PL' },
  { name: 'John Smith', identifier: 'PSR-45892', amount: '€583.34', status: 'Refunded', statusVariant: 'critical', description: 'Service provider (40%)', avatarColor: 'bg-surface-success-primary-initial', initials: 'JS' },
  { name: 'Tax Authority', identifier: 'EVP3710001100023', amount: '€145.83', status: 'Refunded', statusVariant: 'critical', description: 'Tax withholding (10%)', avatarColor: 'bg-surface-warning-primary-initial', initials: 'TA' },
];

const timelineEvents = [
  { time: '2026-04-03 14:22:01', event: 'Payment Received', description: 'Bank transfer received from customer', amount: '€1,457.34', variant: 'success' as const },
  { time: '2026-04-03 14:22:05', event: 'Split Initiated', description: 'Distribution to 3 beneficiaries started', amount: '', variant: 'success' as const },
  { time: '2026-04-03 14:22:08', event: 'Distribution: UAB Paysera LT', description: 'Platform fee transferred', amount: '€728.17', variant: 'success' as const },
  { time: '2026-04-03 14:22:08', event: 'Distribution: John Smith', description: 'Service provider payment', amount: '€583.34', variant: 'success' as const },
  { time: '2026-04-03 14:22:09', event: 'Tax Withholding', description: 'Tax withheld and transferred to Tax Authority', amount: '€145.83', variant: 'success' as const },
  { time: '2026-04-03 14:22:10', event: 'Settlement Complete', description: 'All distributions completed successfully', amount: '', variant: 'success' as const },
  { time: '2026-04-04 10:15:00', event: 'Refund Initiated', description: 'Admin initiated full refund for split payment', amount: '', variant: 'critical' as const },
  { time: '2026-04-04 10:15:03', event: 'Clawback: UAB Paysera LT', description: 'Platform fee reversed', amount: '-€728.17', variant: 'critical' as const },
  { time: '2026-04-04 10:15:03', event: 'Clawback: John Smith', description: 'Service provider payment reversed', amount: '-€583.34', variant: 'critical' as const },
  { time: '2026-04-04 10:15:04', event: 'Clawback: Tax Authority', description: 'Tax withholding reversed', amount: '-€145.83', variant: 'critical' as const },
  { time: '2026-04-04 10:15:05', event: 'Refund Complete', description: 'Full refund of €1,457.34 returned to customer', amount: '-€1,457.34', variant: 'critical' as const },
];

export default function AdminPaymentDetailsRefundModal() {
  const [showRefundModal, setShowRefundModal] = useState(true);

  return (
    <div className="min-h-screen bg-background-neutral-primary-initial">
      <div className="max-w-screen-lg mx-auto p-8">
        <Breadcrumbs
          items={[
            { id: 'payments', label: 'Payments', path: '/payments' },
            { id: 'detail', label: 'TXN-20260403-00142', path: '#' },
          ]}
          activeBreadcrumb="detail"
        />

        <div className="flex items-center justify-between mt-4 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="headline-m text-neutral-primary-initial">Payment TXN-20260403-00142</h1>
            <StatusTag variant="critical" label="Refunded" size="md" />
            <Badge variant="primary">Split: 3 recipients</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button label="Refund" variant="critical" onClick={() => setShowRefundModal(true)} disabled />
          </div>
        </div>

        <Alert variant="warning" title="Payment refunded">
          This split payment was fully refunded on 2026-04-04. All distributions have been reversed.
        </Alert>

        <div className="flex gap-6 mt-6">
          <div className="flex-1 min-w-0">
            <Tabs defaultTab="details">
              <Tab tabKey="details" label="Details">
                <Card header="Distribution Breakdown">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="body-l text-neutral-secondary-initial">Order amount</span>
                    <span className="title-m text-neutral-primary-initial line-through">€1,457.34</span>
                  </div>

                  <div className="divide-y divide-neutral-secondary-initial">
                    {beneficiaries.map((b) => (
                      <div key={b.identifier} className="py-4 flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full ${b.avatarColor} flex items-center justify-center shrink-0 opacity-60`}>
                          <span className="label-s text-inversed-primary-initial">{b.initials}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="label-m text-neutral-primary-initial truncate">{b.name}</span>
                            <StatusTag variant={b.statusVariant} label={b.status} />
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="code-s text-neutral-secondary-initial">{b.identifier}</span>
                            <span className="body-s text-neutral-secondary-initial">· {b.description}</span>
                          </div>
                        </div>
                        <span className="title-m text-neutral-primary-initial whitespace-nowrap line-through">{b.amount}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-neutral-secondary-initial">
                    <div className="flex items-center justify-between">
                      <span className="label-m text-neutral-primary-initial">Total collected</span>
                      <span className="title-m text-neutral-primary-initial line-through">€1,457.34</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="body-s text-neutral-secondary-initial">Refunded to customer</span>
                      <span className="body-s text-critical-primary-initial">€1,457.34</span>
                    </div>
                  </div>
                </Card>
              </Tab>

              <Tab tabKey="timeline" label="Timeline">
                <Card header="Transaction Timeline">
                  <div className="relative">
                    {timelineEvents.map((evt, i) => (
                      <div key={i} className="flex gap-4 pb-6 last:pb-0">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full shrink-0 mt-1 ${
                            evt.variant === 'critical'
                              ? 'bg-surface-critical-primary-initial'
                              : 'bg-surface-action-primary-initial'
                          }`} />
                          {i < timelineEvents.length - 1 && (
                            <div className="w-px flex-1 bg-neutral-secondary-initial mt-1" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className={`label-m ${
                              evt.variant === 'critical'
                                ? 'text-critical-primary-initial'
                                : 'text-neutral-primary-initial'
                            }`}>{evt.event}</span>
                            {evt.amount && (
                              <span className={`label-m ${
                                evt.variant === 'critical'
                                  ? 'text-critical-primary-initial'
                                  : 'text-neutral-primary-initial'
                              }`}>{evt.amount}</span>
                            )}
                          </div>
                          <p className="body-s text-neutral-secondary-initial mt-0.5">{evt.description}</p>
                          <span className="code-s text-neutral-secondary-initial">{evt.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </Tab>
            </Tabs>
          </div>

          <aside className="w-[280px] shrink-0" role="complementary">
            <div className="sticky top-8 rounded-lg border border-neutral-secondary-initial p-6">
              <div className="mb-4">
                <span className="body-s text-neutral-secondary-initial">Payment Amount</span>
                <p className="headline-m text-neutral-primary-initial line-through">€1,457.34</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="body-s text-neutral-secondary-initial">Method</span>
                  <span className="label-m text-neutral-primary-initial">Bank Transfer</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-s text-neutral-secondary-initial">Date</span>
                  <span className="label-m text-neutral-primary-initial">2026-04-03</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-s text-neutral-secondary-initial">Order</span>
                  <span className="label-m text-action-primary-initial">ORD-8834</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-s text-neutral-secondary-initial">Beneficiaries</span>
                  <span className="label-m text-neutral-primary-initial">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-s text-neutral-secondary-initial">Refunded</span>
                  <span className="label-m text-critical-primary-initial">2026-04-04</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Modal
        open={showRefundModal}
        onClose={() => setShowRefundModal(false)}
        heading="Refund Split Payment"
        description="This will reverse all distributions to beneficiaries."
        size="md"
        footer={
          <>
            <Button label="Cancel" variant="ghost" onClick={() => setShowRefundModal(false)} />
            <Button label="Confirm Refund" variant="critical" />
          </>
        }
      >
        <Alert variant="warning" title="Split payment with 3 beneficiaries">
          Refunding this payment will reverse distributions to all 3 beneficiaries.
          Each beneficiary's distributed amount will be clawed back. This action cannot be undone.
        </Alert>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="body-s text-neutral-secondary-initial">UAB Paysera LT</span>
            <span className="label-m text-neutral-primary-initial">-€728.17</span>
          </div>
          <div className="flex justify-between">
            <span className="body-s text-neutral-secondary-initial">John Smith</span>
            <span className="label-m text-neutral-primary-initial">-€583.34</span>
          </div>
          <div className="flex justify-between">
            <span className="body-s text-neutral-secondary-initial">Tax Authority</span>
            <span className="label-m text-neutral-primary-initial">-€145.83</span>
          </div>
          <div className="pt-2 border-t border-neutral-secondary-initial flex justify-between">
            <span className="label-m text-neutral-primary-initial">Total refund</span>
            <span className="title-m text-critical-primary-initial">€1,457.34</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
