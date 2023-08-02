import React from 'react'
import { useParams } from 'react-router-dom'

function ServiceDetail() {
	const {slug} = useParams()

	return (
		<div>ServiceDetail {slug}</div>
	)
}

export default ServiceDetail