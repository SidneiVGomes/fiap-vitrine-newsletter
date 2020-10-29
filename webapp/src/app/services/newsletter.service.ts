import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsLetterDTO } from '../models/newsletter-dto.model';
import { NewsLetter } from '../models/newsletter.model';

const urlBase = 'http://localhost:3000/newsletter/';

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public getNewsletters(): Observable<NewsLetter[]> {
    return this.httpClient.get<NewsLetter[]>(urlBase);
  }

  public postNewsletters(_newsLetter: NewsLetter): Observable<NewsLetter> {
    return this.httpClient.post<NewsLetter>(
      urlBase,
      _newsLetter,
      this.httpOptions
    );
  }

  public putNewsletters(_newsLetter: NewsLetter): Observable<NewsLetter> {
    let newsletterDTO = new NewsLetterDTO();

    newsletterDTO.establishmentName = _newsLetter.establishmentName;
    newsletterDTO.establishmentCategory = _newsLetter.establishmentCategory;
    newsletterDTO.title = _newsLetter.title;
    newsletterDTO.message = _newsLetter.message;

    return this.httpClient.put<NewsLetter>(
      urlBase + _newsLetter._id,
      newsletterDTO,
      this.httpOptions
    );
  }

  public delete(id: string): Observable<NewsLetter> {
    return this.httpClient.delete<NewsLetter>(
      urlBase + id,
      this.httpOptions
    );
  }
}
