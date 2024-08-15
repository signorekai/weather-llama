export type Forecast = (
	| {
			dt: number;
			lt: string;
			main: {
				temp: number;
				temp_min: number;
				temp_max: number;
				pressure: number;
				sea_level: number;
				grnd_level: number;
				humidity: number;
				temp_kf: number;
			};
			weather: {
				id: number;
				main: string;
				description: string;
				icon: string;
			}[];
			clouds: {
				all: number;
			};
			wind: {
				speed: number;
				deg: number;
			};
			sys: {
				pod: string;
			};
			dt_txt: string;
			rain?: undefined;
			snow?: undefined;
	  }
	| {
			dt: number;
			lt: string;
			main: {
				temp: number;
				temp_min: number;
				temp_max: number;
				pressure: number;
				sea_level: number;
				grnd_level: number;
				humidity: number;
				temp_kf: number;
			};
			weather: {
				id: number;
				main: string;
				description: string;
				icon: string;
			}[];
			clouds: {
				all: number;
			};
			wind: {
				speed: number;
				deg: number;
			};
			rain: {
				'3h': number;
			};
			sys: {
				pod: string;
			};
			dt_txt: string;
			snow?: undefined;
	  }
	| {
			dt: number;
			lt: string;
			main: {
				temp: number;
				temp_min: number;
				temp_max: number;
				pressure: number;
				sea_level: number;
				grnd_level: number;
				humidity: number;
				temp_kf: number;
			};
			weather: {
				id: number;
				main: string;
				description: string;
				icon: string;
			}[];
			clouds: {
				all: number;
			};
			wind: {
				speed: number;
				deg: number;
			};
			rain: {
				'3h': number;
			};
			snow: {
				'3h': number;
			};
			sys: {
				pod: string;
			};
			dt_txt: string;
	  }
	| {
			dt: number;
			lt: string;

			main: {
				temp: number;
				temp_min: number;
				temp_max: number;
				pressure: number;
				sea_level: number;
				grnd_level: number;
				humidity: number;
				temp_kf: number;
			};
			weather: {
				id: number;
				main: string;
				description: string;
				icon: string;
			}[];
			clouds: {
				all: number;
			};
			wind: {
				speed: number;
				deg: number;
			};
			rain: {
				'3h'?: undefined;
			};
			snow: {
				'3h'?: undefined;
			};
			sys: {
				pod: string;
			};
			dt_txt: string;
	  }
) & {
	localDate?: string;
};

export interface SortedForecast {
	[T: string]: Forecast[];
}
