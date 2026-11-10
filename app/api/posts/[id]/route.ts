import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth';
export async function DELETE(_:Request,{params}:{params:Promise<{id:string}>}){const user=await currentUser();if(!user)return NextResponse.json({error:'Não autorizado.'},{status:401});const {id}=await params;const post=await db.post.findUnique({where:{id}});if(!post)return NextResponse.json({error:'Não encontrado.'},{status:404});if(post.authorId!==user.id&&user.role!=='ADMIN'&&user.role!=='MODERATOR')return NextResponse.json({error:'Sem permissão.'},{status:403});await db.post.delete({where:{id}});return NextResponse.json({ok:true});}
