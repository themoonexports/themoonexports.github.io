interface Product {
  title: string;
  image: string;
  alt: string;
  href: string;
}

const products: Product[] = [
  {
    title: "Horn Crafts",
    image: "images/Horn-Crafts.JPG",
    alt: "Buffalo horn handicrafts",
    href: "horn-crafts.html"
  },
  {
    title: "Wooden Crafts",
    image: "images/pizza-cutter.jpg",
    alt: "Handcrafted wooden products",
    href: "wooden-crafts.html"
  },
  {
    title: "Resin Products",
    image: "images/resin-bangle.jpg",
    alt: "Designer resin jewelry",
    href: "resin.html"
  }
];

export function ProductGrid(): JSX.Element {
  return (
    <div className="row">
      {products.map((product) => (
        <div key={product.href} className="col-md-4">
          <article className="productcat card-crafts">
            <a href={product.href}>
              <h3 className="cattitle">{product.title}</h3>
              <img
                src={product.image}
                alt={product.alt}
                loading="lazy"
                width={300}
                height={200}
              />
            </a>
          </article>
        </div>
      ))}
    </div>
  );
}
