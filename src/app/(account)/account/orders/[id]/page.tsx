import { Suspense } from 'react'
import { PageShell } from '@/components/layout/page-shell'

// Orders live in the browser until a backend exists, so this route cannot be prerendered per id.
// Reading `params` at request time must happen inside <Suspense> when Cache Components is on.
async function OrderDetail({ params }: Pick<PageProps<'/account/orders/[id]'>, 'params'>) {
  const { id } = await params
  return <PageShell id="order" description={`Order ${id}`} />
}

export default function OrderDetailPage(props: PageProps<'/account/orders/[id]'>) {
  return (
    <Suspense fallback={null}>
      <OrderDetail params={props.params} />
    </Suspense>
  )
}
