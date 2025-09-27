import Characters from "@/Components/Characters";

export default function Page({ params }: { params: { id: string } }) {
  return <Characters id={params.id} />;
}
