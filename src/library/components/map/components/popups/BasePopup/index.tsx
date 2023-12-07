/* eslint-disable no-undef */
import { Popup } from 'react-map-gl';
import { getFormattedDate } from 'library/components/map/helpers';
import Icon from '../../../../Icon/index';

import './styles.css';

interface IProps {
  content: React.ReactNode;
  cords: number[];
  onClose(): void;
  date: string;
  styles?: any;
}

const BasePopup = ({
	content, onClose, cords, date, styles,
}: IProps) => {
	const {fullDate, time} = getFormattedDate(date);

	return (
		<Popup
			closeOnMove
			closeButton={false}
			style={styles ?? {
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
									{fullDate}
								</span>
							</div>
						</div>
						<div className="popupBlock">
							<div className="popupIcon">
								<Icon iconName="clock" />
							</div>
							<div className="popupValue">
								{time}
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
