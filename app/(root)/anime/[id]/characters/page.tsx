export const dynamic = "force-dynamic";
export const revalidate = 0;
import Characters from "@/Components/Characters";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  return <Characters id={id} />;
}
