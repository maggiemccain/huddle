import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MembershipService } from '../../services/membership.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-join-dialog',
  templateUrl: './join-dialog.component.html',
  styleUrls: ['./join-dialog.component.scss']
})
export class JoinDialogComponent implements OnInit, OnDestroy {
  displayFirstStep: boolean = false;
  displayJoin: boolean = false;
  displayUnjoin: boolean = false;
  membershipSub: Subscription; 
  membership: Object[];
  displayHuddles: Object[];

  constructor(
    private memberService: MembershipService,
    public dialogRef: MatDialogRef<JoinDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  };
  ngOnInit() {
    console.log('INIT')
    this.displayFirstStep = true;
    this.memberService.getGatheringsByMember(this.data.user.id).subscribe((res) => {
      this.membership = res.data;
    }, err => {
      console.log('ERROR: ', err)
    })
  };
  getHuddleDisplay(join: boolean): Array<any> { //REFACTOR
    let list = [];
    if (!join) {
      this.data.huddles.forEach((huddle) => {
        this.membership.forEach((memberHuddle) => {
          if (huddle['id'] === memberHuddle['gathering_id']) {
            list.push(huddle);
          }
        })
      })
    } else { //if join, only show huddles NOT  in membership
      this.data.huddles.forEach((huddle) => {
        let overlap = [];
        this.membership.forEach((memberHuddle) => {
          if (huddle['id'] === memberHuddle['gathering_id']) {
            overlap.push(huddle);
          }
        })
        if (overlap.length === 0) {
          list.push(huddle);
        }
      })
    }
    return list
  };
  actionToTake(isJoining: boolean): void {
    this.displayFirstStep = false;
    this.displayHuddles = this.getHuddleDisplay(isJoining);
    if (isJoining) {
      this.displayJoin = true;
    } else {
      this.displayUnjoin = true;
    }
  };
  ngOnDestroy() {
    this.membershipSub && this.membershipSub.unsubscribe();
  }
}
