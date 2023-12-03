import { IShip } from 'library/types/marineFarming';
import { Popup } from 'react-map-gl';

interface IProps {
  info: IShip;
  onClose(): void;
}

const ShipPopup = ({ info, onClose }: IProps) => (
	<Popup
		closeOnMove
		closeButton={false}
		style={{ width: '224px', height: '138px', top: '-17px' }}
		closeOnClick={false}
		onClose={onClose}
		longitude={info.geometry.coordinates[0]}
		latitude={info.geometry.coordinates[1]}
		anchor="bottom-left"
	>
		<div className="popupContainer">
			<div className="popupDate">s</div>
			<div className="popupValue">s</div>
			<div className="popupCords">s</div>
		</div>
	</Popup>
);

export default ShipPopup;
