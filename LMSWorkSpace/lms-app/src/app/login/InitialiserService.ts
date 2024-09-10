import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, tap } from "rxjs";

export function initializeAppFactory(httpClient: HttpClient): () => Observable<any> {
    let path="/assets/config.json";
    return () => httpClient.get(path).pipe(
        tap(val=>console.log(val))
    )
       
   }