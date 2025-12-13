
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ABaseHttpService } from '../data-service/a-base-data.io.service';
import { JustTipIoConfigService } from '../setup';
import { RosterDto } from '../../models';
import { ServerRoutes } from '../controllers/all-server-routes';

@Injectable({ providedIn: 'root' })
export class RosterIoService extends ABaseHttpService {

    constructor() {
        super(inject(JustTipIoConfigService), ServerRoutes.Roster.Controller);
    }

  
    currentWeek = (opts?: unknown): Observable<RosterDto> =>
        this._getAction<RosterDto>(
            ServerRoutes.Roster.action('current-week'),
            opts ?? {}
        );
    
  
    upcomingWeek = (opts?: unknown): Observable<RosterDto> =>
        this._getAction<RosterDto>(
            ServerRoutes.Roster.action('upcoming-week'),
            opts ?? {}
        );
    
}
