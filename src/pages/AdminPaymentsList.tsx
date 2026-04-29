import { useState } from 'react';
import { Table, Badge, Button, StatusTag } from '@paysera/ui';
import type { Column } from '@paysera/ui';

type Payment = {
  id: string;
  date: string;
  status: string;
  statusVariant: 'success' | 'warning' | 'critical' | 'disabled';
  order: string;
  method: string;
  amount: string;
  isSplit: boolean;
  splitCount?: number;
};

const payments: Payment[] = [
  { id: 'TXN-20260403-00142', date: '2026-04-03 14:22', status: 'Settled', statusVariant: 'success', order: 'ORD-8834', method: 'Bank Transfer', amount: '€1,456.34', isSplit: true, splitCount: 3 },
  { id: 'TXN-20260403-00141', date: '2026-04-03 13:15', status: 'Settled', statusVariant: 'success', order: 'ORD-8833', method: 'Card', amount: '€89.00', isSplit: false },
  { id: 'TXN-20260402-00140', date: '2026-04-02 18:45', status: 'Partially Distributed', statusVariant: 'warning', order: 'ORD-8830', method: 'Bank Transfer', amount: '€2,340.00', isSplit: true, splitCount: 4 },
  { id: 'TXN-20260402-00139', date: '2026-04-02 16:30', status: 'Failed', statusVariant: 'critical', order: 'ORD-8829', method: 'Card', amount: '€567.80', isSplit: true, splitCount: 2 },
  { id: 'TXN-20260402-00138', date: '2026-04-02 11:00', status: 'Pending', statusVariant: 'warning', order: 'ORD-8828', method: 'Bank Transfer', amount: '€123.45', isSplit: false },
  { id: 'TXN-20260401-00137', date: '2026-04-01 09:20', status: 'On Hold', statusVariant: 'disabled', order: 'ORD-8825', method: 'Card', amount: '€890.00', isSplit: true, splitCount: 2 },
  { id: 'TXN-20260401-00136', date: '2026-04-01 08:45', status: 'Settled', statusVariant: 'success', order: 'ORD-8824', method: 'Bank Transfer', amount: '€45.00', isSplit: false },
  { id: 'TXN-20260331-00135', date: '2026-03-31 22:10', status: 'Settled', statusVariant: 'success', order: 'ORD-8820', method: 'Card', amount: '€3,200.00', isSplit: true, splitCount: 5 },
];

const columns: Column<Payment>[] = [
  { id: 'date', header: 'Date', accessorKey: 'date', sortable: true },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => (
      <StatusTag variant={row.original.statusVariant} label={row.original.status} />
    ),
  },
  { id: 'order', header: 'Order', accessorKey: 'order' },
  { id: 'method', header: 'Payment method', accessorKey: 'method' },
  {
    id: 'split',
    header: 'Split',
    accessorFn: (row) => row.isSplit ? `Split: ${row.splitCount} recipients` : '',
    cell: ({ row }) =>
      row.original.isSplit ? (
        <Badge variant="primary">Split: {row.original.splitCount} recipients</Badge>
      ) : null,
  },
  { id: 'amount', header: 'Amount', accessorKey: 'amount', alignment: 'right' },
];

export default function AdminPaymentsList() {
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);
  const [page, setPage] = useState(0);

  return (
    <div className="min-h-screen bg-background-neutral-primary-initial">
      <div className="max-w-screen-lg mx-auto p-8">
        <div className="mb-6">
          <h1 className="headline-m text-neutral-primary-initial">Payments</h1>
        </div>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <Button label="Status" variant="secondary" size="sm" />
          <Button label="Payment method" variant="secondary" size="sm" />
          <Button label="Date range" variant="secondary" size="sm" />
        </div>

        <Table
          columns={columns}
          data={payments}
          sorting={{ sortBy: sorting, onSortChange: setSorting }}
          pagination={{
            pageIndex: page,
            pageSize: 10,
            total: payments.length,
            onPageChange: setPage,
          }}
          onRowClick={(row) => {
            window.location.href = `/payments/${row.id}`;
          }}
        />
      </div>
    </div>
  );
}
