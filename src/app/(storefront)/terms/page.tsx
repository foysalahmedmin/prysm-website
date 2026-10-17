import { PolicyView } from '@/components/editorial/policy-view'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('terms')

const SECTIONS = [
  {
    heading: '1. Storefront Terms & Demo Agreement',
    content: [
      'Welcome to the PRYSM luxury atelier digital experience. By browsing our collections, utilizing the Mirror Try virtual chamber, or placing mock orders, you enter into this client agreement governed by these terms of service.',
      'This website operates as a high-fidelity demonstration platform showcasing luxury apparel e-commerce architecture and dynamic virtual fitting integrations. Transactions simulated on this site do not result in monetary charges to actual financial instruments.',
    ],
  },
  {
    heading: '2. Intellectual Property & Optical Technology',
    content: [
      'All textile imagery, garment designs, tailoring patterns, optical lens shaders, brand names, and software interfaces are the exclusive proprietary property of PRYSM Atelier and its licensors.',
      'Reproduction, scraping, decompilation, or unauthorized exploitation of our digital catalog or Mirror Try engine is strictly prohibited.',
    ],
  },
  {
    heading: '3. Pricing, Availability & Orders',
    content: [
      'Prices displayed are formatted in United States Dollars (USD) and represent curated benchmark luxury valuations. We reserve the right to modify piece availability, edition runs, and listed values without prior notice.',
      'Order confirmations generated via our checkout flow acknowledge receipt of mock orders and reserve simulated atelier allocation.',
    ],
  },
  {
    heading: '4. Governing Law & Dispute Resolution',
    content: [
      'These Terms of Service and any agreement arising from your use of this storefront shall be construed and governed in accordance with the laws of the State of New York, without regard to conflict of law principles.',
      'Any claim or dispute shall be submitted to the confidential jurisdiction of state or federal courts located in New York County, New York.',
    ],
  },
]

export default function TermsPage() {
  return (
    <PolicyView
      title="Terms of Service & Client Agreement"
      subtitle="Governing rules, intellectual property terms, and consumer guidelines."
      lastUpdated="October 2026"
      sections={SECTIONS}
    />
  )
}
