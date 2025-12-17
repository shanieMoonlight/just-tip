import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirstErrorComponent, FirstErrorDirective } from '@spider-baby/utils-forms';
import { CreateTipDto } from '../../../data/models';
import { JtUiButton } from '../../buttons/button/button.component';
import { JtUiIconButton } from '../../buttons/icon-button/icon-button';
import { JtUiTextButton } from '../../buttons/text-button/text-button.component';
import { JtUiIcon } from '../../icon/icon';

//##########################//

interface ITipForm {
  dateTime: FormControl<Date>;
  amountEuros: FormControl<number>;
}

//##########################//

@Component({
  selector: 'jt-tip-form',
  imports: [
    ReactiveFormsModule,
    FirstErrorDirective,
    FirstErrorComponent,
    JtUiButton,
    JtUiIconButton,
    JtUiTextButton,
    JtUiIcon
  ],
  templateUrl: './tip-form.html',
  styleUrl: './tip-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // host: {
  //   ngSkipHydration: 'true'
  // },
})
export class JtTipForm {

  private _fb = inject(FormBuilder);

  //- - - - - - - - - - - - -//

  tip = output<CreateTipDto>();


  //- - - - - - - - - - - - -//

  protected _form = this._fb.group<ITipForm>({
    dateTime: this._fb.nonNullable.control<Date>(new Date(), [Validators.required]),
    amountEuros: this._fb.nonNullable.control<number>(null, [Validators.required]),
  });


  //----------------//

  /**
   *
   */
  constructor() {

    this._form.valueChanges.subscribe((val) => {
      console.log(`Form Changes: ${val}`);
      console.log(`Form Changes: )`, this._form.errors);
    });

  }

  //- - - - - - - - - - - - -//

  protected submitForm() {
    if (!this._form.valid)
      return;

    const tip: CreateTipDto = this.toTipDto();
    console.log('submitForm',tip);
    this.tip.emit(tip);
  }

  wtf() {
    console.log('WTF', this._form);
  }



  private toTipDto(): CreateTipDto {
    const tip: CreateTipDto = {
      ...this._form.value,
      // id: this._tipToEdit()?.id ?? ''
    };
    return tip;
  }



}

