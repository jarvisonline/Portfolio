  uniform sampler2D textureA;
  uniform vec2 mouse;
  uniform vec2 resolution;
  uniform float time;
  uniform int frame;
  varying vec2 vUv;

  const float delta = 1.4;

  void main() {
    vec2 uv = vUv;

    if (frame == 0) {
      // Initialize background with a ripple effect
      float dist = distance(uv, vec2(0.5, 0.5)); // Center of the texture
      float initialPressure = 0.2 * exp(-dist * 10.0); // Create a larger ripple effect with exponential decay
      
      // Create additional ripples like a stone dropped in water
      float rippleEffect = 0.1 * sin(20.0 * dist - time * 5.0); // Adjust frequency and speed for ripple effect
      initialPressure += rippleEffect; // Combine initial pressure with ripple effect
      
      gl_FragColor = vec4(initialPressure, initialPressure * 0.5, 1.0, 1.0); // Add blue tint for water effect
      return;
    }

    vec4 data = texture2D(textureA, uv);
    float pressure = data.x;
    float pVel = data.y;

    vec2 texelSize = 1.0 / resolution;
    float p_right = texture2D(textureA, uv + vec2(texelSize.x, 0.0)).x;
    float p_left = texture2D(textureA, uv - vec2(texelSize.x, 0.0)).x;
    float p_up = texture2D(textureA, uv + vec2(0.0, texelSize.y)).x;
    float p_down = texture2D(textureA, uv - vec2(0.0, texelSize.y)).x;

    if (uv.x <= texelSize.x) p_left = p_right;
    if (uv.x >= 1.0 - texelSize.x) p_right = p_left;
    if (uv.y <= texelSize.y) p_down = p_up;
    if (uv.y >= 1.0 - texelSize.y) p_up = p_down;

    pVel += delta * (-2.0 * pressure + p_right + p_left) / 4.0;
    pVel += delta * (-2.0 * pressure + p_up + p_down) / 4.0;
    pressure += delta * pVel;
    pVel -= 0.005 * delta * pressure;
    pVel *= 1.0 - 0.002 * delta;
    pressure *= 0.999;

    vec2 mouseUV = mouse / resolution;
    if (mouse.x > 0.0) {
      float dist = distance(uv, mouseUV);
      if (dist <= 0.02) {
        pressure += 2.0 * (1.0 - dist / 0.02);
      }
    }

    gl_FragColor = vec4(pressure, pVel, (p_right - p_left) / 2.0, (p_up - p_down) / 2.0);
  }
