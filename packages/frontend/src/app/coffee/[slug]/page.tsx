//TODO import this properly as an actual package once I figure out why the heck next can't find this
import { RichText } from "@/components/RichText/richtext";
import { ICoffee } from "../../../../../shared_types/types";

export default async function Page({ params }: { params: { slug: string } }) {
  //TODO handle config in a way that will throw if it doesn't exist
  const coffeeData = await fetch(
    `${process.env.BACKEND_URL}/coffees/${params.slug}`,
    { cache: "no-store" }
  ).then((response) => {
    return response.json().then((coffee: ICoffee) => {
      return coffee;
    });
  });

  return (
    <main className="container">
      <section className="section">
        <h1 className="title">{coffeeData.name}</h1>
        <h2 className="subtitle">{coffeeData.roast}</h2>
        <RichText document={coffeeData.richTextDescription} />
      </section>
    </main>
  );
}
