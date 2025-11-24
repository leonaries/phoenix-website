/**
 * WebWorker 支持检测工具
 *
 * 检测浏览器对 WebWorker 和 Transferable Objects 的支持
 * 提供优雅降级策略
 */

/**
 * 检测浏览器是否支持 WebWorker
 */
export function supportsWebWorker(): boolean {
  if (typeof window === 'undefined') {
    return false; // SSR 环境
  }
  return typeof Worker !== 'undefined';
}

/**
 * 检测浏览器是否支持 Transferable Objects
 */
export function supportsTransferable(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    // 测试是否可以传输 ArrayBuffer
    const buffer = new ArrayBuffer(1);
    const worker = new Worker(
      URL.createObjectURL(
        new Blob(['self.onmessage = () => {}'], { type: 'application/javascript' })
      )
    );
    worker.postMessage(buffer, [buffer]);
    worker.terminate();
    return buffer.byteLength === 0; // 如果为0，说明成功转移所有权
  } catch (e) {
    return false;
  }
}

/**
 * 获取 Worker 使用建议
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
 * 检测是否为低端设备（应该使用 Worker 优化）
 */
export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  // 检测 CPU 核心数
  const cores = (navigator as any).hardwareConcurrency || 4;
  if (cores <= 2) {
    return true;
  }

  // 检测内存（如果可用）
  const memory = (navigator as any).deviceMemory;
  if (memory && memory <= 4) {
    return true; // 4GB 或更少
  }

  return false;
}
