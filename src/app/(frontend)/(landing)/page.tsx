import { client } from "@/lib/rpc";

export default async function Home() {
  const tasksRes = await client.api.tasks.$get();

  const data = await tasksRes.json();

  return (
    <div className="">
      <h2 className="font-heading text-2xl font-semibold">Font heading</h2>
      <p className="font-sans">Body font</p>

      <div className="mt-3">{JSON.stringify(data, null, 2)}</div>
    </div>
  );
}
