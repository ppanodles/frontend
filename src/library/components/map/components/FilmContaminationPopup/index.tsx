import { IFilmContamination } from 'library/types/marineFarming.d';
import { Popup } from 'react-map-gl';

interface IProps {
  info: IFilmContamination;
  onClose(): void;
}

const FilmContaminationPopup = ({ info, onClose }: IProps) => (
	<Popup
		closeOnMove
		closeButton={false}
		style={{ width: '224px', height: '138px', marginLeft: '30px' }}
		closeOnClick={false}
		onClose={onClose}
		longitude={info.geometry.coordinates[0][0]}
		latitude={info.geometry.coordinates[0][1]}
		anchor="bottom-left"
	>
		<div className="popupContainer">
			<div className="popupDate">s</div>
			<div className="popupValue">s</div>
			<div className="popupCords">s</div>
		</div>
	</Popup>
);

export default FilmContaminationPopup;
