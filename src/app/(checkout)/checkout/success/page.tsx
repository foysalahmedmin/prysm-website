import { Suspense } from 'react'
import { OrderConfirmationView } from '@/components/commerce/order-success-view'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('checkout-success')

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto min-h-[50vh] max-w-4xl py-20 text-center">
          <div className="glass mx-auto max-w-sm rounded-3xl p-8">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-ink border-t-transparent" />
            <p className="mt-4 font-mono text-xs tracking-widest text-ink-soft uppercase">
              Loading Receipt...
            </p>
          </div>
        </div>
      }
    >
      <OrderConfirmationView />
    </Suspense>
  )
}
