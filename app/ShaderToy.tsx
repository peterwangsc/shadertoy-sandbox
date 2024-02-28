"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { TextureLoader, Uniform, Vector2, Vector3 } from "three";
import { shader } from "./shader";
import favicon from "./favicon.png";

export default function ShaderToy() {
  const container = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  return (
    <div ref={container} className="fixed inset-0 -z-30 h-full w-full bg-black">
      <Canvas ref={canvas} className="hero-canvas absolute inset-0">
        <Inner canvas={canvas} />
      </Canvas>
    </div>
  );
}

const Inner = ({ canvas }: any) => {
  const materialRef = useRef<any>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvas.current) {
        materialRef.current.uniforms.iMouse.value.x = e.clientX;
        materialRef.current.uniforms.iMouse.value.y = e.clientY;
      }
    };

    const handleMouseScroll = () => {
      if (canvas.current) {
        materialRef.current.uniforms.iTime.value += 0.075;
      }
    };

    window.addEventListener("scroll", handleMouseScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleMouseScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [canvas]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      if (canvas.current) {
        materialRef.current.uniforms.iResolution.value.x = canvas.current.width;
        materialRef.current.uniforms.iResolution.value.y =
          canvas.current.height;
      }
      materialRef.current.uniforms.iTime.value += delta;
      materialRef.current.uniforms.iTimeDelta.value = delta;
      materialRef.current.uniforms.iFrame.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.iFrameRate.value = 1 / delta;
    }
  });
  return (
    <>
      <ambientLight />
      <mesh>
        <boxGeometry args={[100, 100, 1]} />
        <shaderMaterial
          ref={materialRef}
          fragmentShader={shader()}
          uniforms={{
            iTime: { value: 0.0 },
            iTimeDelta: { value: 0.0 },
            iMouse: new Uniform(new Vector2(0, 0)),
            iResolution: new Uniform(
              new Vector3(canvas.current?.width, canvas.current?.height, 1)
            ),
            iFrame: { value: 0 },
            iFrameRate: { value: 0 },
            iChannel0: { value: new TextureLoader().load(favicon.src) },
          }}
        />
      </mesh>
    </>
  );
};
