/**
 * Sample models and torso anchor presets for the Mirror Try demo composition engine (L1).
 * The plugin owns these presets and imports nothing from the store.
 */

export interface TorsoAnchor {
  /** Normalised horizontal center of the torso (0-1). */
  x: number
  /** Normalised vertical position of the base of the neck (0-1): the garment's neckline lands here. */
  y: number
  /** Scaling factor relative to default garment overlay width. */
  scale: number
  /** Rotation angle in degrees (-180 to 180). */
  rotation: number
  /** Optional aspect ratio adjustment. */
  aspectRatio?: number
}

export interface SampleModel {
  id: string
  name: string
  subtitle: string
  image: string
  height: string
  torsoAnchor: TorsoAnchor
  sampleSize: string
}

export const sampleModels: readonly SampleModel[] = [
  {
    id: 'model-kai',
    name: 'Kai',
    subtitle: 'Athletic frame · 6′1″',
    height: '185 cm',
    image: '/mirror-try/models/model-kai.svg',
    torsoAnchor: {
      x: 0.5,
      y: 0.338,
      scale: 1.0,
      rotation: 0,
    },
    sampleSize: 'M (Sample)',
  },
  {
    id: 'model-elena',
    name: 'Elena',
    subtitle: 'Slender frame · 5′9″',
    height: '175 cm',
    image: '/mirror-try/models/model-elena.svg',
    torsoAnchor: {
      x: 0.5,
      y: 0.338,
      scale: 0.94,
      rotation: 0,
    },
    sampleSize: 'S (Sample)',
  },
  {
    id: 'model-devon',
    name: 'Devon',
    subtitle: 'Broad frame · 6′2″',
    height: '188 cm',
    image: '/mirror-try/models/model-devon.svg',
    torsoAnchor: {
      x: 0.5,
      y: 0.338,
      scale: 1.08,
      rotation: 0,
    },
    sampleSize: 'L (Sample)',
  },
]

export function getSampleModel(id?: string): SampleModel {
  return sampleModels.find((m) => m.id === id) ?? sampleModels[0]
}
