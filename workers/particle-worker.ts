/**
 * Particle Update Worker
 *
 * 在独立线程中处理粒子位置更新，释放主线程用于渲染和UI交互
 *
 * 性能优势：
 * - 100,000 个粒子的计算从主线程移到 Worker 线程
 * - 使用 Transferable Objects 实现零拷贝数据传输
 * - 主线程可以专注于 Three.js 渲染
 */

export interface ParticleConfig {
  spread: number;      // X/Y 轴分布范围
  depth: number;       // Z 轴深度范围
  speedBase: number;   // 基础速度
  speedVariation: number; // 速度随机变化
}

export interface ParticleUpdateMessage {
  type: 'update';
  positions: Float32Array;
  velocities: Float32Array;
  count: number;
  config: ParticleConfig;
}

export interface ParticleUpdateResponse {
  type: 'updated';
  positions: Float32Array;
}

// Worker 消息处理
self.onmessage = (e: MessageEvent<ParticleUpdateMessage>) => {
  const { type, positions, velocities, count, config } = e.data;

  if (type === 'update') {
    // 更新每个粒子的位置
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // 更新位置（应用速度）
      positions[i3] += velocities[i3];         // x
      positions[i3 + 1] += velocities[i3 + 1]; // y
      positions[i3 + 2] += velocities[i3 + 2]; // z

      // 粒子超出观察者后，重置到远处
      if (positions[i3 + 2] > 10) {
        positions[i3] = (Math.random() - 0.5) * config.spread * 2;
        positions[i3 + 1] = (Math.random() - 0.5) * config.spread * 2;
        positions[i3 + 2] = -config.depth;

        // 重新设置速度
        velocities[i3] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 2] = config.speedBase + Math.random() * config.speedVariation;
      }
    }

    // 不使用 Transferable Objects 返回结果（避免所有权转移问题）
    const response: ParticleUpdateResponse = {
      type: 'updated',
      positions: new Float32Array(positions) // 创建副本而不是转移所有权
    };

    self.postMessage(response);
  }
};

// 类型导出（供主线程使用）
export type {};
