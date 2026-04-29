import { Breadcrumbs, Badge, Button, Card, StatusTag, Tabs, Tab, Alert } from '@paysera/ui';

type Beneficiary = {
  name: string;
  identifier: string;
  amount: string;
  status: string;
  statusVariant: 'success' | 'warning' | 'critical' | 'disabled';
  description: string;
  avatarColor: string;
  initials: string;
  failureReason?: string;
};

const beneficiaries: Beneficiary[] = [
  { name: 'UAB Paysera LT', identifier: 'EVP3710002583421', amount: '€1,170.00', status: 'Paid Out', statusVariant: 'success', description: 'Platform fee (50%)', avatarColor: 'bg-surface-action-primary-initial', initials: 'PL' },
  { name: 'Jane Doe', identifier: 'PSR-12345', amount: '€585.00', status: 'Failed', statusVariant: 'critical', description: 'Service provider (25%)', avatarColor: 'bg-surface-critical-primary-initial', initials: 'JD', failureReason: 'Recipient account closed' },
  { name: 'Acme Corp', identifier: 'EVP3710009922110', amount: '€585.00', status: 'Paid Out', statusVariant: 'success', description: 'Partner share (25%)', avatarColor: 'bg-surface-info-primary-initial', initials: 'AC' },
  { name: 'Tax Authority', identifier: 'EVP3710001100023', amount: '€0.00', status: 'Failed', statusVariant: 'critical', description: 'Tax withholding (0%)', avatarColor: 'bg-surface-warning-primary-initial', initials: 'TA', failureReason: 'Transfer timeout — retry possible' },
];

const timelineEvents = [
  { time: '2026-04-02 18:45:01', event: 'Payment Received', description: 'Bank transfer received', amount: '€2,340.00', variant: 'success' as const },
  { time: '2026-04-02 18:45:05', event: 'Split Initiated', description: 'Distribution to 4 beneficiaries started', amount: '', variant: 'success' as const },
  { time: '2026-04-02 18:45:08', event: 'Distribution: UAB Paysera LT', description: 'Platform fee transferred', amount: '€1,170.00', variant: 'success' as const },
  { time: '2026-04-02 18:45:09', event: 'Distribution: Jane Doe — FAILED', description: 'Recipient account closed', amount: '€585.00', variant: 'critical' as const },
  { time: '2026-04-02 18:45:10', event: 'Distribution: Acme Corp', description: 'Partner share transferred', amount: '€585.00', variant: 'success' as const },
  { time: '2026-04-02 18:45:11', event: 'Distribution: Tax Authority — FAILED', description: 'Transfer timeout', amount: '€0.00', variant: 'critical' as const },
];

export default function AdminPaymentDetailsFailed() {
  return (
    <div className="min-h-screen bg-background-neutral-primary-initial">
      <div className="max-w-screen-lg mx-auto p-8">
        <Breadcrumbs
          items={[
            { id: 'payments', label: 'Payments', path: '/payments' },
            { id: 'detail', label: 'TXN-20260402-00140', path: '#' },
          ]}
          activeBreadcrumb="detail"
        />

        <div className="flex items-center justify-between mt-4 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="headline-m text-neutral-primary-initial">Payment TXN-20260402-00140</h1>
            <StatusTag variant="warning" label="Partially Distributed" size="md" />
            <Badge variant="primary">Split: 4 recipients</Badge>
          </div>
        </div>

        <Alert variant="critical" title="Distribution failed for 2 beneficiaries">
          Some distributions could not be completed. Review the failed beneficiaries below
          and retry if applicable.
        </Alert>

        <div className="flex gap-6 mt-6">
          <div className="flex-1 min-w-0">
            <Tabs defaultTab="details">
              <Tab tabKey="details" label="Details">
                <Card header="Distribution Breakdown">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="body-l text-neutral-secondary-initial">Order amount</span>
                    <span className="title-m text-neutral-primary-initial">€2,340.00</span>
                  </div>

                  <div className="divide-y divide-neutral-secondary-initial">
                    {beneficiaries.map((b) => (
                      <div key={b.identifier} className="py-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full ${b.avatarColor} flex items-center justify-center shrink-0`}>
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
                          <div className="flex items-center gap-3">
                            <span className="title-m text-neutral-primary-initial whitespace-nowrap">{b.amount}</span>
                            {b.failureReason && (
                              <Button label="Retry" variant="secondary" size="sm" />
                            )}
                          </div>
                        </div>
                        {b.failureReason && (
                          <div className="ml-14 mt-2">
                            <Alert variant="critical" title={b.failureReason} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-neutral-secondary-initial">
                    <div className="flex items-center justify-between">
                      <span className="label-m text-neutral-primary-initial">Total collected</span>
                      <span className="title-m text-neutral-primary-initial">€2,340.00</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="body-s text-neutral-secondary-initial">Successfully distributed</span>
                      <span className="body-s text-success-primary-initial">€1,755.00</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="body-s text-neutral-secondary-initial">Failed</span>
                      <span className="body-s text-critical-primary-initial">€585.00</span>
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
                              <span className="label-m text-neutral-primary-initial">{evt.amount}</span>
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
                <p className="headline-m text-neutral-primary-initial">€2,340.00</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="body-s text-neutral-secondary-initial">Method</span>
                  <span className="label-m text-neutral-primary-initial">Bank Transfer</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-s text-neutral-secondary-initial">Date</span>
                  <span className="label-m text-neutral-primary-initial">2026-04-02</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-s text-neutral-secondary-initial">Order</span>
                  <span className="label-m text-action-primary-initial">ORD-8830</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-s text-neutral-secondary-initial">Beneficiaries</span>
                  <span className="label-m text-neutral-primary-initial">4</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-s text-neutral-secondary-initial">Failed</span>
                  <span className="label-m text-critical-primary-initial">2</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
