import { Injectable } from "@angular/core";

import { Location } from "../models/location.model";

@Injectable({
  providedIn: "root"
})
export class LocationService {
  private locations: Location[] = [
    { locationId: "id1", locationName: "St. Mary Clinic", selected: true }
  ];

  getLocations() {
    return this.locations.slice();
  }
}
