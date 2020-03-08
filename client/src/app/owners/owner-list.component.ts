import { Component, OnInit, OnDestroy } from '@angular/core';
import { Owner } from './owner';
import { OwnerService } from './owner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-owner-list-component',
  templateUrl: 'owner-list.component.html',
  styleUrls: ['./owner-list.component.scss'],
  providers: []
})

export class OwnerListComponent implements OnInit, OnDestroy {
  // These are public so that tests can reference them (.spec.ts)
  public serverFilteredOwners: Owner[];
  public filteredOwners: Owner[];

  public ownerName: string;
  public ownerOfficeID: string;
  public ownerEmail: string;
  public ownerBuilding: string;
  getOwnersSub: Subscription;


  // Inject the OwnerService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.

  constructor(private ownerService: OwnerService) {

  }

  getOwnersFromServer(): void {
    this.unsub();
    this.getOwnersSub = this.ownerService.getOwners({
      name: this.ownerName,
      officeID: this.ownerOfficeID,
      building: this.ownerBuilding
    }).subscribe(returnedOwners => {
      this.serverFilteredOwners = returnedOwners;
      this.updateFilter();
    }, err => {
      console.log(err);
    });
  }

  public updateFilter(): void {
  this.filteredOwners = this.ownerService.filterOwners(
    this.serverFilteredOwners, {
    // name: this.ownerName,
    // officeID: this.ownerOfficeID,
    // building: this.ownerBuilding
  });
}

/**
 * Starts an asynchronous operation to update the owners list
 *
 */
ngOnInit(): void {
  this.getOwnersFromServer();
}

ngOnDestroy(): void {
  this.unsub();
}

unsub(): void {
  if(this.getOwnersSub) {
  this.getOwnersSub.unsubscribe();
}
  }
}
