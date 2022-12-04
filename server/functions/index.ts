export function decodeMessage(data:any){
    var uint8array = new TextEncoder().encode(data);
    return new TextDecoder().decode(uint8array);
}