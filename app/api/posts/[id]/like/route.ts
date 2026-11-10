import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth';
export async function POST(_:Request,{params}:{params:Promise<{id:string}>}){const user=await currentUser();if(!user)return NextResponse.json({error:'Entre na sua conta.'},{status:401});const {id}=await params;if(!await db.post.findUnique({where:{id}}))return NextResponse.json({error:'Publicação não encontrada.'},{status:404});const where={userId_postId:{userId:user.id,postId:id}};const like=await db.like.findUnique({where});if(like)await db.like.delete({where});else await db.like.create({data:{userId:user.id,postId:id}});return NextResponse.json({liked:!like});}
