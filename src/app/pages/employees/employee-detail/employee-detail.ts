import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'jt-employee-detail',
  imports: [],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JtEmployeeDetailPage {}
