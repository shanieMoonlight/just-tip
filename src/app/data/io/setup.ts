import { EnvironmentProviders, InjectionToken, Provider } from "@angular/core";

//############################//


export const JustTipIoConfigService = new InjectionToken<JustTipIoConfigOptions>('JustTipIoConfig')


//############################//


/** Interface for IO config options */
export interface JustTipIoConfigOptions {
  /** base JustTip api url */
  baseUrl: string;
}


//############################//


export class JustTipIoSetup {

    /**
     * 
     */
    static provideJustTipIo = (config: JustTipIoConfigOptions)
        : (Provider | EnvironmentProviders)[] =>
        {            
            return [
                {
                    provide: JustTipIoConfigService,
                    useValue: config,
                },
            ]
        }

} //Cls