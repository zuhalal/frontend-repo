
import { getUserData } from "@/lib/firebase/fetcher";
import UpdateUserForm from "@/components/UpdateUserForm";


export default async function Home() {
  const data = await getUserData();
  return (
   <UpdateUserForm data={data} />
  );
}
