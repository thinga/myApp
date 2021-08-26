import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/User';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';


@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
 members: Member[];
 pagination: Pagination;
userParams: UserParams;
user: User;
genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}]

constructor(private memberService: MembersService, private accountService: AccountService) {
  this.accountService.currentUsers$.pipe(take(1)).subscribe(user => {
    this.user = user;
    this.userParams = new UserParams(user);
  });
}


  ngOnInit(): void {
    this.loadMembers();
  }

loadMembers() {
  this.memberService.getMembers(this.userParams).subscribe(response => {
    this.members = response.result;
    this.pagination = response.pagination;
  })
}

resetFilters() {
  this.userParams = new UserParams(this.user);
  this.loadMembers();
}

// for Setting up client pagination. in the HTML auch.
pageChanged(event: any) {
      this.userParams.pageNumber  = event.page;
  this.loadMembers();
}

}
