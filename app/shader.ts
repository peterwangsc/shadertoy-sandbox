export const shader = () => /* glsl */ `
uniform float iTime;
uniform float iTimeDelta;
uniform vec3 iResolution;
uniform vec2 iMouse;
uniform int iFrame;
uniform float iFrameRate;
uniform sampler2D iChannel0;

// --- start shader code ---

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
    vec3 col2 = texture(iChannel0, uv * 2. - 0.5).xyz;
    
    col += col2;

    // Output to screen
    fragColor = vec4(col,1.0);
}

// --- end shader code ---

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}`;
