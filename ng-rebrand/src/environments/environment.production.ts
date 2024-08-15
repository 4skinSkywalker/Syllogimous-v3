import { EnumEnvs } from "./envs";
import { versions } from "./versions";

export const environment = {
    name: EnumEnvs.Production,
	bootstrap: versions['bootstrap'],
	ngBootstrap: versions['ngBootstrap'],
};