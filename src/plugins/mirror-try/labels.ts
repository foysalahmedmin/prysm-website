/**
 * The plugin's own default copy and brand terminology.
 * A store may override any label through <MirrorTryProvider labels={{ ... }}>.
 */
export const defaultLabels = {
  tryOn: 'Try on',
  title: 'Mirror Try',
  subtitle: 'Virtual fitting preview',
  addToCartAction: 'Add to Cart',
  addToBag: 'Add to Bag',
  addToCart: 'Add to Cart',
  addToBasket: 'Add to Basket',
  sampleSize: 'Sample',
  modelsMode: 'Sample Models',
  uploadMode: 'Upload Photo',
  cameraMode: 'Live Camera',
  captureAction: 'Capture Look',
  close: 'Close',
} as const

export type MirrorTryLabels = { [K in keyof typeof defaultLabels]: string }
