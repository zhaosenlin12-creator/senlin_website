// @ts-expect-error -- third-party JSX without types
import DomeGallery from "./DomeGallery.jsx";
export default DomeGallery as unknown as React.ComponentType<{
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
}>;
