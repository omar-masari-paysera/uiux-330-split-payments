import { Breadcrumbs, Badge, Card, StatusTag, Tabs, Tab } from '@paysera/ui';

type Beneficiary = {
  name: string;
  identifier: string;
  amount: string;
  description: string;
  avatarColor: string;
  initials: string;
};

const beneficiaries: Beneficiary[] = [
  { name: 'UAB Paysera LT', identifier: 'EVP3710002583421', amount: '€728.17', description: 'Platform fee (50%)', avatarColor: 'bg-surface-action-primary-initial', initials: 'PL' },
  { name: 'John Smith', identifier: 'PSR-45892', amount: '€583.34', description: 'Service provider (40%)', avatarColor: 'bg-surface-success-primary-initial', initials: 'JS' },
  { name: 'Tax Authority', identifier: 'EVP3710001100023', amount: '€145.83', description: 'Tax withholding (10%)', avatarColor: 'bg-surface-warning-primary-initial', initials: 'TA' },
];

const timelineEvents = [
  { time: '2026-04-03 14:22:01', event: 'Payment Received', description: 'Bank transfer received from customer', amount: '€1,457.34' },
  { time: '2026-04-03 14:22:05', event: 'Split Initiated', description: 'Distribution to 3 beneficiaries started', amount: '' },
  { time: '2026-04-03 14:22:08', event: 'Distribution: UAB Paysera LT', description: 'Platform fee transferred', amount: '€728.17' },
  { time: '2026-04-03 14:22:08', event: 'Distribution: John Smith', description: 'Service provider payment', amount: '€583.34' },
  { time: '2026-04-03 14:22:09', event: 'Tax Withholding', description: 'Tax withheld and transferred to Tax Authority', amount: '€145.83' },
  { time: '2026-04-03 14:22:10', event: 'Settlement Complete', description: 'All distributions completed successfully', amount: '' },
];

export default function MerchantPaymentDetailsSettled() {
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

        <div className="flex items-center gap-3 mt-4 mb-6">
          <h1 className="headline-m text-neutral-primary-initial">Payment TXN-20260403-00142</h1>
          <StatusTag variant="success" label="Settled" size="md" />
          <Badge variant="primary">Split: 3 recipients</Badge>
        </div>

        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            <Tabs defaultTab="details">
              <Tab tabKey="details" label="Details">
                <Card header="Distribution Breakdown">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="body-l text-neutral-secondary-initial">Order amount</span>
                    <span className="title-m text-neutral-primary-initial">€1,457.34</span>
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
                            <StatusTag variant="success" label="Paid Out" />
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
                    <span className="title-m text-neutral-primary-initial">€1,457.34</span>
                  </div>
                </Card>
              </Tab>

              <Tab tabKey="timeline" label="Timeline">
                <Card header="Transaction Timeline">
                  <div className="relative">
                    {timelineEvents.map((evt, i) => (
                      <div key={i} className="flex gap-4 pb-6 last:pb-0">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-surface-action-primary-initial shrink-0 mt-1" />
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
                <p className="headline-m text-neutral-primary-initial">€1,457.34</p>
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
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
