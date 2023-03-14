import React, { FC } from 'react'
import Stats from 'three/examples/jsm/libs/stats.module'
import { HTMLMesh } from 'three/examples/jsm/interactive/HTMLMesh'
import { useFrame } from '@react-three/fiber'

interface Props {}

const StatsWidget: FC<Props> = () => {
	const stats = new (Stats as any)()
	stats.dom.style.width = '80px'
	stats.dom.style.height = '48px'
	document.body.appendChild(stats.dom)

	const statsMesh: any = new HTMLMesh(stats.dom)
	statsMesh.position.x = -1
	statsMesh.position.y = 1
	statsMesh.position.z = 0
	statsMesh.scale.setScalar(6)

	useFrame(() => {
		stats.update()

		statsMesh.material.map.update()
	})
	return <group>{false && <primitive object={statsMesh} />}</group>
}

export default StatsWidget
