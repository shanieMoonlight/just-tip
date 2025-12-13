
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerRoutes } from '../controllers/all-server-routes';
import { ABaseHttpService } from '../data-service/a-base-data.io.service';
import { JustTipIoConfigService } from '../setup';
import { CreateTipDto } from '../../models/create-tip-dto';
import { TipDto } from '../../models/tip-dto';
import { UpdateTipDto } from '../../models/update-tip-dto';
import { Identifier } from '../data-service/identifier';

@Injectable({ providedIn: 'root' })
export class TipsIoService extends ABaseHttpService {

    constructor() {
        super(inject(JustTipIoConfigService), ServerRoutes.Tips.Controller);
    }


    add = (dto: CreateTipDto, opts?: unknown): Observable<TipDto> =>
        this._postAction<TipDto>(
            ServerRoutes.Tips.action('add'),
            dto,
            opts ?? {}
        );


    edit = (dto: UpdateTipDto, id: Identifier, opts?: unknown): Observable<TipDto> =>
        this._patchAction<TipDto>(
            ServerRoutes.Tips.action('edit'),
            id,
            dto,
            opts ?? {}
        );


    deleteById = (id: string, opts?: unknown): Observable<TipDto> =>
        this._deleteAction<TipDto>(
            ServerRoutes.Tips.action('delete'),
            [id],
            opts ?? {}
        );


    getAll = (opts?: unknown): Observable<TipDto[]> =>
        this._getAction<TipDto[]>(
            ServerRoutes.Tips.action('getAll'),
            opts ?? {}
        );


    getById = (id: string, opts?: unknown): Observable<TipDto> =>
        this._getActionById<TipDto>(
            ServerRoutes.Tips.action('get'),
            [id],
            opts ?? {}
        );


    getTotalTipsCurrentWeek = (opts?: unknown): Observable<TipDto> =>
        this._getAction<TipDto>(
            ServerRoutes.Tips.action('getTotalTipsCurrentWeek'),
            opts ?? {}
        );


    getTotalTipsUpcomingWeek = (opts?: unknown): Observable<TipDto> =>
        this._getAction<TipDto>(
            ServerRoutes.Tips.action('getTotalTipsUpcomingWeek'),
            opts ?? {}
        );

}
