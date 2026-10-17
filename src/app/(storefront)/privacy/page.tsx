import { PolicyView } from '@/components/editorial/policy-view'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('privacy')

const SECTIONS = [
  {
    heading: '1. Privacy Charter & Data Stewardship',
    content: [
      'PRYSM Atelier values individual privacy as an essential luxury standard. This Privacy Policy details how we collect, safeguard, and process your personal data when navigating our digital atelier, engaging our virtual try-on technology, or commissioning garments.',
      'We treat client information with absolute confidentiality. We never sell, lease, or monetize your personal identity, browsing analytics, or biometric try-on inputs to third-party data brokers.',
    ],
  },
  {
    heading: '2. Information We Collect',
    content: [
      'Account & Transaction Data: Your full name, delivery address, billing records, email address, and order history necessary to fulfill luxury dispatch and customs clearances.',
      'Mirror Try Biometrics & Telemetry: When you interact with our virtual fitting chamber, torso anchor calculations and silhouette adjustments are processed ephemerally in your browser session. No raw video feed or personal body photography is stored on our servers.',
    ],
  },
  {
    heading: '3. Cookie Policy & Preferences',
    content: [
      'We deploy strictly necessary cookies to preserve your shopping bag contents, authenticate your client portal session, and remember currency preferences.',
      'Analytical cookies are loaded only with your consent to assist in optimizing website latency and optical rendering performance. You may modify your cookie preferences at any time in your browser settings.',
    ],
  },
  {
    heading: '4. Consumer Rights & Data Deletion',
    content: [
      'In accordance with global privacy regulations (including GDPR and CCPA), you hold the right to access, rectify, or request permanent deletion of your customer record and order archives.',
      'To exercise any data rights, submit a verified request directly to our privacy concierge via concierge@prysm-atelier.com.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <PolicyView
      title="Privacy Policy & Data Charter"
      subtitle="Our commitments to client confidentiality, cookie governance, and digital security."
      lastUpdated="October 2026"
      sections={SECTIONS}
    />
  )
}
