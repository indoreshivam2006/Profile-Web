"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CustomRobotScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene Setup ──
    const scene = new THREE.Scene();
    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0.5, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    mount.appendChild(renderer.domElement);

    // ── Lights ──
    const ambient = new THREE.AmbientLight(0x1a1020, 3);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(3, 6, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8844ff, 1.5);
    fillLight.position.set(-5, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xd06050, 2.0);
    rimLight.position.set(0, -4, -5);
    scene.add(rimLight);

    const faceGlow = new THREE.PointLight(0xffffff, 4, 3);
    faceGlow.position.set(0, 1.4, 1.8);
    scene.add(faceGlow);

    const chestGlow = new THREE.PointLight(0xffffff, 3, 2.5);
    chestGlow.position.set(0, 0, 1.8);
    scene.add(chestGlow);

    // ── Materials ──
    const glossBlack = new THREE.MeshStandardMaterial({
      color: 0x111116,
      roughness: 0.1,
      metalness: 0.95,
    });
    const glossBlackMid = new THREE.MeshStandardMaterial({
      color: 0x1a1a22,
      roughness: 0.2,
      metalness: 0.8,
    });
    const ledWhite = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 3,
      roughness: 0.1,
      metalness: 0.0,
    });
    const darkVisor = new THREE.MeshStandardMaterial({
      color: 0x08080f,
      roughness: 0.05,
      metalness: 0.1,
      transparent: true,
      opacity: 0.92,
    });

    // ── Helper: rounded box via SphereGeometry scaled ──
    const mkSphere = (rx: number, ry: number, rz: number, mat: THREE.Material) => {
      const g = new THREE.SphereGeometry(1, 48, 32);
      const m = new THREE.Mesh(g, mat);
      m.scale.set(rx, ry, rz);
      return m;
    };

    // ── HEAD GROUP ──
    const headGroup = new THREE.Group();

    // Helmet shell
    const helmet = mkSphere(1.05, 0.98, 1.0, glossBlack);
    headGroup.add(helmet);

    // Visor plate (slightly flattened front-facing ellipsoid)
    const visor = mkSphere(0.82, 0.70, 0.35, darkVisor);
    visor.position.z = 0.7;
    headGroup.add(visor);

    // Eyes (^ ^) — two curved torus arcs as eyebrows + fill
    const eyeMat = ledWhite.clone();
    eyeMat.emissiveIntensity = 5;

    const mkEye = (x: number) => {
      const g = new THREE.Group();

      // Upper arc (^)
      const torusGeo = new THREE.TorusGeometry(0.18, 0.035, 12, 28, Math.PI);
      const arc = new THREE.Mesh(torusGeo, eyeMat);
      arc.rotation.z = x < 0 ? Math.PI * 0.1 : -Math.PI * 0.1;
      g.add(arc);

      // Inner fill glow lens
      const lensGeo = new THREE.CircleGeometry(0.08, 24);
      const lens = new THREE.Mesh(lensGeo, eyeMat);
      lens.position.z = 0.02;
      lens.position.y = -0.05;
      g.add(lens);

      g.position.set(x, 0.08, 1.05);
      g.rotation.y = x < 0 ? 0.18 : -0.18;
      return g;
    };
    headGroup.add(mkEye(-0.3));
    headGroup.add(mkEye(0.3));

    // Smile — torus arc bottom half
    const smileGeo = new THREE.TorusGeometry(0.25, 0.032, 12, 32, Math.PI);
    const smile = new THREE.Mesh(smileGeo, eyeMat);
    smile.rotation.z = Math.PI;
    smile.position.set(0, -0.2, 1.04);
    smile.rotation.x = 0.35;
    headGroup.add(smile);

    // Headphone cups (side)
    const mkCup = (side: number) => {
      const g = new THREE.Group();
      const cup = mkSphere(0.28, 0.35, 0.22, glossBlackMid);
      g.add(cup);

      // LED ring cap
      const ringGeo = new THREE.TorusGeometry(0.20, 0.04, 12, 36);
      const ring = new THREE.Mesh(ringGeo, ledWhite);
      ring.position.z = 0.18;
      g.add(ring);

      g.position.set(side * 1.1, 0.08, 0);
      return g;
    };
    headGroup.add(mkCup(-1));
    headGroup.add(mkCup(1));

    headGroup.position.set(0, 1.85, 0);

    // ── NECK ──
    const neckGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.28, 24);
    const neck = new THREE.Mesh(neckGeo, glossBlack);
    neck.position.y = 1.3;

    // ── TORSO GROUP ──
    const torsoGroup = new THREE.Group();

    // Main torso body — tapered ellipsoid
    const torso = mkSphere(0.80, 1.05, 0.72, glossBlack);
    torsoGroup.add(torso);

    // Chest LED ring
    const chestRingGeo = new THREE.TorusGeometry(0.28, 0.052, 16, 48);
    const chestRing = new THREE.Mesh(chestRingGeo, ledWhite);
    chestRing.position.set(0, 0.1, 0.68);
    torsoGroup.add(chestRing);

    // Inner chest circle
    const innerGeo = new THREE.CircleGeometry(0.16, 36);
    const innerDisc = new THREE.Mesh(innerGeo, ledWhite);
    innerDisc.position.set(0, 0.1, 0.72);
    torsoGroup.add(innerDisc);

    torsoGroup.position.y = 0.1;

    // ── ARMS ──
    const mkArm = (side: number) => {
      const g = new THREE.Group();

      // Upper arm
      const uaGeo = new THREE.CapsuleGeometry(0.18, 0.42, 10, 20);
      const ua = new THREE.Mesh(uaGeo, glossBlack);
      ua.rotation.z = side * -0.35;
      ua.position.y = -0.28;
      g.add(ua);

      // Elbow joint
      const ej = mkSphere(0.19, 0.19, 0.19, glossBlackMid);
      ej.position.y = -0.62;
      g.add(ej);

      // Lower arm / forearm
      const laGeo = new THREE.CapsuleGeometry(0.14, 0.38, 10, 20);
      const la = new THREE.Mesh(laGeo, glossBlack);
      la.position.y = -0.98;
      la.rotation.z = side * 0.15;
      g.add(la);

      // Hand
      const hand = mkSphere(0.18, 0.20, 0.16, glossBlackMid);
      hand.position.y = -1.32;
      g.add(hand);

      g.position.set(side * 0.98, 0.2, 0);
      g.rotation.z = side * 0.22;
      return g;
    };
    torsoGroup.add(mkArm(-1));
    torsoGroup.add(mkArm(1));

    // ── BOTTOM (pelvis taper) ──
    const pelvisGeo = new THREE.SphereGeometry(0.5, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2);
    const pelvis = new THREE.Mesh(pelvisGeo, glossBlack);
    pelvis.scale.set(0.95, 0.9, 0.85);
    pelvis.position.y = -1.08;
    torsoGroup.add(pelvis);

    // ── ROBOT GROUP ──
    const robotGroup = new THREE.Group();
    robotGroup.add(headGroup);
    robotGroup.add(neck);
    robotGroup.add(torsoGroup);
    scene.add(robotGroup);

    // ── Mouse Tracking ──
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRotY = nx * 0.4;
      targetRotX = -ny * 0.25;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Resize ──
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Animation Loop ──
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Floating motion
      robotGroup.position.y = Math.sin(t * 1.1) * 0.12;

      // Subtle idle sway
      robotGroup.rotation.z = Math.sin(t * 0.7) * 0.025;

      // Mouse tracking: head tracks more, body tracks less
      currentRotY += (targetRotY - currentRotY) * 0.06;
      currentRotX += (targetRotX - currentRotX) * 0.06;

      robotGroup.rotation.y = currentRotY;
      headGroup.rotation.y = currentRotY * 0.5;
      headGroup.rotation.x = currentRotX * 0.6;

      // Chest glow pulse
      const pulse = 2.5 + Math.sin(t * 2.5) * 1.2;
      (chestRing.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
      (innerDisc.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
      chestGlow.intensity = 2.5 + Math.sin(t * 2.5) * 1.5;

      // Eye blink — dip emissive briefly
      const blinkCycle = t % 4.5;
      const blinkVal = blinkCycle > 4.1 && blinkCycle < 4.3 ? 0.2 : 5;
      eyeMat.emissiveIntensity = blinkVal;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ minHeight: "420px" }}
    />
  );
}
