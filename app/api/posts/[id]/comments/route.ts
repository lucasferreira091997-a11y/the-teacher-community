import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth';
import { z } from 'zod';
export async function POST(req:Request,{params}:{params:Promise<{id:string}>}){const user=await currentUser();if(!user)return NextResponse.json({error:'Entre na sua conta.'},{status:401});const {id}=await params;const v=z.object({body:z.string().trim().min(1).max(1000)}).safeParse(await req.json());if(!v.success)return NextResponse.json({error:'Comentário inválido.'},{status:400});if(!await db.post.findUnique({where:{id}}))return NextResponse.json({error:'Publicação não encontrada.'},{status:404});await db.comment.create({data:{body:v.data.body,authorId:user.id,postId:id}});return NextResponse.json({ok:true},{status:201});}
