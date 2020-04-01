import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { environment } from '../../environments/environment';
import { Note } from './note';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class NoteService {
  readonly noteUrl: string = environment.API_URL + '/notes';
  readonly ownerUrl: string = environment.API_URL + 'owner';
  handleError: (err: any, caught: Observable<void>) => ObservableInput<any>;

  constructor(private httpClient: HttpClient) {
  }

  // this will get passed the owner id and display all the messages from that owner
  // maybe this needs to be formatted like getNotes where we return with params:httpParams?
  // currently this doesn't filter anything. It just displays all the notes.


  getNoteById(id: string): Observable<Note> {
    return this.httpClient.get<Note>(this.noteUrl + '/' + id);
  }
  getOwnerNotes(filters?: { owner_id?: string}): Observable<Note[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters.owner_id) {
      httpParams = httpParams.set('owner_id', filters.owner_id);
    }
    return this.httpClient.get<Note[]>(this.noteUrl, {
      params: httpParams,
    });
  }

  addNote(id: string, newNote: Note): Observable<string> {
    // Send post request to add a new user with the user data as the body.
    return this.httpClient.post<{id: string}>
    (this.ownerUrl + '/' + id  + '/notes/new', newNote).pipe(map(res => res.id));
  }

  deleteNote(note: Note ): Observable<Note> {
    console.log('It got here');
    return this.httpClient.delete<Note>(this.noteUrl + '/' + encodeURI(this.noteId));

  }


  // The example of how to delete from a different group
  deleteNote1(id: string): Observable<boolean> {
    type DeleteResponse = 'deleted' | 'nothing deleted';
    console.log('It got to deleteNote1');
    const response = this.httpClient.delete(
      this.noteUrl + '/' + encodeURI(id),
      {
        responseType: 'text',
      },
    ) as Observable<DeleteResponse>;

    return response.pipe(map(theResponse => theResponse === 'deleted'));
  }
}
