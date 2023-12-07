import BasePopup from '../BasePopup';

import './styles.css';

interface IProps {
  date: string;
  coordinates: number[];
  onClose(): void;
}

const FilmContaminationPopup = ({date, coordinates, onClose }: IProps) => (
	<BasePopup
		cords={coordinates}
		onClose={onClose}
		date={date}
		content={(
			<div className="filmContaminationPopupValue">
				<div
					className="filmContaminationPopupValueIcon"
				/>
				<span className="filmContaminationPopupValueText">Плёночное загрязнение</span>
			</div>
		)}
	/>
);

export default FilmContaminationPopup;
