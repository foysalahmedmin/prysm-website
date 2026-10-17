import { Suspense } from 'react'
import { AccountOrderDetailView } from '@/components/commerce/account-views'

interface PageProps {
  params: Promise<{ id: string }>
}

async function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <AccountOrderDetailView id={id} />
}

export default function OrderDetailPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="glass mx-auto max-w-md rounded-3xl p-8 text-center">Loading Order...</div>
      }
    >
      <OrderDetail params={props.params} />
    </Suspense>
  )
}
