/** The plugin's own default copy. A store may override any label through the provider. */
export const defaultLabels = {
  tryOn: 'Try on',
} as const

export type MirrorTryLabels = { [K in keyof typeof defaultLabels]: string }
