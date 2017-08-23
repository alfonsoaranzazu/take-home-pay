import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public model: any = {
    status: "Single",
    dependents: 0,
    deduction: "0"
  };
  public takeHomePay = {
      yearly: 0,
      monthly: 0,
      biweekly: 0,
      weekly: 0
  };

  public standardDeduction = {
    single: 10400,
    married: 20800,
    head: 13400,
    dependent: 4050
  };

  public frequencies = {
    yearly: 1,
    monthly: 12,
    biweekly: 26,
    weekly: 52
  }

  public totalTax = 0;
  // social security at 6.2% in 2017
  public socialSecurity = .062;
  // medicare at 1.45% in 2017
  public medicare = .0145;
  public fica = this.socialSecurity + this.medicare;

  public submitted = false;

  onSubmit() {
    this.submitted = true;
    this.federalIncomeTaxRate(this.calcDeductions(this.model.status));
    this.payFrequency(this.totalTax, this.ficaDeduction(this.model.salary));
  }

  // deduct correct filing status from income
  private calcDeductions(status) {
    // calculate total amount of dependents for deduction
    const dependents = this.model.dependents * this.standardDeduction.dependent;

    if (status === 'Single') {
      return Math.max(0, this.model.salary - this.standardDeduction.single - dependents);
    }
    else if (status === 'Married') {
      return Math.max(0, this.model.salary - this.standardDeduction.married - dependents);
    }
    else if (status === 'Head') {
      return Math.max(0, this.model.salary - this.standardDeduction.head - dependents);
    }
  }

  // federal income tax rate bracket for 2017
  private federalIncomeTaxRate(salary) {
    let taxes = 0;
    let tempSalary = salary;

    if (tempSalary > 418400) {
      taxes += ((tempSalary - 418400) * .396);
      tempSalary = 418400;
    }
    if (tempSalary > 416700 && tempSalary <= 418400) {
      taxes += ((tempSalary - 416700) * .35);
      tempSalary = 416700;
    }
    if (tempSalary > 191650 && tempSalary <= 416700) {
      taxes += ((tempSalary - 191650) * .33);
      tempSalary = 191650;
    }
    if (tempSalary > 91900 && tempSalary <= 191650) {
      taxes += ((tempSalary - 91900) * .28);
      tempSalary = 91900;
    }
    if (tempSalary > 37950 && tempSalary <= 91900) {
      taxes += ((tempSalary - 37950) * .25);
      tempSalary = 37950;
    }
    if (tempSalary > 9325 && tempSalary <= 37950) {
      taxes += ((tempSalary - 9325) * .15);
      tempSalary = 9325;
    }
    if (tempSalary <= 9325) {
      taxes += (tempSalary * .1);
    }

    // total federal tax to be deducted from income
    this.totalTax = taxes;
  }

  // TODO: replace numbers with correct brackets for CA 2017
  // state income tax rate bracket for 2017 in California
  private stateIncomeTaxRate(salary) {
    let taxes = 0;
    let tempSalary = salary;

    if (tempSalary > 418400) {
      taxes += ((tempSalary - 418400) * .396);
      tempSalary = 418400;
    }
    if (tempSalary > 416700 && tempSalary <= 418400) {
      taxes += ((tempSalary - 416700) * .35);
      tempSalary = 416700;
    }
    if (tempSalary > 191650 && tempSalary <= 416700) {
      taxes += ((tempSalary - 191650) * .33);
      tempSalary = 191650;
    }
    if (tempSalary > 91900 && tempSalary <= 191650) {
      taxes += ((tempSalary - 91900) * .28);
      tempSalary = 91900;
    }
    if (tempSalary > 37950 && tempSalary <= 91900) {
      taxes += ((tempSalary - 37950) * .25);
      tempSalary = 37950;
    }
    if (tempSalary > 9325 && tempSalary <= 37950) {
      taxes += ((tempSalary - 9325) * .15);
      tempSalary = 9325;
    }
    if (tempSalary <= 9325) {
      taxes += (tempSalary * .1);
    }

    // total state tax to be deducted from income
    this.totalTax = taxes;
  }

  // calculate cash amount of fica from income
  private ficaDeduction(salary) {
    return salary * this.fica;
  }

  // deduct tax and fica from income according to the correct frequency
  private calculatePay(tax, fica, frequency) {
    return Math.round((this.model.salary/frequency - tax/frequency - fica/frequency) * 100)/100;

  }

  // bind take home pay to each frequency
  private payFrequency(tax, fica) {
    this.takeHomePay.yearly = this.calculatePay(tax, fica, this.frequencies.yearly);
    this.takeHomePay.monthly = this.calculatePay(tax, fica, this.frequencies.monthly);
    this.takeHomePay.biweekly = this.calculatePay(tax, fica, this.frequencies.biweekly);
    this.takeHomePay.weekly = this.calculatePay(tax, fica, this.frequencies.weekly);
  }
}
