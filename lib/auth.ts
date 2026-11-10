import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { db } from '@/lib/db';
const cookieName = 'tt_session';
function secret() { const v=process.env.SESSION_SECRET; if(!v || v.length<32) throw new Error('Configure SESSION_SECRET com pelo menos 32 caracteres'); return new TextEncoder().encode(v); }
export async function signIn(userId:string) {
 const token=await new SignJWT({sub:userId}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('7d').sign(secret());
 (await cookies()).set(cookieName,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*60*24*7});
}
export async function signOut() { (await cookies()).delete(cookieName); }
export async function currentUser() {
 const token=(await cookies()).get(cookieName)?.value;
 if(!token)return null;
 try { const {payload}=await jwtVerify(token,secret()); if(typeof payload.sub!=='string')return null; return await db.user.findUnique({where:{id:payload.sub},select:{id:true,name:true,email:true,role:true}}); } catch {return null;}
}
