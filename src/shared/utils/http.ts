import { HttpParams } from "@angular/common/http";

/**
 * Converts an object to HttpParams.
 * @param obj The object to convert.
 * @returns The HttpParams object.
 */
export function toHttpParams(obj: Record<string, any>): HttpParams {
    let params = new HttpParams();
    Object.entries(obj).forEach(([key, value]) => {
        params = params.set(key, value.toString()); // `set(key, value)` Adds a new value for the key. Replaces any existing value for the key
    });
    return params;
}