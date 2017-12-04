import 'whatwg-fetch';

export function libFetch(url, mthd, stringified){
    return fetch(url, {
            credentials: "include",
        method: mthd,
        body: stringified,                
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
        },
        });
        
}