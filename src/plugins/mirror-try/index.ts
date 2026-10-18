/**
 * Mirror Try, the virtual fitting plugin. A store mounts `MirrorTry` once, places
 * `MirrorTryTrigger` on product cards and pages, and may call `openMirrorTry` from its own buttons.
 * Everything else, from the camera to the shopper's account, belongs to the plugin.
 */
export { MirrorTry } from './mirror-try'
export { MirrorTryTrigger } from './trigger'
export { open as openMirrorTry } from './controller'
export { canTryOn } from './fit'
export type * from './types'
