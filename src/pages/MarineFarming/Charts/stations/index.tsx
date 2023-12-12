import React from 'react';
import { isEmpty } from 'lodash';
import selectFilteredMonitoringStations from 'library/selectors/stations.selector';
import { useSelector } from 'react-redux';
import palette from 'resources/theme/palette';

import './styles.css';
import FilterType from 'library/constants/FilterType';
import { RootState } from 'main/rootReducer';

interface IProps {}

const StationsCharts: React.FunctionComponent<IProps> = () => {
	const monitoringStationsData = useSelector((state: RootState) => selectFilteredMonitoringStations(state, FilterType.LIST_SELECTOR));

	if (isEmpty(monitoringStationsData)) {
		return null;
	}

	const selectedStation = monitoringStationsData[0];

	const metals = selectedStation.metals.map((metal) => (
		<div className="metalContainer" key={`${metal.name}${metal.label}${metal.leap}`}>
			<div className="metalNameBlock">
				<div style={{fontSize: '22px'}}>{metal.label}</div>
				<div style={{fontSize: '11px'}}>{metal.name}</div>
			</div>
			<div className="metalParamsBlock">
				<div className="metalParam">
					<div style={{width: '15px'}}>{metal.underworld}</div>
					<div className="metalLine">
						<div style={{width: `${metal.underworld}%`, height: '100%', backgroundColor: '#FF9315'}} />
					</div>
				</div>

				<div className="metalParam">
					<div style={{width: '15px'}}>{metal.surface}</div>
					<div className="metalLine">
						<div style={{width: `${metal.surface}%`, height: '15px', backgroundColor: '#304FFE'}} />
					</div>
				</div>

				<div className="metalParam">
					<div style={{width: '15px'}}>{metal.leap}</div>
					<div className="metalLine">
						<div style={{width: `${metal.leap}%`, height: '15px', backgroundColor: '#22C38E'}} />
					</div>
				</div>
			</div>
		</div>
	));

	return (
		<div className="stationChartContainer" style={{backgroundColor: palette.background.paper}}>
			<div className="stationChartHeader">
				<div className="headerLeftBlock">
					<div className="headerTitle">{selectedStation.name}</div>
					<div className="headerSubtitle">
						Содержание металлов, мкг/дм3
					</div>
				</div>
				<div className="headerRightBlock">
					<div className="metalLabel">
						<div
							style={{
								width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22C38E',
							}}
						/>
						<div>Дно</div>
					</div>
					<div className="metalLabel">
						<div
							style={{
								width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#304FFE',
							}}
						/>
						<div>Поверхность</div>
					</div>
					<div className="metalLabel">
						<div
							style={{
								width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF9315',
							}}
						/>
						<div>Скачек</div>
					</div>
				</div>
			</div>
			<div className="listOfMetalsBlock">
				{metals}
			</div>
		</div>
	);
};

export default StationsCharts;
