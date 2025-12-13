
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerRoutes } from '../controllers/all-server-routes';
import { ABaseHttpService } from '../data-service/a-base-data.io.service';
import { JustTipIoConfigService } from '../setup';
import { JtOutboxMessageDto } from '../../models';

@Injectable({ providedIn: 'root' })
export class JtOutboxMessagesIoService extends ABaseHttpService {

    constructor() {
        super(inject(JustTipIoConfigService),ServerRoutes.JtOutboxMessages.Controller);
    }

  
    deleteById = (id: string, opts?: unknown): Observable<JtOutboxMessageDto> =>
        this._deleteAction<JtOutboxMessageDto>(
            ServerRoutes.JtOutboxMessages.action('delete'),
           [id],
           opts ?? {}
        );
    
  
    getAll = (opts?: unknown): Observable<JtOutboxMessageDto[]> =>
        this._getAction<JtOutboxMessageDto[]>(
            ServerRoutes.JtOutboxMessages.action('getAll'),
            opts ?? {}
        );
    
  
    getById = (id: string, opts?: unknown): Observable<JtOutboxMessageDto> =>
        this._getActionById<JtOutboxMessageDto>(
            ServerRoutes.JtOutboxMessages.action('get'),
           [id],
           opts ?? {}
        );
    
}
