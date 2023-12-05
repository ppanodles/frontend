/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import Icon from 'library/components/Icon';
import { Popup } from 'react-map-gl';

import './styles.css';

interface IProps {
  name?: string;
  coordinates: number[];
  onClose(): void;
  destination: string;
  imo: string;
  mmsi: string;
}

function generateRandomDate(from: Date, to: Date) {
	return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
}

const ShipPopup = ({
	name, coordinates, onClose, destination, imo, mmsi,
}: IProps) => {
	const date = generateRandomDate(new Date(2022, 1, 1), new Date());
	const dateText = `${
		date.getDay() === 0 ? '01' : date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()
	}.${
		date.getMonth() < 10 ? `0${date.getMonth() === 0 ? '1' : date.getMonth()}` : date.getMonth()
	}.${date.getFullYear()}`;

	const dateTime = `${date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours()}:${
		date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes()
	}`;

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
							<div className="popupValue">{destination}</div>
						</div>
						<div className="popupBlock">
							<div className="popupIcon">
								<Icon iconName="calendar" />
							</div>
							<div className="shipPopupDateValue">{dateText}</div>
						</div>
						<div className="popupBlock">
							<div className="popupIcon">
								<Icon iconName="clock" />
							</div>
							<div className="popupValue">{dateTime}</div>
						</div>
					</div>
					<div className="shipPopupValue">
						<div className="shipPopupName">
							<Icon iconName="marine-farming" style={{ color: '#00E5FF' }} />
							<span className="popupValue">{name || 'Без наименования'}</span>
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
