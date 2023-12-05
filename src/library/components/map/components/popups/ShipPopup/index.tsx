import Icon from 'library/components/Icon';
import BasePopup from '../BasePopup';

import './styles.css';

interface IProps {
  name?: string;
  coordinates: number[];
  onClose(): void;
}

const ShipPopup = ({ name, coordinates, onClose }: IProps) => (
	<BasePopup
		cords={coordinates}
		onClose={onClose}
		content={(
			<div className="shipPopupValue">
				<Icon iconName="marine-farming" />
				<span className="shipPopupValueText">{name || 'Без наименования'}</span>
			</div>
		)}
	/>
);

export default ShipPopup;
