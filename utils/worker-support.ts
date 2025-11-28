/**
 * WebWorker support detection utility
 *
 * Detects browser support for WebWorker and Transferable Objects
 * Provides graceful degradation strategy
 */

/**
 * Detect whether browser supports WebWorker
 */
export function supportsWebWorker(): boolean {
  if (typeof window === 'undefined') {
    return false; // SSR environment
  }
  return typeof Worker !== 'undefined';
}

/**
 * Detect whether browser supports Transferable Objects
 */
export function supportsTransferable(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    // Test if ArrayBuffer can be transferred
    const buffer = new ArrayBuffer(1);
    const worker = new Worker(
      URL.createObjectURL(
        new Blob(['self.onmessage = () => {}'], { type: 'application/javascript' })
      )
    );
    worker.postMessage(buffer, [buffer]);
    worker.terminate();
    return buffer.byteLength === 0; // If 0, ownership was successfully transferred
  } catch (e) {
    return false;
  }
}

/**
 * Get Worker usage recommendation
 */
export function getWorkerRecommendation(): {
  useWorker: boolean;
  useTransferable: boolean;
  reason: string;
} {
  const hasWorkerSupport = supportsWebWorker();
  const hasTransferableSupport = supportsTransferable();

  if (!hasWorkerSupport) {
    return {
      useWorker: false,
      useTransferable: false,
      reason: 'WebWorker not supported by browser'
    };
  }

  if (!hasTransferableSupport) {
    return {
      useWorker: false,
      useTransferable: false,
      reason: 'Transferable Objects not supported - worker overhead too high'
    };
  }

  return {
    useWorker: true,
    useTransferable: true,
    reason: 'Full WebWorker support available'
  };
}

/**
 * Detect if device is low-end (should use Worker optimization)
 */
export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  // Detect CPU core count
  const cores = (navigator as any).hardwareConcurrency || 4;
  if (cores <= 2) {
    return true;
  }

  // Detect memory (if available)
  const memory = (navigator as any).deviceMemory;
  if (memory && memory <= 4) {
    return true; // 4GB or less
  }

  return false;
}
