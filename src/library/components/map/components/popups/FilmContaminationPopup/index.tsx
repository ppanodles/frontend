import { getFilmContaminationColorByType } from '../../../helpers';
import BasePopup from '../BasePopup';

import './styles.css';

interface IProps {
  type: 'Нефть' | 'Нефтепродукты' | 'Масла' | 'Естественные' | 'Сточные';
  coordinates: number[];
  onClose(): void;
}

const FilmContaminationPopup = ({ type, coordinates, onClose }: IProps) => (
	<BasePopup
		cords={coordinates}
		onClose={onClose}
		content={(
			<div className="filmContaminationPopupValue">
				<div
					className="filmContaminationPopupValueIcon"
					style={{ backgroundColor: getFilmContaminationColorByType(type) }}
				/>
				<span className="filmContaminationPopupValueText">{type}</span>
			</div>
		)}
	/>
);

export default FilmContaminationPopup;
