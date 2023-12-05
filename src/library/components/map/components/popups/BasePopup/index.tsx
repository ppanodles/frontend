/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import { Popup } from 'react-map-gl';
import Icon from '../../../../Icon/index';

import './styles.css';

interface IProps {
  content: React.ReactNode;
  cords: number[];
  onClose(): void;
}

function generateRandomDate(from: Date, to: Date) {
	return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
}

const BasePopup = ({content, onClose, cords }: IProps) => {
	const date = generateRandomDate(new Date(2022, 1, 1), new Date());
	const dateText = `${date.getDay() === 0 ? '01' : date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()}.${date.getMonth() < 10 ? `0${date.getMonth() === 0 ? '1' : date.getMonth()}` : date.getMonth()}.${date.getFullYear()}`;

	const dateTime = `${date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours()}:${date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes()}`;

	return (
		<Popup
			closeOnMove
			closeButton={false}
			style={{
				width: '223px', height: '138px', marginLeft: '10px', marginTop: '10px',
			}}
			closeOnClick={false}
			onClose={onClose}
			longitude={cords[0]}
			latitude={cords[1]}
			anchor="bottom-left"
		>
			<div className="popupContainer">
				<div className="popupContainer2">
					<div className="popupDateLine">
						<div className="popupBlock">
							<div className="popupIcon">
								<Icon iconName="calendar" />
							</div>
							<div className="popupValue">
								<span>
									{dateText}
								</span>
							</div>
						</div>
						<div className="popupBlock">
							<div className="popupIcon">
								<Icon iconName="clock" />
							</div>
							<div className="popupValue">
								{dateTime}
							</div>
						</div>
					</div>
					{content}
					<div className="popupCords">
						<Icon iconName="marker" />
						<div className="popupCordsValues">
							<span>{cords[0]}</span>
							<span>{cords[1]}</span>
						</div>
					</div>
				</div>
			</div>
		</Popup>
	);
};

export default BasePopup;
