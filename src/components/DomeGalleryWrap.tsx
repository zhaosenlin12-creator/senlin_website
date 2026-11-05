// @ts-expect-error -- third-party JSX without types
import DomeGalleryRaw from "./DomeGallery.jsx";

export type DomeGalleryProps = {
  images?: (string | { src: string; alt?: string })[];
  fit?: number;
  fitBasis?: "auto" | "min" | "max" | "width" | "height";
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
  autoRotateDegPerSec?: number;
};

const DomeGallery = DomeGalleryRaw as unknown as React.ComponentType<DomeGalleryProps>;

export default function DomeGalleryTyped(props: DomeGalleryProps) {
  return <DomeGallery {...props} />;
}
