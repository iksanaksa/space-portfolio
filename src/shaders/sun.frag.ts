export const sunFrag = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorCore;
  uniform vec3 uColorMid;
  uniform vec3 uColorEdge;

  varying vec3 vNormal;
  varying vec3 vPos;

  // Fungsi noise — menghasilkan angka acak yang halus dari koordinat
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
    vec3 p = normalize(vPos);
    // dua lapis noise digabung, salah satunya bergerak terhadap waktu
    float n1 = fbm(p * 3.0 + vec3(0.0, uTime * 0.12, 0.0));
    float n2 = fbm(p * 6.0 - vec3(uTime * 0.08));
    float n = n1 * 0.7 + n2 * 0.5;

    // campur tiga warna berdasarkan nilai noise
    vec3 col = mix(uColorCore, uColorMid, smoothstep(0.25, 0.6, n));
    col = mix(col, uColorEdge, smoothstep(0.55, 0.95, n));

    // tambahkan cahaya terang di tepi bola (fresnel)
    float fres = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 2.0);
    col += fres * uColorEdge * 1.6;

    gl_FragColor = vec4(col, 1.0);
  }
`