import { useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { FC } from 'react'
import { MeshMatcapMaterial, TextureLoader } from 'three'

interface Props {
	map: any
	scroll: any
	faceRef: any
}

const Face: FC<Props> = ({ map, faceRef, scroll }) => {
	const matcap = useLoader(TextureLoader, '/assets/textures/9.png')
	const materialMatcap = new MeshMatcapMaterial({ matcap: matcap })
	const model = useGLTF('/assets/models/face.glb', true) as any
	model.nodes.Main_Fluid.material = materialMatcap
	model.nodes.nosoe.material = materialMatcap

	return (
		<>
			<primitive ref={faceRef} object={model.scene} position={[-30, -6, 0]} scale={[4, 4, 4]} />
		</>
	)
}
export default Face
