import React from 'react';
import Icon from 'library/components/Icon';

import './styles.css';

const GasesInfoTable: React.FunctionComponent = () => (
	<div className="gasesInfoTable">
		<div className="gasesVariant">
			<div className="gasesInfoIcon"><Icon iconName="heap" style={{color: '#880E4F'}} /></div>
			<div className="gasesInfoBorders">4.712 – 294.7</div>
		</div>
		<div className="gasesVariant">
			<div className="gasesInfoIcon"><Icon iconName="heap" style={{color: '#C2185B'}} /></div>
			<div className="gasesInfoBorders">294.7 – 612.2</div>
		</div>
		<div className="gasesVariant">
			<div className="gasesInfoIcon"><Icon iconName="heap" style={{color: '#DD2C00'}} /></div>
			<div className="gasesInfoBorders">612.2 – 1107.14</div>
		</div>
		<div className="gasesVariant">
			<div className="gasesInfoIcon"><Icon iconName="heap" style={{color: '#FF9100'}} /></div>
			<div className="gasesInfoBorders">1107.14 – 2082.9</div>
		</div>
		<div className="gasesVariant">
			<div className="gasesInfoIcon"><Icon iconName="heap" style={{color: '#FFC400'}} /></div>
			<div className="gasesInfoBorders">2082.9 – 5347.57</div>
		</div>
		<div className="gasesVariant">
			<div className="gasesInfoIcon"><Icon iconName="heap" style={{color: '#FFEB3B'}} /></div>
			<div className="gasesInfoBorders">5347.57 – 682.5k</div>
		</div>
	</div>
);

export default GasesInfoTable;
