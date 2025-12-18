import { ChangeDetectionStrategy, Component, computed, inject, Input, output, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { FirstErrorComponent, FirstErrorDirective } from '@spider-baby/utils-forms';
import { EmployeeDto, ShiftDto } from '../../../data/models';
import { JtUiButton } from '../../buttons/button/button.component';
import { JtUiIconButton } from '../../buttons/icon-button/icon-button';
import { JtUiTextButton } from '../../buttons/text-button/text-button.component';
import { JtUiIcon } from '../../icon/icon';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ShiftDateUtils } from './shift-date-utils';


//##########################//

interface IShiftForm {
  id: FormControl<string | null>;
  employeeId: FormControl<string>;
  date: FormControl<Date>;
  startTimeUtc: FormControl<Date>;
  endTimeUtc: FormControl<Date>;
}

//##########################//
@Component({
  selector: 'jt-shift-form',
  imports: [
    ReactiveFormsModule,
    FirstErrorDirective,
    FirstErrorComponent,
    JtUiButton,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  templateUrl: './shift-form.html',
  styleUrl: './shift-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    ngSkipHydration: 'true'
  },
})
export class JtUiShiftForm {

  private _fb = inject(FormBuilder);
  private _dateUtils = inject(ShiftDateUtils);

  //- - - - - - - - - - - - -//

  protected _employee = signal<EmployeeDto | undefined>(undefined);
  @Input({ required: true })
  set employee(val: EmployeeDto) {
    this._employee.set(val ?? undefined);

    if (!val)
      return;
    this._form.patchValue({
      employeeId: val.id
    });
  }



  protected _shiftToEdit = signal<ShiftDto | undefined>(undefined);
  @Input()
  set shiftToEdit(shift: ShiftDto | null | undefined) {
    this._shiftToEdit.set(shift ?? undefined);
    if (!shift)
      return;
    this._form.patchValue({
      id: shift.id,
      employeeId: shift.employeeId,
      date: new Date(shift.date),
      startTimeUtc: new Date(shift.startTimeUtc),
      endTimeUtc: new Date(shift.endTimeUtc)
    });
    this._form.updateValueAndValidity();
    this._form.markAllAsTouched();
  }

  shift = output<ShiftDto>();


  //- - - - - - - - - - - - -//

  protected _minDate = signal(this._dateUtils.floorToDay(new Date()));
  protected _minStartTime = signal(this._dateUtils.floorToDay(new Date()));
  protected _minEndTime = signal(this._minStartTime());

  protected _form = this._fb.group<IShiftForm>({
    id: this._fb.nonNullable.control<string>(undefined, []),
    employeeId: this._fb.nonNullable.control<string>('', [Validators.required]),
    date: this._fb.nonNullable.control<Date>(new Date(), [Validators.required]),
    startTimeUtc: this._fb.nonNullable.control<Date>(null, [Validators.required]),
    endTimeUtc: this._fb.nonNullable.control<Date>(null, [Validators.required]),
  });


  protected _isEditMode = computed(() => !!this._shiftToEdit());


  protected _startTime$ = this._form.controls.startTimeUtc
    .valueChanges.pipe(
      map(val => val ?? this._dateUtils.floorToHour(new Date()))
    )

  protected _startTime = toSignal(this._startTime$, {
    initialValue: this._dateUtils.floorToDay(new Date())
  });

  //----------------//

  /**
   *
   */
  constructor() {

    this._form.controls.endTimeUtc.valueChanges.subscribe(() => {
      this.validateStartEndTimes()
    });

    this._form.controls.startTimeUtc.valueChanges.subscribe(val => {
      this._minEndTime.set(val ?? this._dateUtils.floorToHour(new Date()));
      this.validateStartEndTimes()
    });


  }

  //- - - - - - - - - - - - -//

  protected submitForm() {
    if (!this._form.valid)
      return;

    const shift: ShiftDto = this.toShiftDto();
    console.log('submitForm', shift);
    this.shift.emit(shift);
  }


  protected update() {
    if (!this._form.valid)
      return;

    const shift: ShiftDto = this.toShiftDto();
    console.log('update', shift);
    this.shift.emit(shift);
  }


  private toShiftDto(): ShiftDto {
    const shift: ShiftDto = {
      ...this._form.value,
      // id: this._shiftToEdit()?.id ?? ''
    };
    return shift;
  }


  //- - - - - - - - - - - - -//

  private validateStartEndTimes() {

    const start = this._form.controls.startTimeUtc.value;
    const end = this._form.controls.endTimeUtc.value;
    if (this._dateUtils.isStartAfterEnd(start, end)) {
      this._form.controls.endTimeUtc.setErrors({ endTimeBeforeStartTime: true });
    } else {
      this._form.controls.endTimeUtc.setErrors(null);
    }
  }





}
