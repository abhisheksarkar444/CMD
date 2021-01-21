import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterlist'
})
export class FilterlistPipe implements PipeTransform {

  // For search pipe filter this method is used
  transform(patientlist: any[], searchText: string): any[] {
    if (!patientlist || !searchText) {
      return patientlist;
    }

    // Returns the name of the search text
    return patientlist.filter(
      (patient) => {
        return patient.firstName.toLowerCase().includes(searchText.toLowerCase()) || patient.lastName.toLowerCase().includes(searchText.toLowerCase());
      });

  }
}