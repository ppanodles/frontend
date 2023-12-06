/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import { Popup } from 'react-map-gl';
import Icon from '../../../../Icon/index';

import './styles.css';

interface IProps {
  coordinates: number[];
  onClose(): void;
  name: string;
}

const PortPopup = ({onClose, coordinates, name}: IProps) => (
	<Popup
		closeOnMove
		closeButton={false}
		style={{
			width: '186px', height: '112px', marginLeft: '13px', marginTop: '17px',
		}}
		closeOnClick={false}
		onClose={onClose}
		longitude={coordinates[0]}
		latitude={coordinates[1]}
		anchor="bottom-left"
	>
		<div className="portPopupContainer">
			<div className="portPopupContainer2">
				<div className="portNameBlock">
					<Icon iconName="anchor" />
					<div className="portName">{name}</div>
				</div>
				<div className="popupCords">
					<Icon iconName="marker" style={{ color: '#00E5FF' }} />
					<div className="popupCordsValues">
						<span>{coordinates[0]}</span>
						<span>{coordinates[1]}</span>
					</div>
				</div>
			</div>
		</div>
	</Popup>
);

export default PortPopup;
