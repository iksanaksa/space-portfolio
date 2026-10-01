export const planetFrag = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uSeed;

  varying vec3 vNormal;
  varying vec3 vPos;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z
    );
  }

  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Geser posisi dengan seed → tiap planet punya pola unik
    vec3 p = vPos * 2.5 + uSeed;
    float n = fbm(p);

    // Tiga warna: laut (A), darat (B), awan/puncak (C)
    vec3 col = mix(uColorA, uColorB, smoothstep(0.35, 0.55, n));
    col = mix(col, uColorC, smoothstep(0.6, 0.78, n));

    // Sedikit pencahayaan dari depan → biar ada dimensi
    float diff = max(dot(vNormal, normalize(vec3(1.0, 0.8, 1.0))), 0.0);
    col *= 0.4 + diff * 0.8;

    gl_FragColor = vec4(col, 1.0);
  }
`