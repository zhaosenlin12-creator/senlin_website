/**
 * 媒体能力探测：弱网 / 省流量 / 减少动态效果。
 * 用来决定"要不要自动下载视频"，是弱网体验的第一道闸。
 */

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

export function getConnection(): NetworkInformation | undefined {
  if (typeof navigator === "undefined") return undefined;
  return (navigator as Navigator & { connection?: NetworkInformation }).connection;
}

/** 用户在系统里开了"省流量" */
export function isSaveData(): boolean {
  return getConnection()?.saveData === true;
}

/** 2g / 3g 视为弱网 */
export function isSlowConnection(): boolean {
  const type = getConnection()?.effectiveType;
  return type === "slow-2g" || type === "2g" || type === "3g";
}

/** 系统开启了"减少动态效果" */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * 是否允许自动播放视频。
 * 省流量 / 弱网 / 减少动态效果 三种情况下都不自动播，只给静态封面。
 */
export function canAutoplayVideo(): boolean {
  return !isSaveData() && !isSlowConnection() && !prefersReducedMotion();
}

/**
 * 选视频源：窄屏或弱网优先用小一档的编码，避免一次性拉几 MB。
 * 没有小档就退回原图。
 */
export function pickVideoSrc(src: string, srcSmall?: string): string {
  if (!srcSmall) return src;
  const narrow = typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(max-width: 768px)").matches
    : false;
  if (narrow || isSlowConnection() || isSaveData()) return srcSmall;
  return src;
}
