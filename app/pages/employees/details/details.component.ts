import { EmployeesService } from './../employees.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Employee } from './../../../shared/models/employee.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  employee: Employee;

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private router: Router, private employeesSvc: EmployeesService) {
    const navigation = this.router.getCurrentNavigation();
   this.employee = navigation?.extras?.state?.value;
  }

  ngOnInit(): void {
   if (typeof this.employee === 'undefined') {
      this.router.navigate(['list']);
    }
    
  }

  onGoToEdit(): void {
   
   this.navigationExtras.state!.value = this.employee;
    this.router.navigate(['edit'], this.navigationExtras);
    
  }

  async onGoToDelete(): Promise<void> {
    const employeeId = this.employee?.id || '';
    try {
      await this.employeesSvc.onDeleteEmployees(employeeId);
      alert('Deleted');
      this.onGoBackToList();
    } catch (err) {
      console.log(err);
    }
  }
  
  onGoBackToList(): void {
    this.router.navigate(['list']);
  }

}
