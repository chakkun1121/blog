import { HeaderLink } from "../_components/HeaderLink";
import { Posts } from "../_components/posts";

export default async function topPage() {
  return (
    <>
      <section>
        <HeaderLink />
      </section>
      <section>
        <Posts />
      </section>
      <section>
        <div className="grid auto-rows-fr grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"></div>
      </section>
    </>
  );
}
