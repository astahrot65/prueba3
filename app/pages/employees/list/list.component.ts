import { EmployeesService } from './../employees.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Employee } from './../../../shared/models/employee.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  employees$ = this.employeesSvc.employees;
  
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };



  constructor(private router: Router, private employeesSvc: EmployeesService) { }

  ngOnInit(): void {
    
  }

  onGoToEdit(item: any): void {
    this.navigationExtras.state!.value = item;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  onGoToSee(item: any): void {
    this.navigationExtras.state!.value = item;
    this.router.navigate(['details'], this.navigationExtras);
  }
  
   onGoToDelete(empId:any): void {
    
    try {
       this.employeesSvc.onDeleteEmployees(empId);
      alert('Deleted');
    } catch (err) {
      console.log(err);
    }

  }



}
