// This file is replaced following the specifications contained in the angular.json file
import { EnumEnvs } from "./envs";
import { versions } from './versions';

export const environment = {
	name: EnumEnvs.Development,
	bootstrap: versions['bootstrap'],
	ngBootstrap: versions['ngBootstrap'],
};