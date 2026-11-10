import { currentUser } from '@/lib/auth';
import Community from '@/components/Community';
export default async function Home(){const user=await currentUser();return <Community user={user}/>;}
