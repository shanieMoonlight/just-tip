
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDto, ShiftDto, ShiftRemovedResult, ShiftRosterItemDto } from '../../models';
import { EmployeeWeeklySummaryDto } from '../../models/employee-weekly-summary-dto';
import { ServerRoutes } from '../controllers/all-server-routes.js';
import { ABaseHttpService } from '../data-service/a-base-data.io.service.js';
import { Identifier } from '../data-service/identifier';
import { JustTipIoConfigService } from '../setup.js';

@Injectable({ providedIn: 'root' })
export class EmployeesIoService extends ABaseHttpService {

    constructor() {
        super(inject(JustTipIoConfigService), ServerRoutes.Employees.Controller);
    }


    add = (dto: EmployeeDto, opts?: unknown): Observable<EmployeeDto> =>
        this._postAction<EmployeeDto>(
            ServerRoutes.Employees.action('add'),
            dto,
            opts ?? {}
        );


    edit = (id: Identifier, dto: EmployeeDto, opts?: unknown): Observable<EmployeeDto> =>
        this._patchAction<EmployeeDto>(
            ServerRoutes.Employees.action('edit'),
            id,
            dto,
            opts ?? {}
        );


    deleteById = (id: string, opts?: unknown): Observable<EmployeeDto> =>
        this._deleteAction<EmployeeDto>(
            ServerRoutes.Employees.action('delete'),
            [id],
            opts ?? {}
        );


    getAll = (opts?: unknown): Observable<EmployeeDto[]> =>
        this._getAction<EmployeeDto[]>(
            ServerRoutes.Employees.action('getAll'),
            opts ?? {}
        );


    getById = (id: string, opts?: unknown): Observable<EmployeeDto> =>
        this._getActionById<EmployeeDto>(
            ServerRoutes.Employees.action('get'),
            [id],
            opts ?? {}
        );


    getAllByName = (name: string, opts?: unknown): Observable<EmployeeDto[]> =>
        this._getActionById<EmployeeDto[]>(
            ServerRoutes.Employees.action('getAllByName'),
            [name],
            opts ?? {}
        );


    addShift = (dto: ShiftDto, opts?: unknown): Observable<EmployeeDto> =>
        this._postAction<EmployeeDto>(
            ServerRoutes.Employees.action('addShift'),
            dto,
            opts ?? {}
        );


    removeShift = (employeeId: string, shiftId: string, opts?: unknown): Observable<ShiftRemovedResult> =>
        this._deleteAction<ShiftRemovedResult>(
        ServerRoutes.Employees.action('removeShift'),
        [employeeId, shiftId],
        opts ?? {}
    );


    getEmployeeWeeklySummaryById = (id: Identifier, weekNumber: number, opts?: unknown): Observable<EmployeeWeeklySummaryDto> =>
        this._getActionById<EmployeeWeeklySummaryDto>(
            ServerRoutes.Employees.action('getEmployeeWeeklySummaryByWeek'),
            [id, weekNumber],
            opts ?? {}
        );



    getUpcomingShifts = (employeeId: Identifier, opts?: unknown): Observable<ShiftRosterItemDto[]> => {
        return this._getActionById<ShiftRosterItemDto[]>(
            ServerRoutes.Employees.action('getUpcomingShifts'),
            [employeeId],
            opts ?? {}
        );
    };

}
