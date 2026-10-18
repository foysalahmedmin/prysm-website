/**
 * The plugin's whole stylesheet. It lives inside the plugin's shadow roots, so no store style can
 * reach in and none of these rules can leak out: the plugin looks the same on every store.
 */

const light = `
  --mt-ink: #18181b;
  --mt-ink-soft: #3f3f46;
  --mt-ink-muted: #5b5b63;
  --mt-glass: rgba(234, 234, 238, 0.76);
  --mt-glass-edge: rgba(255, 255, 255, 0.78);
  --mt-divider: rgba(255, 255, 255, 0.9);
  --mt-card: #ffffff;
  --mt-card-edge: rgba(24, 24, 27, 0.07);
  --mt-field: #f8f8f9;
  --mt-field-edge: #ebebee;
  --mt-chip: #f2f2f4;
  --mt-chip-hover: #e7e7ea;
  --mt-stage: #f7f7f8;
  --mt-stage-ink: #8b8b92;
  --mt-control: rgba(255, 255, 255, 0.94);
  --mt-danger: #b42318;
  --mt-danger-soft: rgba(180, 35, 24, 0.08);
  --mt-shadow: 0 32px 80px -28px rgba(17, 17, 26, 0.42), 0 10px 28px -14px rgba(17, 17, 26, 0.2);
  color-scheme: light;
`

const dark = `
  --mt-ink: #f4f4f5;
  --mt-ink-soft: #d4d4d8;
  --mt-ink-muted: #a6a6ae;
  --mt-glass: rgba(26, 26, 30, 0.8);
  --mt-glass-edge: rgba(255, 255, 255, 0.12);
  --mt-divider: rgba(255, 255, 255, 0.08);
  --mt-card: #232327;
  --mt-card-edge: rgba(255, 255, 255, 0.07);
  --mt-field: #2b2b30;
  --mt-field-edge: #3a3a41;
  --mt-chip: #303036;
  --mt-chip-hover: #3b3b42;
  --mt-stage: #1b1b1f;
  --mt-stage-ink: #8e8e96;
  --mt-control: rgba(255, 255, 255, 0.07);
  --mt-danger: #ff8a80;
  --mt-danger-soft: rgba(255, 138, 128, 0.12);
  --mt-shadow: 0 32px 80px -24px rgba(0, 0, 0, 0.7), 0 10px 28px -14px rgba(0, 0, 0, 0.5);
  color-scheme: dark;
`

export const css = /* css */ `
:host {
  all: initial;
}

.root {
  --mt-font: 'Mirror Try Urbanist', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto,
    sans-serif;
  --mt-green: #5ccf38;
  --mt-green-deep: #3daf1c;
  --mt-green-soft: rgba(92, 207, 56, 0.24);
  --mt-smoke: rgba(30, 26, 24, 0.66);
  --mt-on-dark: #ffffff;
  ${light}
  font-family: var(--mt-font);
  font-size: 16px;
  line-height: 1.4;
  color: var(--mt-ink);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
}
.root[data-theme='dark'] {
  ${dark}
}
@media (prefers-color-scheme: dark) {
  .root[data-theme='system'] {
    ${dark}
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
}
h2,
h3,
p,
ul,
ol,
fieldset {
  margin: 0;
  padding: 0;
  border: 0;
}
ul,
ol {
  list-style: none;
}
button,
input,
select {
  font: inherit;
  color: inherit;
  margin: 0;
  letter-spacing: inherit;
}
button {
  cursor: pointer;
  background: none;
  border: 0;
  padding: 0;
  -webkit-user-select: none;
  user-select: none;
}
button:disabled {
  cursor: not-allowed;
}
img,
svg,
video {
  display: block;
}
svg {
  flex: none;
}
:focus {
  outline: none;
}
:focus-visible {
  outline: 2px solid var(--mt-green);
  outline-offset: 2px;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ——— Smoked glass: the floating card and the product trigger ——— */

.smoke {
  display: inline-flex;
  align-items: center;
  color: var(--mt-on-dark);
  background: var(--mt-smoke);
  border: 1px solid rgba(255, 255, 255, 0.2);
  -webkit-backdrop-filter: blur(18px) saturate(1.5);
  backdrop-filter: blur(18px) saturate(1.5);
  box-shadow:
    0 14px 34px -14px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.16);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.18);
  font-family: var(--mt-font);
  white-space: nowrap;
  transition:
    background-color 0.18s ease,
    transform 0.18s ease,
    box-shadow 0.18s ease;
}
.smoke:hover {
  background: rgba(22, 19, 18, 0.76);
}
.smoke:active {
  transform: translateY(1px);
}

.launcher {
  position: fixed;
  z-index: 2147483000;
  left: var(--mirror-try-launcher-x, 20px);
  bottom: var(--mirror-try-launcher-y, 20px);
  gap: 12px;
  height: 58px;
  padding: 0 22px 0 16px;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 500;
  cursor: grab;
  touch-action: none;
  -webkit-user-select: none;
  user-select: none;
  animation: mt-rise 0.24s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.launcher[data-corner='bottom-right'] {
  left: auto;
  right: var(--mirror-try-launcher-x, 20px);
}
.launcher[data-placed] {
  right: auto;
  bottom: auto;
}
.launcher[data-dragging] {
  cursor: grabbing;
  transform: scale(1.03);
  box-shadow:
    0 26px 50px -18px rgba(0, 0, 0, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.16);
  transition: none;
}
.launcher .logo {
  width: 26px;
  height: 30px;
}
.launcher .live {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--mt-green);
  box-shadow: 0 0 0 3px rgba(92, 207, 56, 0.3);
  animation: mt-pulse 1.8s ease-in-out infinite;
}
@media (max-width: 639px) {
  .launcher {
    height: 48px;
    gap: 10px;
    padding: 0 16px 0 12px;
    border-radius: 11px;
    font-size: 17px;
  }
  .launcher .logo {
    width: 22px;
    height: 25px;
  }
}

.trigger {
  gap: 7px;
  height: 34px;
  padding: 0 13px 0 8px;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.01em;
}
.trigger .logo {
  width: 17px;
  height: 20px;
}
.trigger[data-size='md'] {
  gap: 11px;
  height: 56px;
  padding: 0 22px 0 16px;
  border-radius: 12px;
  font-size: 17px;
}
.trigger[data-size='md'] .logo {
  width: 24px;
  height: 28px;
}

/* ——— The panel ——— */

.panel {
  position: fixed;
  z-index: 2147483020;
  left: 50%;
  top: 50%;
  width: min(640px, calc(100vw - 32px));
  max-height: calc(100dvh - 32px);
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--mt-glass);
  border: 1px solid var(--mt-glass-edge);
  border-radius: 24px;
  -webkit-backdrop-filter: blur(32px) saturate(1.6);
  backdrop-filter: blur(32px) saturate(1.6);
  box-shadow: var(--mt-shadow);
  animation: mt-open 0.26s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.panel[hidden] {
  display: none;
}
.panel[data-maximized] {
  left: 16px;
  top: 16px;
  right: 16px;
  bottom: 16px;
  width: auto;
  max-height: none;
  transform: none;
}
@media (max-width: 639px) {
  .panel,
  .panel[data-maximized] {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: auto;
    max-height: none;
    transform: none;
    border-radius: 0;
    border: 0;
  }
  .ctrl[data-action='maximize'] {
    display: none;
  }
}

.header {
  flex: none;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 64px;
  padding: 0 14px 0 18px;
  border-bottom: 1px solid var(--mt-divider);
}
.header .brand {
  justify-self: start;
  width: 30px;
  height: 34px;
}
.header .brand svg {
  width: 100%;
  height: 100%;
}
.title {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;
}
.controls {
  justify-self: end;
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: 12px;
  background: var(--mt-control);
  box-shadow: 0 1px 2px rgba(17, 17, 26, 0.05);
}
.ctrl {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: var(--mt-chip);
  color: var(--mt-ink);
  transition: background-color 0.15s ease;
}
.ctrl:hover {
  background: var(--mt-chip-hover);
}
.ctrl[data-raised] {
  background: var(--mt-card);
  box-shadow:
    0 0 0 1px var(--mt-field-edge),
    0 1px 2px rgba(17, 17, 26, 0.06);
}
.ctrl[data-raised]:hover {
  background: var(--mt-field);
}

.body {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* ——— Camera stage ——— */

.stage {
  position: relative;
  flex: 0 1 auto;
  width: 100%;
  aspect-ratio: 5 / 3;
  min-height: 150px;
  overflow: hidden;
  background: var(--mt-stage);
}
.panel[data-maximized] .stage {
  flex: 1 1 auto;
  aspect-ratio: auto;
}
@media (max-width: 639px) {
  .stage {
    flex: 1 1 auto;
    aspect-ratio: auto;
  }
}
.stage video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scaleX(-1);
  background: #0e0e10;
}
.placeholder {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 14px;
  padding: 24px;
  text-align: center;
  color: var(--mt-stage-ink);
  font-size: 15px;
}
.tile {
  width: 72px;
  height: 72px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: var(--mt-chip);
  color: var(--mt-stage-ink);
}
.tile[data-tone='warn'] {
  color: var(--mt-danger);
}

.pill {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  max-width: calc(100% - 28px);
  padding: 7px 12px;
  border-radius: 9px;
  color: var(--mt-on-dark);
  background: rgba(22, 22, 26, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.14);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
button.pill {
  transition: background-color 0.15s ease;
}
button.pill:hover:not(:disabled) {
  background: rgba(22, 22, 26, 0.78);
}
button.pill:disabled {
  cursor: default;
}
.pill.center {
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%);
}
.pill.start {
  left: 14px;
  bottom: 14px;
}
.pill.end {
  right: 14px;
  bottom: 14px;
}
.pill.product {
  top: 14px;
  left: 14px;
  max-width: calc(100% - 84px);
  padding: 5px 12px 5px 5px;
  gap: 9px;
}
.pill.product img {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  object-fit: cover;
  background: rgba(255, 255, 255, 0.2);
}
.pill.product .text {
  overflow: hidden;
  text-overflow: ellipsis;
}
.pill.product .size {
  opacity: 0.78;
}
.pill.flip {
  top: 14px;
  right: 14px;
  padding: 7px;
}
.skeleton {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.skeleton line {
  stroke: rgba(255, 255, 255, 0.85);
  stroke-width: 0.35;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s linear;
}
.skeleton circle {
  fill: #fff;
  animation: mt-glow 1.6s ease-in-out infinite;
}

/* ——— Dock: the note and the main action under the camera ——— */

.dock {
  flex: none;
  display: grid;
  justify-items: center;
  gap: 16px;
  padding: 16px 16px 20px;
  min-height: 0;
}
.dock[data-sheet] {
  flex: 0 1 auto;
  grid-template-rows: minmax(0, 1fr) auto;
}
.dock-actions {
  display: grid;
  justify-items: center;
  gap: 14px;
}
.note {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 16px;
  border-radius: 14px;
  background: var(--mt-card);
  box-shadow: 0 0 0 1px var(--mt-card-edge);
  font-size: 16px;
  line-height: 1.45;
  color: var(--mt-ink);
}
.note .icon {
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: var(--mt-chip);
  color: var(--mt-ink-soft);
}
.note[data-tone='warn'] .icon {
  color: var(--mt-danger);
}
.panel[data-maximized] .dock {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 24px;
  border-radius: 10px;
  background: #050505;
  color: #fff;
  border: 1.5px solid var(--mt-green);
  box-shadow:
    0 0 0 3px rgba(92, 207, 56, 0.1),
    0 8px 18px -10px rgba(0, 0, 0, 0.55);
  font-size: 19px;
  font-weight: 500;
  white-space: nowrap;
  transition:
    background-color 0.15s ease,
    transform 0.15s ease;
}
.btn:hover:not(:disabled) {
  background: #1d1d1f;
}
.btn:active:not(:disabled) {
  transform: translateY(1px);
}
.btn:disabled {
  opacity: 0.6;
}
.btn[aria-busy='true'] {
  cursor: progress;
  opacity: 0.85;
}
.btn.small {
  min-height: 48px;
  font-size: 18px;
}

.quiet {
  font-size: 15px;
  color: var(--mt-ink-soft);
  text-align: center;
}
.text-link {
  color: var(--mt-ink);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
  border-radius: 4px;
}
.text-link:hover {
  text-decoration-thickness: 2px;
}

/* ——— Cards: measurements and account screens ——— */

.sheet {
  width: 100%;
  min-height: 0;
  max-height: min(340px, 48dvh);
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background: var(--mt-card);
  box-shadow:
    0 0 0 1px var(--mt-card-edge),
    0 -12px 32px -22px rgba(17, 17, 26, 0.35);
  animation: mt-sheet 0.24s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.panel[data-maximized] .sheet {
  max-height: min(460px, 56dvh);
}
.sheet-scroll {
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 2px 16px 18px;
  scrollbar-width: thin;
}

.head {
  display: grid;
  grid-template-columns: 44px 1fr 44px;
  align-items: center;
  gap: 8px;
}
.sheet .head {
  padding: 14px 14px 12px;
}
.head h3 {
  grid-column: 2;
  text-align: center;
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.head .end {
  grid-column: 3;
  justify-self: end;
}
.square {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  color: var(--mt-ink);
  background: var(--mt-card);
  box-shadow: 0 0 0 1px var(--mt-field-edge);
  transition: background-color 0.15s ease;
}
.square:hover {
  background: var(--mt-field);
}
.square.small {
  width: 38px;
  height: 38px;
  border-radius: 8px;
}

.screen {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.panel[data-maximized] .screen {
  justify-content: center;
}
.card {
  flex: 0 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  margin: 16px 16px 0;
  padding: 16px 22px 24px;
  border-radius: 18px;
  background: var(--mt-card);
  box-shadow: 0 0 0 1px var(--mt-card-edge);
  scrollbar-width: thin;
}
.panel[data-maximized] .card,
.panel[data-maximized] .actions {
  width: 100%;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
}
.card .head {
  margin: 0 -6px 18px;
}
.actions {
  flex: none;
  display: grid;
  justify-items: center;
  gap: 14px;
  padding: 18px 16px 22px;
}

.fields {
  display: grid;
  gap: 18px;
}
.row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px 18px;
}
@media (max-width: 520px) {
  .row {
    grid-template-columns: minmax(0, 1fr);
  }
  .head h3 {
    font-size: 18px;
  }
  .card {
    padding: 14px 16px 20px;
  }
}
.field {
  display: grid;
  gap: 8px;
  min-width: 0;
}
.label {
  font-size: 15px;
  color: var(--mt-ink-soft);
}
.control {
  position: relative;
  display: flex;
  align-items: center;
}
.input {
  width: 100%;
  height: 50px;
  padding: 0 18px;
  border-radius: 7px;
  border: 1px solid var(--mt-field-edge);
  background: var(--mt-field);
  color: var(--mt-ink);
  font-size: 17px;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}
.input::placeholder {
  color: var(--mt-ink-muted);
  opacity: 0.8;
}
.input:focus {
  border-color: var(--mt-green-deep);
  box-shadow: 0 0 0 3px var(--mt-green-soft);
}
.input[aria-invalid='true'] {
  border-color: var(--mt-danger);
}
.input[data-suffix] {
  padding-right: 52px;
}
.input[data-reveal] {
  padding-right: 54px;
}
select.input {
  padding-right: 46px;
  cursor: pointer;
}
.control .suffix,
.control .chevron {
  position: absolute;
  right: 18px;
  pointer-events: none;
  color: var(--mt-ink-muted);
}
.control .reveal {
  position: absolute;
  right: 7px;
  width: 38px;
  height: 38px;
  border-radius: 7px;
  display: grid;
  place-items: center;
  color: var(--mt-ink-muted);
}
.control .reveal:hover {
  color: var(--mt-ink);
  background: var(--mt-chip);
}
.error {
  font-size: 13.5px;
  color: var(--mt-danger);
}
.form-error {
  margin-bottom: 16px;
  padding: 11px 14px;
  border-radius: 9px;
  background: var(--mt-danger-soft);
  color: var(--mt-danger);
  font-size: 15px;
}
.hint {
  font-size: 15px;
  color: var(--mt-ink-muted);
}
.aside {
  justify-self: end;
  margin-top: -6px;
  font-size: 15px;
  color: var(--mt-ink);
  border-radius: 4px;
}
.aside:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}
.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--mt-ink-muted);
  font-size: 14px;
}
.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--mt-field-edge);
}
.google {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  height: 50px;
  border-radius: 8px;
  background: var(--mt-card);
  box-shadow: 0 0 0 1px var(--mt-field-edge);
  color: var(--mt-ink);
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.15s ease;
}
.google:hover:not(:disabled) {
  background: var(--mt-field);
}
.otp {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}
.otp .input {
  text-align: center;
  font-size: 20px;
  padding: 0;
}

/* ——— Profile ——— */

.profile {
  display: grid;
  justify-items: center;
  text-align: center;
}
.profile .head {
  width: 100%;
  margin-bottom: 0;
}
.avatar {
  width: 92px;
  height: 92px;
  margin-top: -36px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: var(--mt-card);
  box-shadow: 0 0 0 1px var(--mt-field-edge);
  color: var(--mt-ink);
}
.profile .name {
  margin-top: 14px;
  font-size: 30px;
  font-weight: 500;
  letter-spacing: -0.01em;
}
.profile .email {
  margin-top: 2px;
  font-size: 15px;
  color: var(--mt-ink-muted);
}
.profile .btn {
  margin-top: 18px;
}
.history {
  width: 100%;
  margin-top: 28px;
  text-align: left;
}
.history-label {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  font-size: 15px;
  color: var(--mt-ink-soft);
}
.trials {
  display: grid;
  gap: 10px;
}
.trial {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 7px 8px 7px 10px;
  border-radius: 8px;
  background: var(--mt-field);
  box-shadow: 0 0 0 1px var(--mt-card-edge);
}
.thumb {
  flex: none;
  width: 58px;
  height: 46px;
  border-radius: 4px;
  object-fit: cover;
  background: var(--mt-chip);
  display: grid;
  place-items: center;
  color: var(--mt-stage-ink);
}
.trial .meta {
  flex: 1;
  min-width: 0;
}
.trial .trial-name {
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.trial .trial-when {
  font-size: 13px;
  color: var(--mt-ink-muted);
}
.empty {
  padding: 18px;
  border-radius: 10px;
  background: var(--mt-field);
  color: var(--mt-ink-muted);
  font-size: 15px;
  text-align: center;
}
.profile-foot {
  margin-top: 20px;
}

/* ——— Notices ——— */

.notice-slot {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 14px;
  display: flex;
  justify-content: center;
  pointer-events: none;
}
.notice-slot[data-top] {
  bottom: auto;
  top: 64px;
}
.pill.notice {
  position: static;
  background: rgba(20, 20, 23, 0.86);
  animation: mt-drop 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.pill.notice svg,
.banner svg {
  color: var(--mt-green);
}
.banner {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 16px;
  padding: 10px 14px;
  border-radius: 9px;
  background: rgba(92, 207, 56, 0.12);
  color: var(--mt-ink);
  font-size: 15px;
  animation: mt-drop 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.banner svg {
  color: var(--mt-green-deep);
}
.profile .banner {
  width: 100%;
  margin: 8px 0 44px;
  justify-content: center;
}

/* ——— Motion ——— */

.spin {
  animation: mt-spin 0.9s steps(8) infinite;
}
@keyframes mt-spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes mt-open {
  from {
    opacity: 0;
    scale: 0.97;
  }
}
@keyframes mt-rise {
  from {
    opacity: 0;
    translate: 0 8px;
  }
}
@keyframes mt-sheet {
  from {
    opacity: 0;
    translate: 0 12px;
  }
}
@keyframes mt-drop {
  from {
    opacity: 0;
    translate: 0 -6px;
  }
}
@keyframes mt-pulse {
  50% {
    box-shadow: 0 0 0 6px rgba(92, 207, 56, 0);
  }
}
@keyframes mt-glow {
  50% {
    opacity: 0.45;
  }
}
@media (prefers-reduced-motion: reduce) {
  *:not(.spin),
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
@media (forced-colors: active) {
  .smoke,
  .panel,
  .note,
  .card,
  .sheet,
  .pill,
  .btn {
    border: 1px solid CanvasText;
  }
}
`
