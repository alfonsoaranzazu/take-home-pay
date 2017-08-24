import { Component, Input, DoCheck } from '@angular/core';
import {filingStatus, singleCaliforniaBracket, singleFederalBracket, taxRates} from '../config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() model = {
    salary: 0,
    status: 'Single',
    dependents: 0,
    deduction: 0,
    state: 'None'
  };

  public takeHomePay = {
      yearly: 0,
      monthly: 0,
      biweekly: 0,
      weekly: 0
  };

  public standardDeduction = {
    single: filingStatus.single,
    married: filingStatus.married,
    head: filingStatus.head,
    dependent: filingStatus.dependent
  };

  // TODO: enums
  public frequencies = {
    yearly: 1,
    monthly: 12,
    biweekly: 26,
    weekly: 52
  };

  public totalFederalTax = 0;
  public totalStateTax = 0;
  public fica = taxRates.socialSecurity + taxRates.medicare;
  public postSalary;

  // gets called every time user inputs new values
  ngDoCheck() {
    this.totalFederalTax = 0;
    this.totalStateTax = 0;
    this.preTaxDeduction();
    let statusDeductions = this.calcDeductions(this.model.status);
    this.federalIncomeTaxRate(statusDeductions);
    if (this.model.state === 'CA') {
      this.stateIncomeTaxRate(statusDeductions);
    }
    this.payFrequency(this.totalFederalTax + this.totalStateTax, this.ficaDeduction(this.postSalary));
  }

  preTaxDeduction() {
    this.postSalary = this.model.salary - (this.model.deduction*12);
  }

  // deduct correct filing status from income
  private calcDeductions(status) {
    // calculate total amount of dependents for deduction
    const dependents = this.model.dependents * this.standardDeduction.dependent;

    if (status === 'Single') {
      return Math.max(0, this.postSalary - this.standardDeduction.single - dependents);
    }
    else if (status === 'Married') {
      return Math.max(0, this.postSalary - this.standardDeduction.married - dependents);
    }
    else if (status === 'Head') {
      return Math.max(0, this.postSalary - this.standardDeduction.head - dependents);
    }
  }

  // single's federal income tax rate bracket for 2017
  private federalIncomeTaxRate(salary) {
    let taxes = 0;
    let tempSalary = salary;

    if (tempSalary > singleFederalBracket.bracket6) {
      taxes += ((tempSalary - singleFederalBracket.bracket6) * singleFederalBracket.taxRate7);
      tempSalary = singleFederalBracket.bracket6;
    }
    if (tempSalary > singleFederalBracket.bracket5 && tempSalary <= singleFederalBracket.bracket6) {
      taxes += ((tempSalary - singleFederalBracket.bracket5) * singleFederalBracket.taxRate6);
      tempSalary = singleFederalBracket.bracket5;
    }
    if (tempSalary > singleFederalBracket.bracket4 && tempSalary <= singleFederalBracket.bracket5) {
      taxes += ((tempSalary - singleFederalBracket.bracket4) * singleFederalBracket.taxRate5);
      tempSalary = singleFederalBracket.bracket4;
    }
    if (tempSalary > singleFederalBracket.bracket3 && tempSalary <= singleFederalBracket.bracket4) {
      taxes += ((tempSalary - singleFederalBracket.bracket3) * singleFederalBracket.taxRate4);
      tempSalary = singleFederalBracket.bracket3;
    }
    if (tempSalary > singleFederalBracket.bracket2 && tempSalary <= singleFederalBracket.bracket3) {
      taxes += ((tempSalary - singleFederalBracket.bracket2) * singleFederalBracket.taxRate3);
      tempSalary = singleFederalBracket.bracket2;
    }
    if (tempSalary > singleFederalBracket.bracket1 && tempSalary <= singleFederalBracket.bracket2) {
      taxes += ((tempSalary - singleFederalBracket.bracket1) * singleFederalBracket.taxRate2);
      tempSalary = singleFederalBracket.bracket1;
    }
    if (tempSalary <= singleFederalBracket.bracket1) {
      taxes += (tempSalary * singleFederalBracket.taxRate1);
    }

    // total federal tax to be deducted from income
    this.totalFederalTax = taxes;
  }

  // single's state income tax rate bracket for 2017 in California
  private stateIncomeTaxRate(salary) {
    let taxes = 0;
    let tempSalary = salary;

    if (tempSalary > singleCaliforniaBracket.bracket9) {
      taxes += ((tempSalary - singleCaliforniaBracket.bracket9) * singleCaliforniaBracket.taxRate10);
      tempSalary = singleCaliforniaBracket.bracket9;
    }
    if (tempSalary > singleCaliforniaBracket.bracket8 && tempSalary <= singleCaliforniaBracket.bracket9) {
      taxes += ((tempSalary - singleCaliforniaBracket.bracket8) * singleCaliforniaBracket.taxRate9);
      tempSalary = singleCaliforniaBracket.bracket8;
    }
    if (tempSalary > singleCaliforniaBracket.bracket7 && tempSalary <= singleCaliforniaBracket.bracket8) {
      taxes += ((tempSalary - singleCaliforniaBracket.bracket7) * singleCaliforniaBracket.taxRate8);
      tempSalary = singleCaliforniaBracket.bracket7;
    }
    if (tempSalary > singleCaliforniaBracket.bracket6 && tempSalary <= singleCaliforniaBracket.bracket7) {
      taxes += ((tempSalary - singleCaliforniaBracket.bracket6) * singleCaliforniaBracket.taxRate7);
      tempSalary = singleCaliforniaBracket.bracket6;
    }
    if (tempSalary > singleCaliforniaBracket.bracket5 && tempSalary <= singleCaliforniaBracket.bracket6) {
      taxes += ((tempSalary - singleCaliforniaBracket.bracket5) * singleCaliforniaBracket.taxRate6);
      tempSalary = singleCaliforniaBracket.bracket5;
    }
    if (tempSalary > singleCaliforniaBracket.bracket4 && tempSalary <= singleCaliforniaBracket.bracket5) {
      taxes += ((tempSalary - singleCaliforniaBracket.bracket4) * singleCaliforniaBracket.taxRate5);
      tempSalary = singleCaliforniaBracket.bracket4;
    }
    if (tempSalary > singleCaliforniaBracket.bracket3 && tempSalary <= singleCaliforniaBracket.bracket4) {
      taxes += ((tempSalary - singleCaliforniaBracket.bracket3) * singleCaliforniaBracket.taxRate4);
      tempSalary = singleCaliforniaBracket.bracket3;
    }
    if (tempSalary > singleCaliforniaBracket.bracket2 && tempSalary <= singleCaliforniaBracket.bracket3) {
      taxes += ((tempSalary - singleCaliforniaBracket.bracket2) * singleCaliforniaBracket.taxRate3);
      tempSalary = singleCaliforniaBracket.bracket2;
    }
    if (tempSalary > singleCaliforniaBracket.bracket1 && tempSalary <= singleCaliforniaBracket.bracket2) {
      taxes += ((tempSalary - singleCaliforniaBracket.bracket1) * singleCaliforniaBracket.taxRate2);
      tempSalary = singleCaliforniaBracket.bracket1;
    }
    if (tempSalary <= singleCaliforniaBracket.bracket1) {
      taxes += (tempSalary * singleCaliforniaBracket.taxRate1);
    }

    // total state tax to be deducted from income
    this.totalStateTax = taxes;
  }

  // calculate cash amount of fica from income
  private ficaDeduction(salary) {
    return salary * this.fica;
  }

  // deduct tax and fica from income according to the correct frequency
  private calculatePay(tax, fica, frequency) {
    return Math.round((this.postSalary/frequency - tax/frequency - fica/frequency) * 100)/100;

  }

  // bind take home pay to each frequency
  private payFrequency(tax, fica) {
    this.takeHomePay.yearly = this.calculatePay(tax, fica, this.frequencies.yearly);
    this.takeHomePay.monthly = this.calculatePay(tax, fica, this.frequencies.monthly);
    this.takeHomePay.biweekly = this.calculatePay(tax, fica, this.frequencies.biweekly);
    this.takeHomePay.weekly = this.calculatePay(tax, fica, this.frequencies.weekly);
  }
}
