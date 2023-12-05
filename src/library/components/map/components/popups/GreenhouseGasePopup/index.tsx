import Icon from 'library/components/Icon';
import { getH3ColorByEmission } from 'library/components/map/helpers';
import BasePopup from '../BasePopup';

import './styles.css';

interface IProps {
  emission: number;
  coordinates: number[];
  onClose(): void;
}

const GreenhouseGasePopup = ({ emission, coordinates, onClose }: IProps) => (
	<BasePopup
		cords={coordinates}
		onClose={onClose}
		styles={{
			width: '223px', height: '138px',
		}}
		content={(
			<div className="greenhouseGaseValue">
				<Icon iconName="heap" style={{color: getH3ColorByEmission(emission)}} />
				<div className="greenhouseGasPopupValueBlock">
					<span>Эмиссия</span>
					<span>{emission}</span>
				</div>
			</div>
		)}
	/>
);

export default GreenhouseGasePopup;
