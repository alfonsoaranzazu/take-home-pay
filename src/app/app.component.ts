import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public model: any = {};
  public takeHomePay = {
      yearly: 0,
      monthly: 0,
      biweekly: 0,
      weekly: 0
  };

  public submitted = false;

  onSubmit() {
    console.log('model: ', this.model);
    this.submitted = true;

    let taxableIncome = this.model.salary;

    if (Number(this.model.deduction) > 0) {
      taxableIncome -= this.model.deduction;
      console.log('taxable income ');
    }
  }
}
