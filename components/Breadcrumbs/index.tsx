import { Breadcrumb } from "@/lib/types/Products.type";

function Breadcrumbs(props: { breadcrumbs: Breadcrumb[] }) {
  return (
    <div className="breadcrumb flex justify-start pb-4">
      {props.breadcrumbs.map((breadcrumb: any) => {
        if (breadcrumb.name === "__root_collection__") {
          return (
            <a href="/" className="underline mr-2" key={breadcrumb.id}>
              Home
            </a>
          );
        } else {
          return (
            <div key={breadcrumb.id}>
              <span className="before:mr-2 before:content-['/']" />
              <a
                href={`/collections/${breadcrumb.slug}`}
                className="underline mr-2"
              >
                {breadcrumb.name}
              </a>
            </div>
          );
        }
      })}
    </div>
  );
}

export default Breadcrumbs;
