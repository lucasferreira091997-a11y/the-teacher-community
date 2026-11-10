import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth';
import { youtubeEmbed } from '@/lib/youtube';
const schema=z.object({body:z.string().trim().min(1).max(3000),youtubeUrl:z.string().trim().max(300).optional()});
export async function GET(){const posts=await db.post.findMany({take:30,orderBy:{createdAt:'desc'},include:{author:{select:{id:true,name:true}},likes:{select:{userId:true}},comments:{take:20,orderBy:{createdAt:'asc'},include:{author:{select:{name:true}}}}}});return NextResponse.json(posts);}
export async function POST(req:Request){const user=await currentUser();if(!user)return NextResponse.json({error:'Entre na sua conta.'},{status:401});const v=schema.safeParse(await req.json());if(!v.success)return NextResponse.json({error:'Publicação inválida.'},{status:400});if(v.data.youtubeUrl&&!youtubeEmbed(v.data.youtubeUrl))return NextResponse.json({error:'Link do YouTube inválido.'},{status:400});await db.post.create({data:{body:v.data.body,youtubeUrl:v.data.youtubeUrl||null,authorId:user.id}});return NextResponse.json({ok:true},{status:201});}
