import Link from "next/link";
import { TCoffeeHit } from "../../../../shared_types/types";

export default async function Page() {
  const coffeeListing = await fetch(
    `${process.env.BACKEND_URL}/coffees/searchCoffee`,
    {
      cache: "no-store",
    }
  ).then((coffees) => {
    return coffees.json().then((coffees: TCoffeeHit[]) => {
      return coffees;
    });
  });

  return (
    <main className="container">
      <section
        className="section is-flex-tablet is-flex-wrap-wrap is-align-content-center"
        style={{ gap: "20px" }}
      >
        {coffeeListing.map((coffeeHit) => {
          return (
            <Link href={`/coffee/${coffeeHit.objectID}`}>
              <div
                className="card "
                style={{ width: "400px", minHeight: "400px" }}
              >
                <div className="card-content" style={{ minHeight: "300px" }}>
                  <div className="title is-5">{coffeeHit.name}</div>
                  <div className="title is-6">{coffeeHit.brand}</div>
                  <div className="title is-6">Roast: {coffeeHit.roast}</div>
                  <div className="content">{coffeeHit.shortDescription}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
