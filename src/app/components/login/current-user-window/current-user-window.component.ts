import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-current-user-window',
  templateUrl: './current-user-window.component.html',
  styleUrls: ['./current-user-window.component.scss']
})

/**
 * Class for displaying the current user
 */
export class CurrentUserWindowComponent implements OnInit {
  loggedInUserEmail: string | null = null;

  constructor(private currentUserService: CurrentUserService,
    private fileService: FileService,
     ) {}

  ngOnInit(): void {
    this.currentUserService.loggedInUserEmail$.subscribe(email => {
      this.loggedInUserEmail = email;
    });
  }

  //Logic behind logout button. Sets current User mail to null
  logout(): void {
    this.currentUserService.setLoggedInUserEmail(null);
    console.log('User logged out');
    this.fileService.refreshFilesFromDatabase();
  }
}
