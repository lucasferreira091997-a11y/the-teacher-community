import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { db } from '@/lib/db';
import { signIn } from '@/lib/auth';
const schema=z.object({email:z.string().email(),password:z.string()});
export async function POST(req:Request){try{const v=schema.safeParse(await req.json());if(!v.success)return NextResponse.json({error:'Dados inválidos.'},{status:400});const user=await db.user.findUnique({where:{email:v.data.email.toLowerCase()}});if(!user||!await bcrypt.compare(v.data.password,user.passwordHash))return NextResponse.json({error:'E-mail ou senha incorretos.'},{status:401});await signIn(user.id);return NextResponse.json({ok:true});}catch{return NextResponse.json({error:'Falha ao entrar.'},{status:500});}}
