import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { CurrentUserService } from './current-user.service';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  
  // carries the list of files from the workbench-database
  filesFromDatabase = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient,
    private currentUserService: CurrentUserService,) 
  {
    // initial listing of files from the workbench-database based on the logged in user
    this.listTomlFilesFromDatabase();
    
   }

  getFilesFromDatabase(): Observable<string[]> {
    return this.filesFromDatabase.value;
  }

  // Refresh the list of files from the workbench-database based on the logged in user
  refreshFilesFromDatabase(): void {
    const userEmail = this.currentUserService.getLoggedInUserEmail() || 'guest'; // Provide a default value if null
    const params = new HttpParams().set('user', userEmail);
    this.http.get<any>('http://localhost:3000/showWorkbench', { params }).subscribe(data => {
      this.filesFromDatabase.next(data);
    });
  }

  // List the files from the workbench-database based on the logged in user
  listTomlFilesFromDatabase(): void {
    const userEmail = this.currentUserService.getLoggedInUserEmail() || 'guest'; // Provide a default value if null
    const params = new HttpParams().set('user', userEmail);
    this.http.get<any>('http://localhost:3000/showWorkbench', { params }).subscribe(data => {
      // Update the files array and notify subscribers
      this.filesFromDatabase.next(data);
    });
  }
  
  // Update the file in the workbench-database based on the file id
  updateFile(_id: any, fileContent: any) {
    const url = `http://localhost:3000/files/update`;
    const body = { _id: _id, toml: fileContent };


    this.http.post(url, body).subscribe({
      next: () => {
          // This function is called when the POST request is successful
          this.refreshFilesFromDatabase(); 
          // Refreshes the list after successful update
      },
      error: (error) => {
          // This function is called if there was an error during the request
          console.error("Error updating file:", error);
      }
  });
    
  }

  // Using the server to convert specific fileContent from json to toml
  convertFile(fileContent: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'
    };
    let url = `http://localhost:3000/convert`;
    return this.http.post(url, fileContent, httpOptions);
  }

  // Creating a blank toml file in the workbench-database
  addBlankTomlFile(filename: string): void {
    //file name is set with current timestamp if no name is provided
    const filenameFinal = `${filename.trim()}` || `new_file_${new Date().getTime()}.toml`;
    
    this.http.post('http://localhost:3000/add-blank-toml', { name: filenameFinal, user: this.currentUserService.getLoggedInUserEmail()})
    .pipe(
      tap(() => {
        this.refreshFilesFromDatabase(); // Refresh the list
      })
      ).subscribe();
  }


  // Adding a passed along file to the workbench-database
  addToWorkbench(file: any) {
    this.http.post('http://localhost:3000/files/addToWorkbench', { name: file.name, toml: file.toml, user: this.currentUserService.getLoggedInUserEmail() }).pipe(
      tap(() => {
        this.refreshFilesFromDatabase(); // Refresh the list
      })
      )
      .subscribe();
  }

  // Adding a file to the workbench-database via file upload
  uploadFileToServer(filename: string, fileContent: string) {
    const userEmail = this.currentUserService.getLoggedInUserEmail() || 'guest';
    const url = 'http://localhost:3000/files/addToWorkbench';
    const body = { name: filename, toml: fileContent, user: userEmail };
    this.http.post(url, body).pipe(
      tap(() => {
        this.refreshFilesFromDatabase(); // Refresh the list
      })
      ).subscribe();
  }
  
  // Deleting a file from the workbench-database based on the file id
  deleteFileFromDatabase(file_id: string) {
    this.http.delete(`http://localhost:3000/deleteFromWorkbench/?_id=${file_id}`)
      .pipe(
        tap(() => {
          this.refreshFilesFromDatabase(); // Refresh the list
        })
      ).subscribe();
  }
}