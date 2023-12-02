import React from 'react';

interface IProps {
	display: 'map' | 'chart' | 'table'
}

const MarineFarming: React.FunctionComponent<IProps> = ({ display }) => (
	<div>{`MarineFarming - ${display}`}</div>
);

export default MarineFarming;
