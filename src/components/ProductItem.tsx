import { memo, useState, lazy, Suspense } from 'react'

const AddProductToWishlist = lazy(() => ( import('./AddProductToWishlist') ))

interface ProductItemProps {
    product: {
        id: number;
        price: number;
        title: string;
    };
    onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
    const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)

    return (
        <div>
            {product.title} - <strong>{product.price}</strong>
            <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>


            {
                isAddingToWishlist &&
                <Suspense fallback={<div>loading...</div>}>
                    <AddProductToWishlist 
                        onAddToWishlist={() => onAddToWishlist(product.id)}
                        onRequestClose={() => setIsAddingToWishlist(false)}
                    />
                </Suspense>
            }
        </div>
    )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product)
})