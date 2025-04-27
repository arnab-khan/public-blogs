import { HttpRequest, HttpHandlerFn, HttpEvent, HttpEventType } from "@angular/common/http";
import { getToken } from "./local-storage";
import { Observable, tap } from "rxjs";

/**
 * @param req - The incoming HTTP request to be intercepted.
 * @param next - The next handler function in the HTTP request pipeline.
 * @returns The modified HTTP request with the Authorization header.
 */
export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const authToken = getToken();
    const newReq = req.clone({ // Clone the request to add the Bearer token.
        headers: req.headers.append('Authorization', `Bearer ${authToken}`), // Add the Authorization header with the Bearer token
    });
    return next(newReq); // Pass the newly modified request to the next handler in the chain
}

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    return next(req).pipe(tap(event => {

        // Log the HTTP method of the request (GET, POST, etc.)
        console.log('api method', req.method);
        // Example output:
        // api method GET
        // (Tells you which type of request you made)

        // Log the numeric value of HttpEventType.Response
        console.log('api response', HttpEventType.Response);
        // Example output:
        // api response 4
        // (Because HttpEventType.Response is an enum with value 4 for a completed response)


        // Log the type of the current HTTP event
        console.log('api type', event.type);
        // Example output:
        // api type 4
        // (Meaning the event is a full HTTP response — matches HttpEventType.Response)


        // Log the URL of the API request that was made
        console.log('api url', req.url);
        // Example output:
        // api url https://api.example.com/users
        // (The URL of the outgoing HTTP request)


        // Check if the event type is a Response (full response received)
        if (event.type === HttpEventType.Response) {

            // Log the actual API response body
            console.log('api response body', event.body);
            // Example output:
            // api response body { id: 1, name: 'John Doe' }
            // (full JSON data returned from the server)

            // Log the HTTP status code (like 200 OK, 404 Not Found, etc.)
            console.log('api status', event.status);
            // Example output:
            // api url 200
            // (Meaning the server responded with HTTP status 200 = OK)
        }

    }));
}