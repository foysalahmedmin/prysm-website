import type { FaqItem } from '@/domain'

export const faq: FaqItem[] = [
  // Orders (3)
  {
    id: 'faq-ord-1',
    group: 'Orders',
    question: 'How do I track my order once placed?',
    answer:
      'Once your order is dispatched from our climate-controlled atelier, you will receive an encrypted tracking link via email. You can also view live status updates directly within your Account portal.',
  },
  {
    id: 'faq-ord-2',
    group: 'Orders',
    question: 'Can I amend or cancel my order after confirmation?',
    answer:
      'Because our ateliers begin garment preparation immediately to meet express dispatch schedules, orders can only be modified within 60 minutes of confirmation through our Client Concierge.',
  },
  {
    id: 'faq-ord-3',
    group: 'Orders',
    question: 'What payment methods are accepted?',
    answer:
      'We accept all major international credit cards (Visa, MasterCard, American Express), Apple Pay, Google Pay, and interest-free installment plans through Klarna and Affirm.',
  },

  // Shipping (3)
  {
    id: 'faq-shp-1',
    group: 'Shipping',
    question: 'What are the delivery timelines and costs?',
    answer:
      'Standard Delivery ($8 or complimentary for orders over $150) takes 3 to 6 business days. Express Air Delivery ($18) guarantees delivery within 1 to 2 business days.',
  },
  {
    id: 'faq-shp-2',
    group: 'Shipping',
    question: 'Do you ship internationally with duties prepaid?',
    answer:
      'Yes. We deliver to over 60 countries via DHL Express. All international customs duties, local import taxes, and VAT are calculated and guaranteed at checkout with no additional fees on arrival.',
  },
  {
    id: 'faq-shp-3',
    group: 'Shipping',
    question: 'How is PRYSM packaging designed?',
    answer:
      'Every piece is folded in acid-free tissue, enclosed within a reusable 100% organic cotton dust shroud, and presented in a recyclable rigid slide box sealed with tamper-evident paper tape.',
  },

  // Returns (3)
  {
    id: 'faq-ret-1',
    group: 'Returns',
    question: 'What is the return window?',
    answer:
      'We offer complimentary returns within 30 days of delivery. Garments must be unworn, unwashed, and in their original condition with all security ribbon tags intact.',
  },
  {
    id: 'faq-ret-2',
    group: 'Returns',
    question: 'How do I book a complimentary courier collection?',
    answer:
      'Log in to your Account, select your order number, and click Request Return to generate a prepaid return shipping label and schedule a contactless doorstep courier collection.',
  },
  {
    id: 'faq-ret-3',
    group: 'Returns',
    question: 'How long until my refund is processed?',
    answer:
      'Once our quality inspection team confirms garment condition at the distribution center, refunds are credited back to your original payment method within 3 to 5 business days.',
  },

  // Sizing (3)
  {
    id: 'faq-siz-1',
    group: 'Sizing',
    question: 'How does PRYSM tailoring fit compared to standard sizing?',
    answer:
      'Our tailored jackets and blazers feature architectural shoulders with contemporary ease through the waist. We recommend taking your true chest size or referring to our flat centimeter size chart.',
  },
  {
    id: 'faq-siz-2',
    group: 'Sizing',
    question: 'Can PRYSM trousers be lengthened or hemmed?',
    answer:
      'Yes. All trousers are finished with a blind hem containing a 5cm interior fabric allowance, allowing our private store tailors or your local tailor to easily alter length.',
  },
  {
    id: 'faq-siz-3',
    group: 'Sizing',
    question: 'What if I am between sizes?',
    answer:
      'For unstructured pieces in liquid silk or knitwear, size down for a slimmer silhouette or take your larger size for an effortless draped look. For tailored outerwear, we recommend taking the larger size to allow for layering.',
  },

  // Try on (2)
  {
    id: 'faq-try-1',
    group: 'Try on',
    question: 'How does the Mirror Try virtual fitting room work?',
    answer:
      'Click "Try On" on any compatible product page to enter the Spectral Chamber. Our calibrated physics engine maps real garment weight, drape, and sleeve drop in real time without requiring webcam capture.',
  },
  {
    id: 'faq-try-2',
    group: 'Try on',
    question: 'Which garments are currently supported for virtual try-on?',
    answer:
      'Version 1 of the Mirror Try plugin is optimized for upper-body silhouettes, including tailored trench coats, double-breasted blazers, liquid silk button-downs, and heavyweight knitwear.',
  },
]
