
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ABaseHttpService } from '../data-service/a-base-data.io.service';
import { JustTipIoConfigService } from '../setup';
import { RosterDto, ShiftDto, ShiftWithEmployeeDto } from '../../models';
import { ServerRoutes } from '../controllers/all-server-routes';

@Injectable({ providedIn: 'root' })
export class RosterIoService extends ABaseHttpService {

    constructor() {
        super(inject(JustTipIoConfigService), ServerRoutes.Roster.Controller);
    }

  
    currentWeek = (opts?: unknown): Observable<RosterDto> =>
        this._getAction<RosterDto>(
            ServerRoutes.Roster.action('getCurrentWeek'),
            opts ?? {}
        );
    
  
    upcomingWeek = (opts?: unknown): Observable<RosterDto> =>
        this._getAction<RosterDto>(
            ServerRoutes.Roster.action('getUpcomingWeek'),
            opts ?? {}
        );
  
    getByWeek = (weekNumber: number, opts?: unknown): Observable<RosterDto> =>
        this._getActionById<RosterDto>(
            ServerRoutes.Roster.action('getByWeek'),
            weekNumber,
            opts ?? {}
        );

    getByShiftId = (shiftId: string, opts?: unknown): Observable<ShiftWithEmployeeDto> =>
        this._getActionById<ShiftWithEmployeeDto>(
            ServerRoutes.Roster.action('getShift'),
            shiftId,
            opts ?? {}
        );

    editShift = (shiftId: string, shift: ShiftDto, opts?: unknown): Observable<ShiftDto> =>
        this._patchAction<ShiftDto>(
            ServerRoutes.Roster.action('editShift'),
            shiftId,
            shift,
            opts ?? {}
        );
    
}
