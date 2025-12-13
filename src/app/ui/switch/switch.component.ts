/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectionStrategy, Component, forwardRef, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'jt-ui-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => JtSwitchComponent),
            multi: true,
        },
    ],
})
export class JtSwitchComponent implements ControlValueAccessor {

    checked = model(false)
    protected _disabled = signal(false);

    //----------------//

    // CVA callbacks
    private _onChange: (value: boolean) => void = () => { };
    private _onTouched: () => void = () => { };

    onToggle(event: Event) {
        if (this._disabled())
            return;
        const input = event.target as HTMLInputElement;
        this.checked.set(input.checked);
        this._onChange(this.checked());
        this._onTouched();
    }

    //=======================//
    // ControlValueAccessor methods
    //=======================//

    // ControlValueAccessor
    writeValue(value: boolean | undefined): void {
        this.checked.set(!!value);
    }

    registerOnChange(fn: (value: boolean) => void): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this._disabled.set(!!isDisabled);
    }
}
