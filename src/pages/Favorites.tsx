function Favorites({ products, favorites }: any) {
  const favoriteProducts = products.filter((product: any) =>
    favorites.includes(product.id),
  );

  return (
    <div>
      <h1>My Favorites</h1>

      {favoriteProducts.map((product: any) => (
        <div key={product.id}>
          <h3>{product.name}</h3>

          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Favorites;
