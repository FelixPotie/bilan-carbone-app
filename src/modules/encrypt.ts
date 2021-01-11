import * as p4ssw0rd from 'p4ssw0rd';

export function encrypt(plaintext: string): string {
    return p4ssw0rd.hash(plaintext);
}

// export function compare(plaintext: string, passwordDb: string){
//     return bcrypt.compareSync(plaintext, passwordDb);
// }