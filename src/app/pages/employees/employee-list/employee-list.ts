import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'jt-employee-list',
  imports: [],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JtEmployeeListPage {}
