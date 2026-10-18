import { useId, type ReactNode, type SVGProps } from 'react'

/** The plugin draws its own icons so it never depends on a store's icon set. */

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Icon({ size = 20, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

/** The Mirror Try mark: a green pane in perspective with a white ring. */
export function Logo(props: SVGProps<SVGSVGElement>) {
  const id = useId()
  return (
    <svg viewBox="0 0 56 64" aria-hidden="true" focusable="false" className="logo" {...props}>
      <defs>
        <linearGradient id={id} x1="0.75" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#8EF25C" />
          <stop offset="1" stopColor="#3CBA1A" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M0 17Q0 10.6 6.3 9.4L49.7 1.2Q56 0 56 6.4V57.6Q56 64 49.7 62.8L6.3 54.6Q0 53.4 0 47Z"
      />
      <circle cx="27.5" cy="32" r="16.5" fill="none" stroke="#fff" strokeWidth="8" />
    </svg>
  )
}

export const UserIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5c1.3-3.6 4.2-5.5 7.5-5.5s6.2 1.9 7.5 5.5" />
  </Icon>
)

export const MinusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5.5 12h13" />
  </Icon>
)

export const ExpandIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5M4 4l5.5 5.5M20 4l-5.5 5.5M4 20l5.5-5.5M20 20l-5.5-5.5" />
  </Icon>
)

export const CollapseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5M4 4l5 5M20 4l-5 5M4 20l5-5M20 20l-5-5" />
  </Icon>
)

export const CameraIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 9a2.5 2.5 0 0 1 2.5-2.5h1.6l1.5-2h4.8l1.5 2h1.6A2.5 2.5 0 0 1 20 9v7.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z" />
    <circle cx="12" cy="12.6" r="3.4" />
  </Icon>
)

export const CameraOffIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9.2 4.5h4.9l1.5 2h1.9A2.5 2.5 0 0 1 20 9v7.3M18 19H6.5A2.5 2.5 0 0 1 4 16.5V9a2.5 2.5 0 0 1 2-2.45" />
    <path d="M10.1 10.2a3.4 3.4 0 0 0 4.7 4.7M3 3l18 18" />
  </Icon>
)

export const SwitchCameraIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 9a2.5 2.5 0 0 1 2.5-2.5h1.6l1.5-2h4.8l1.5 2h1.6A2.5 2.5 0 0 1 20 9v7.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z" />
    <path d="M9 12.5a3 3 0 0 1 5.2-2M15 12.5a3 3 0 0 1-5.2 2M14.6 9v1.6H13M9.4 16v-1.6H11" />
  </Icon>
)

export const InfoIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5M12 8h.01" />
  </Icon>
)

export const BookmarkIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1z" />
  </Icon>
)

export const BulbIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9.5 18h5M10.5 21h3M12 3.5a5.5 5.5 0 0 0-3.3 9.9c.6.5 1 1.2 1 2V16h4.6v-.6c0-.8.4-1.5 1-2A5.5 5.5 0 0 0 12 3.5z" />
  </Icon>
)

export const CheckCircleIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.5 12.3 2.4 2.4 4.6-5" />
  </Icon>
)

export const PlayIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8 5.8v12.4a.6.6 0 0 0 .9.5l9.6-6.2a.6.6 0 0 0 0-1L8.9 5.3a.6.6 0 0 0-.9.5z" />
  </Icon>
)

export const ChevronDownIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </Icon>
)

export const ChevronLeftIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m14.5 6-6 6 6 6" />
  </Icon>
)

export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
)

export const TrashIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.5 7h15M9.5 7V4.8h5V7M6.5 7l.9 12.2a1 1 0 0 0 1 .8h7.2a1 1 0 0 0 1-.8L17.5 7M10 10.5v6M14 10.5v6" />
  </Icon>
)

export const EyeIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
)

export const EyeOffIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M10.6 5.6A9.8 9.8 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a16.4 16.4 0 0 1-2.4 3.2M6.6 6.6C3.9 8.3 2.5 12 2.5 12S6 18.5 12 18.5a9.4 9.4 0 0 0 5.4-1.7" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18" />
  </Icon>
)

/** The eight-ray spinner from the design files. */
export const Spinner = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    aria-hidden="true"
    focusable="false"
    className="spin"
  >
    <path d="M12 3v3.5" />
    <path d="M18.4 5.6 16 8" opacity="0.3" />
    <path d="M21 12h-3.5" opacity="0.4" />
    <path d="M18.4 18.4 16 16" opacity="0.5" />
    <path d="M12 21v-3.5" opacity="0.6" />
    <path d="M5.6 18.4 8 16" opacity="0.7" />
    <path d="M3 12h3.5" opacity="0.8" />
    <path d="M5.6 5.6 8 8" opacity="0.9" />
  </svg>
)

/** Google's own mark, as its sign-in guidelines ask. */
export const GoogleMark = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
  </svg>
)
