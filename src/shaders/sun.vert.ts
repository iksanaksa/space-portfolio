export const sunVert = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPos;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`