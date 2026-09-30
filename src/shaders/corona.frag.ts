export const coronaFrag = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormal;

  void main() {
    float fres = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 2.2);
    float a = fres * uIntensity;
    gl_FragColor = vec4(uColor * a, a);
  }
`