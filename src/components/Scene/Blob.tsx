import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { IcosahedronGeometry, ShaderMaterial } from 'three'

import gsap from 'gsap'
import { useControls } from 'leva'

const noise = `
  // GLSL textureless classic 3D noise "cnoise",
  // with an RSL-style periodic variant "pnoise".
  // Author:  Stefan Gustavson (stefan.gustavson@liu.se)
  // Version: 2011-10-11
  //
  // Many thanks to Ian McEwan of Ashima Arts for the
  // ideas for permutation and gradient selection.
  //
  // Copyright (c) 2011 Stefan Gustavson. All rights reserved.
  // Distributed under the MIT license. See LICENSE file.
  // https://github.com/ashima/webgl-noise
  //

  vec3 mod289(vec3 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 mod289(vec4 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 permute(vec4 x)
  {
    return mod289(((x*34.0)+1.0)*x);
  }

  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }

  vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
  }

  // Classic Perlin noise, periodic variant
  float pnoise(vec3 P, vec3 rep)
  {
    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
  }
`
const rotation = `
  mat3 rotation3dY(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat3(
      c, 0.0, -s,
      0.0, 1.0, 0.0,
      s, 0.0, c
    );
  }
  
  vec3 rotateY(vec3 v, float angle) {
    return rotation3dY(angle) * v ;
  }  
`

const vertexShader = `  
  varying vec2 vUv;
  varying float vDistort;
  varying vec3 vNormal;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uNoiseDensity;
  uniform float uNoiseStrength;
  uniform float uFrequency;
  uniform float uAmplitude;
  
  ${noise}
  
  ${rotation}
  
  void main() {
    vUv = uv;
    
    float t = uTime * uSpeed;
    float distortion = pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;

    // cool 1
	// vec3 pos = normal + (position * distortion);
	vec3 pos = position  + (normal * distortion);
    float angle = sin(uv.y * uFrequency * sin(t) * 0.8) * uAmplitude;
    pos = rotateY(pos, angle) ;    
    
    vDistort = distortion;
    vNormal = normal;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
  }  
`

const fragmentShader = `
  varying vec2 vUv;
  varying float vDistort;
  varying vec3 vNormal;
  uniform float uTime;
  uniform float uIntensity;
  uniform float uBrightness;
  uniform float uContrast;
  uniform float uOscilation;

  vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
	// otro cool
	// return a + b / cos(6.28318 * (c * t + d));

  }     
  
  void main() {

	// BAJELE AL uIntensity a cerca a 0 pra jugar con los colores
    float distort = vDistort * uIntensity;
    
    vec3 brightness = vec3(0.5, 0.5, 0.9);
    vec3 contrast = vec3(0.5, 0.5, 0.5);
    vec3 oscilation = vec3(0.9, 0.8, 0.1);
    // vec3 phase = vec3(0.0, 0.1, 0.2);
	vec3 phase = vec3(uBrightness, uContrast, uOscilation);

    vec3 color = cosPalette(distort, brightness, contrast, oscilation, phase);
    // vec3 color = vec3(distort);
    gl_FragColor = vec4(color, 1.0);
  }  
`
const mapPos = (x: number, in_min: number, in_max: number, out_min: number, out_max: number) => {
	return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

interface blobProps {
	scroll: any
}
export default function Blob({ scroll }: blobProps) {
	const sphereGeo = new IcosahedronGeometry(2, 64)
	const [clicked, setClicked] = useState(false)
	const blobRef = useRef<any>(null!)

	const updateNoiseStrength = (event: { clientX: any; clientY: any }) => {
		if (blobRef.current.material) {
			const mousex = event.clientX
			const mousey = event.clientY
			// console.log(mousex - window.innerWidth / 3)

			const newNoiseStrength = mapPos(mousex - window.innerWidth / 3, 0, window.innerWidth / 3, 0, 2.3)
			blobRef.current.material.uniforms.uNoiseStrength.value = newNoiseStrength
		}
	}

	useEffect(() => {
		// window.addEventListener('scroll', () => {
		// 	scrollRef.current = window.pageYOffset
		// })
		window.addEventListener('mouseup', function (event) {
			if (clicked) {
				gsap.to(blobRef.current.material.uniforms.uNoiseStrength, { duration: 1, value: 0.2 })
			}
		})
	}, [])
	const { uSpeed, uNoiseDensity, uNoiseStrength, uFrequency, uAmplitude, uIntensity, color1, color2, color3 } =
		useControls('blob shader', {
			uSpeed: {
				value: 0.2,
				min: -10,
				max: 10,
				step: 0.1,
			},
			uNoiseDensity: {
				value: 1.5,
				min: -10,
				max: 10,
				step: 0.1,
			},
			uNoiseStrength: {
				value: 0.2,
				min: -10,
				max: 10,
				step: 0.1,
			},
			uFrequency: {
				value: 3,
				min: -10,
				max: 10,
				step: 0.1,
			},
			uAmplitude: {
				value: 6,
				min: -10,
				max: 10,
				step: 0.1,
			},
			uIntensity: {
				value: 2,
				min: -10,
				max: 20,
				step: 0.1,
			},
			color1: {
				value: 0.48,
				min: 0,
				max: 1,
				step: 0.02,
			},
			color2: {
				value: 0.64,
				min: 0,
				max: 1,
				step: 0.02,
			},
			color3: {
				value: 0.44,
				min: 0,
				max: 1,
				step: 0.02,
			},
		})

	const blobMaterial = new ShaderMaterial({
		uniforms: {
			uTime: { value: 0 },
			uSpeed: { value: uSpeed },
			uNoiseDensity: { value: uNoiseDensity },
			uNoiseStrength: { value: uNoiseStrength },
			uFrequency: { value: uFrequency },
			uAmplitude: { value: uAmplitude },
			uIntensity: { value: uIntensity },
			uBrightness: { value: color1 },
			uContrast: { value: color2 },
			uOscilation: { value: color3 },
		},
		vertexShader,
		fragmentShader,
	})

	useFrame((state, delta) => {
		let elapsedTime = state.clock.elapsedTime
		if (blobRef.current.material.uniforms.uTime) blobRef.current.material.uniforms.uTime.value = elapsedTime
		if (scroll) {
			if (scroll.current > 0.17 && scroll.current < 0.3333) {
				// blobRef.current.position.y = lerp(blobRef.current.position.y, -(scroll.current + 0.17) * 150 + 50, 0.9)
				blobRef.current.position.y = mapPos(scroll.current, 0.166666, 0.333333, 20, 0.5)
			}
		}

		// const offset = data.range(0, 1 / 3)
		// blobRef.current.position.y = scroll * 10
		// const offset2 = data.range(1 / 3, 1 / 3)
		// blobRef.current.position.x = offset2 * 5
	})
	return (
		<>
			<group dispose={null}>
				<mesh
					visible={true}
					onPointerOver={() => {
						gsap.to(blobRef.current.material.uniforms.uBrightness, { duration: 2, value: 1 })
						gsap.to(blobRef.current.material.uniforms.uContrast, { duration: 2, value: 0.08 })
						gsap.to(blobRef.current.material.uniforms.uOscilation, { duration: 2, value: 1 })

						document.body.style.cursor = 'pointer'
					}}
					onPointerOut={() => {
						gsap.to(blobRef.current.material.uniforms.uBrightness, { duration: 2, value: 0.48 })
						gsap.to(blobRef.current.material.uniforms.uContrast, { duration: 2, value: 0.64 })
						gsap.to(blobRef.current.material.uniforms.uOscilation, { duration: 2, value: 0.44 })
						document.body.style.cursor = 'default'
					}}
					onPointerUp={() => {
						gsap.to(blobRef.current.material.uniforms.uNoiseStrength, { duration: 1, value: 0.2 })
						gsap.to(blobRef.current.material.uniforms.uFrequency, { duration: 1, value: 3 })
					}}
					onPointerDown={() => {
						gsap.to(blobRef.current.material.uniforms.uNoiseStrength, { duration: 1, value: 2.3 })
						gsap.to(blobRef.current.material.uniforms.uFrequency, { duration: 1, value: 8 })
					}}
					ref={blobRef}
					geometry={sphereGeo}
					castShadow
					receiveShadow
					material={blobMaterial}
					position={[6, 15, -6]}
					rotation={[0, 0, Math.PI]}
					scale={2}
				></mesh>
			</group>
		</>
	)
}
