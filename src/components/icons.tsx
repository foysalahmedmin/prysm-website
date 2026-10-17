'use client'

import type { Icon, IconProps } from '@phosphor-icons/react'
import {
  ArrowLeft as PhosphorArrowLeft,
  ArrowRight as PhosphorArrowRight,
  CaretDown as PhosphorCaretDown,
  CaretUp as PhosphorCaretUp,
  Check as PhosphorCheck,
  Eye as PhosphorEye,
  Faders as PhosphorFaders,
  Heart as PhosphorHeart,
  MagnifyingGlass as PhosphorMagnifyingGlass,
  Minus as PhosphorMinus,
  Plus as PhosphorPlus,
  ShoppingBag as PhosphorShoppingBag,
  Sparkle as PhosphorSparkle,
  Trash as PhosphorTrash,
  User as PhosphorUser,
  X as PhosphorX,
} from '@phosphor-icons/react'

function createIcon(BaseIcon: Icon) {
  return function PrysmIcon({ weight = 'light', size = 20, ...props }: IconProps) {
    return <BaseIcon weight={weight} size={size} {...props} />
  }
}

export const ArrowLeft = createIcon(PhosphorArrowLeft)
export const ArrowRight = createIcon(PhosphorArrowRight)
export const CaretDown = createIcon(PhosphorCaretDown)
export const CaretUp = createIcon(PhosphorCaretUp)
export const Check = createIcon(PhosphorCheck)
export const Eye = createIcon(PhosphorEye)
export const Faders = createIcon(PhosphorFaders)
export const Heart = createIcon(PhosphorHeart)
export const MagnifyingGlass = createIcon(PhosphorMagnifyingGlass)
export const Minus = createIcon(PhosphorMinus)
export const Plus = createIcon(PhosphorPlus)
export const ShoppingBag = createIcon(PhosphorShoppingBag)
export const Sparkle = createIcon(PhosphorSparkle)
export const Trash = createIcon(PhosphorTrash)
export const User = createIcon(PhosphorUser)
export const X = createIcon(PhosphorX)
