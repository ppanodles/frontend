import Icon from 'library/components/Icon';
import { Popup } from 'react-map-gl';

import './styles.css';
import dayjs from 'dayjs';

interface IProps {
  name?: string;
  coordinates: number[];
  onClose(): void;
  destination: string;
  imo: string;
  mmsi: string;
  dateUTC: string;
}

const ShipPopup = ({
	name, coordinates, onClose, destination, imo, mmsi, dateUTC,
}: IProps) => {
	const [fullDate, time] = dayjs(dateUTC, ['DD-MM-YYYY HH:mm', 'DD-MM-YYYY HH:mm:ss', 'YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD HH:mm']).format('DD-MM-YYYY HH:mm').split(' ');

	return (
		<Popup
			closeOnMove
			closeButton={false}
			style={{
				width: '352px',
				height: '120px',
				marginTop: '-17px',
			}}
			closeOnClick={false}
			onClose={onClose}
			longitude={coordinates[0]}
			latitude={coordinates[1]}
			anchor="bottom-left"
		>
			<div className="shipPopupContainer">
				<div className="shipPopupContainer2">
					<div className="shipPopupDateLine">
						<div className="popupBlock">
							<div className="popupIcon">
								<Icon iconName="anchor" />
							</div>
							<div className="shipPopupDateValue">{destination}</div>
						</div>
						<div className="popupBlock">
							<div className="popupIcon">
								<Icon iconName="calendar" />
							</div>
							<div className="shipPopupDateValue">{fullDate}</div>
						</div>
						<div className="popupBlock">
							<div className="popupIcon">
								<Icon iconName="clock" />
							</div>
							<div className="shipPopupDateValue">{time}</div>
						</div>
					</div>
					<div className="shipPopupValue">
						<div className="shipPopupName">
							<Icon iconName="marine-farming" style={{ color: '#00E5FF' }} />
							<span className="shipName">{name || 'Без наименования'}</span>
						</div>
						<div className="shipPopupInfo">
							<div className="shipIMO">
								<div className="shipIMOName">IMO</div>
								<div className="shipIMOValue">{imo}</div>
							</div>
							<div className="shipIMO">
								<div className="shipIMOName">MMSI</div>
								<div className="shipIMOValue">{mmsi}</div>
							</div>
						</div>
					</div>
					<div className="shipPopupCords">
						<Icon iconName="marker" />
						<div className="shipPopupCordsValues">
							<span>{coordinates[0]}</span>
							<span>{coordinates[1]}</span>
						</div>
					</div>
				</div>
			</div>
		</Popup>
	);
};

export default ShipPopup;
