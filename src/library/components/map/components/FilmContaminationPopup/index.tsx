/* eslint-disable no-nested-ternary */
import { IFilmContamination } from 'library/types/marineFarming.d';
import { Popup } from 'react-map-gl';
import Icon from '../../../Icon/index';

import './styles.css';
import { getFilmContaminationColorByType } from '../../helpers';

interface IProps {
  info: IFilmContamination;
  onClose(): void;
}

function generateRandomDate(from: Date, to: Date) {
	return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
}

const FilmContaminationPopup = ({ info, onClose }: IProps) => {
	const date = generateRandomDate(new Date(2022, 1, 1), new Date());
	const dateText = `${date.getDay() === 0 ? '1' : date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()}.${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}.${date.getFullYear()}`;
	const dateTime = `${date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours()}:${date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes()}`;

	return (
		<Popup
			closeOnMove
			closeButton={false}
			style={{
				width: '223px', height: '138px', marginLeft: '30px',
			}}
			closeOnClick={false}
			onClose={onClose}
			longitude={info.geometry.coordinates[0][0]}
			latitude={info.geometry.coordinates[0][1]}
			anchor="bottom-left"
		>
			<div className="popupContainer">
				<div className="popupContainer2">
					<div className="popupDateLine">
						<div className="popupDateBlock">
							<div className="popupDateIcon">
								<Icon iconName="calendar" />
							</div>
							<div className="popupDateValue">
								<span>
									{dateText}
								</span>
							</div>
						</div>
						<div className="popupTimeBlock">
							<div className="popupTimeIcon">
								<Icon iconName="clock" />
							</div>
							<div className="popupTimeValue">
								{dateTime}
							</div>
						</div>
					</div>
					<div className="popupValue">
						<div className="popupValueIcon" style={{backgroundColor: getFilmContaminationColorByType(info.type)}} />
						<span className="popupValueText">{info.type}</span>
					</div>
					<div className="popupCords">
						<Icon iconName="marker" />
						<div className="popupCordsValues">
							<span>{info.geometry.coordinates[0][0]}</span>
							<span>{	info.geometry.coordinates[0][1]}</span>
						</div>
					</div>
				</div>
			</div>
		</Popup>
	);
};

export default FilmContaminationPopup;
