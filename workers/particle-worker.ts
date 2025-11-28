/**
 * Particle Update Worker
 *
 * Process particle position updates in a separate thread, freeing the main thread for rendering and UI interaction
 *
 * Performance benefits:
 * - Move calculation of 100,000 particles from main thread to Worker thread
 * - Use Transferable Objects for zero-copy data transfer
 * - Main thread can focus on Three.js rendering
 */

export interface ParticleConfig {
  spread: number;      // X/Y axis distribution range
  depth: number;       // Z-axis depth range
  speedBase: number;   // Base speed
  speedVariation: number; // Speed variation
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

// Worker message handling
self.onmessage = (e: MessageEvent<ParticleUpdateMessage>) => {
  const { type, positions, velocities, count, config } = e.data;

  if (type === 'update') {
    // Update each particle's position
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Update position (apply velocity)
      positions[i3] += velocities[i3];         // x
      positions[i3 + 1] += velocities[i3 + 1]; // y
      positions[i3 + 2] += velocities[i3 + 2]; // z

      // Reset particle to far distance when it passes the viewer
      if (positions[i3 + 2] > 10) {
        positions[i3] = (Math.random() - 0.5) * config.spread * 2;
        positions[i3 + 1] = (Math.random() - 0.5) * config.spread * 2;
        positions[i3 + 2] = -config.depth;

        // Reset velocity
        velocities[i3] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 2] = config.speedBase + Math.random() * config.speedVariation;
      }
    }

    // Return result without using Transferable Objects (avoid ownership transfer issues)
    const response: ParticleUpdateResponse = {
      type: 'updated',
      positions: new Float32Array(positions) // Create copy instead of transferring ownership
    };

    self.postMessage(response);
  }
};

// Type export (for main thread use)
export type {};
