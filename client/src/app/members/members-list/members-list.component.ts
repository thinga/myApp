import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { MembersService } from 'src/app/_services/members.service';


@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
 members: Member[];
 pagination: Pagination;
 pageNumber = 1;
 pageSize = 5;

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

loadMembers() {
  this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe(response => {
    this.members = response.result;
    this.pagination = response.pagination;
  })
}
// for Setting up client pagination. in the HTML auch.
pageChanged(event: any) {
  this.pageNumber = event.page;
  this.loadMembers();
}

}
