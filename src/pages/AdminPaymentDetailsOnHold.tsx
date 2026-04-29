import { Breadcrumbs, Badge, Card, StatusTag, Tabs, Tab, Tooltip, Alert } from '@paysera/ui';

type Beneficiary = {
  name: string;
  identifier: string;
  amount: string;
  status: string;
  statusVariant: 'success' | 'warning' | 'critical' | 'disabled';
  description: string;
  avatarColor: string;
  initials: string;
  holdReason?: string;
};

const beneficiaries: Beneficiary[] = [
  { name: 'UAB Paysera LT', identifier: 'EVP3710002583421', amount: '€445.00', status: 'On Hold', statusVariant: 'disabled', description: 'Platform fee (50%)', avatarColor: 'bg-surface-action-primary-initial', initials: 'PL', holdReason: '48-hour reserve policy for new merchants' },
  { name: 'Maria Garcia', identifier: 'PSR-78234', amount: '€445.00', status: 'On Hold', statusVariant: 'disabled', description: 'Service provider (50%)', avatarColor: 'bg-surface-info-primary-initial', initials: 'MG', holdReason: '48-hour reserve policy for new merchants' },
];

const timelineEvents = [
  { time: '2026-04-01 09:20:01', event: 'Payment Received', description: 'Card payment received from customer', amount: '€890.00' },
  { time: '2026-04-01 09:20:05', event: 'Split Initiated', description: 'Distribution to 2 beneficiaries started', amount: '' },
  { time: '2026-04-01 09:20:06', event: 'Distribution: UAB Paysera LT — On Hold', description: 'Reserve policy active — release after 2026-04-03 09:20', amount: '€445.00' },
  { time: '2026-04-01 09:20:06', event: 'Distribution: Maria Garcia — On Hold', description: 'Reserve policy active — release after 2026-04-03 09:20', amount: '€445.00' },
];

export default function AdminPaymentDetailsOnHold() {
  return (
    <div className="min-h-screen bg-background-neutral-primary-initial">
      <div className="max-w-screen-lg mx-auto p-8">
        <Breadcrumbs
          items={[
            { id: 'payments', label: 'Payments', path: '/payments' },
            { id: 'detail', label: 'TXN-20260401-00137', path: '#' },
          ]}
          activeBreadcrumb="detail"
        />

        <div className="flex items-center justify-between mt-4 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="headline-m text-neutral-primary-initial">Payment TXN-20260401-00137</h1>
            <StatusTag variant="disabled" label="On Hold" size="md" />
            <Badge variant="primary">Split: 2 recipients</Badge>
          </div>
        </div>

        <Alert variant="info" title="Payment on hold">
          Distributions are held under the 48-hour reserve policy for new merchants.
          Funds will be released automatically on 2026-04-03.
        </Alert>

        <div className="flex gap-6 mt-6">
          <div className="flex-1 min-w-0">
            <Tabs defaultTab="details">
              <Tab tabKey="details" label="Details">
                <Card header="Distribution Breakdown">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="body-l text-neutral-secondary-initial">Order amount</span>
                    <span className="title-m text-neutral-primary-initial">€890.00</span>
                  </div>

                  <div className="divide-y divide-neutral-secondary-initial">
                    {beneficiaries.map((b) => (
                      <div key={b.identifier} className="py-4 flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full ${b.avatarColor} flex items-center justify-center shrink-0`}>
                          <span className="label-s text-inversed-primary-initial">{b.initials}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="label-m text-neutral-primary-initial truncate">{b.name}</span>
                            <Tooltip
                              title="On Hold"
                              description={b.holdReason}
                              size="lg"
                            >
                              <span>
                                <StatusTag variant={b.statusVariant} label={b.status} />
                              </span>
                            </Tooltip>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="code-s text-neutral-secondary-initial">{b.identifier}</span>
                            <span className="body-s text-neutral-secondary-initial">· {b.description}</span>
                          </div>
                        </div>
                        <span className="title-m text-neutral-primary-initial whitespace-nowrap">{b.amount}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-neutral-secondary-initial flex items-center justify-between">
                    <span className="label-m text-neutral-primary-initial">Total collected</span>
                    <span className="title-m text-neutral-primary-initial">€890.00</span>
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
                            evt.event.includes('On Hold')
                              ? 'bg-surface-neutral-secondary-initial'
                              : 'bg-surface-action-primary-initial'
                          }`} />
                          {i < timelineEvents.length - 1 && (
                            <div className="w-px flex-1 bg-neutral-secondary-initial mt-1" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="label-m text-neutral-primary-initial">{evt.event}</span>
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
                <p className="headline-m text-neutral-primary-initial">€890.00</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="body-s text-neutral-secondary-initial">Method</span>
                  <span className="label-m text-neutral-primary-initial">Card</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-s text-neutral-secondary-initial">Date</span>
                  <span className="label-m text-neutral-primary-initial">2026-04-01</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-s text-neutral-secondary-initial">Order</span>
                  <span className="label-m text-action-primary-initial">ORD-8825</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-s text-neutral-secondary-initial">Beneficiaries</span>
                  <span className="label-m text-neutral-primary-initial">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-s text-neutral-secondary-initial">Hold release</span>
                  <span className="label-m text-neutral-primary-initial">2026-04-03</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
