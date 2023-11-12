import { SignIn } from "@/components/SignIn";
import { SignUp } from "@/components/SignUp";

export default async function Page() {
  return (
    <main className="container">
      <div className="columns">
        <div className="column">
          <section className="section">
            <SignIn />
          </section>
        </div>
        <div className="column">
          <section className="section">
            <SignUp />
          </section>
        </div>
      </div>
    </main>
  );
}
