import { EnumEnvs } from "./envs";
import { versions } from "./versions";

export const environment = {
    name: EnumEnvs.UAT,
	bootstrap: versions['bootstrap'],
	ngBootstrap: versions['ngBootstrap'],
};