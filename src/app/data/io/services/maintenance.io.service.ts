
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDto } from '../../models';
import { ServerRoutes } from '../controllers/all-server-routes';
import { JustTipIoConfigService } from '../setup';
import { ABaseHttpService } from '../data-service/a-base-data.io.service';

@Injectable({ providedIn: 'root' })
export class MaintenanceIoService extends ABaseHttpService {

    constructor() {
        super(inject(JustTipIoConfigService), ServerRoutes.Maintenance.Controller);
    }

  
    initializeDb = (opts?: unknown): Observable<EmployeeDto> =>
        this._postAction<EmployeeDto>(
            ServerRoutes.Maintenance.action('initializeDb'),
            opts ?? {}
        );
    
}
