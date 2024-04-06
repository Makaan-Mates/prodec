import { Button } from "@repo/ui/button";

export default function Page(): JSX.Element {
  return (
    <main className="bg-[#161616] min-h-screen p-4">
      <div className="text-yellow-700 text-3xl">Prodec</div>
      <Button
        className="bg-red-50 border rounded-lg text-black"
        appName="button"
      >
        Click me
      </Button>
    </main>
  );
}
