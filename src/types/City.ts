export interface City {
	name: string;
	local_names: {
		[index: string]: string;
	};
	lat: number;
	lon: number;
	country: string;
	state?: string;
}

export interface CityWithName extends City {
	fullName: string;
}
