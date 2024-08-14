export interface City {
	name: string;
	local_names: {
		[index: string]: string;
	};
	lat: number;
	lng: number;
	country: string;
	state?: string;
}
