import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { signIn } from '@/lib/auth';
const schema=z.object({name:z.string().trim().min(2).max(60),email:z.string().email().max(200).transform(x=>x.toLowerCase()),password:z.string().min(10).max(128)});
export async function POST(req:Request){try{const data=schema.safeParse(await req.json());if(!data.success)return NextResponse.json({error:'Verifique os dados. A senha precisa ter 10 caracteres ou mais.'},{status:400});const {name,email,password}=data.data;if(await db.user.findUnique({where:{email}}))return NextResponse.json({error:'E-mail já cadastrado.'},{status:409});const user=await db.user.create({data:{name,email,passwordHash:await bcrypt.hash(password,12)}});await signIn(user.id);return NextResponse.json({ok:true});}catch{return NextResponse.json({error:'Não foi possível cadastrar.'},{status:500});}}
