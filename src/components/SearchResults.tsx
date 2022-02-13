import { useCallback, useMemo } from "react"
import { ProductItem } from "./ProductItem"
import { List, ListRowRenderer, AutoSizer } from 'react-virtualized'

import './style.css'

interface SearchResultsProps {
    results: Array<{
        id: number;
        price: number;
        title: string;
    }>
}

export function SearchResults({ results }: SearchResultsProps) {
    const totalPrice = useMemo(() => {
        return results.reduce((total, product) => {
            return total + product.price
        }, 0)
    }, [results])

    const onAddToWishlist = useCallback((id: number) => {
        console.log(id)
    },[]) 


    const rowRedered: ListRowRenderer = ({ index, key, style }) => {
        return (
            <div key={key} style={style}>
                <ProductItem 
                    product={results[index]} 
                    onAddToWishlist={onAddToWishlist}
                />
            </div>
        )
    }


    return(
        <div className="container">
            <h2>{totalPrice}</h2>

            <AutoSizer>
                {({height, width}) => (
                    <List
                        height={height}
                        width={width}
                        rowCount={results.length}
                        rowRenderer={rowRedered}
                        rowHeight={20}
                    />
                )}
            </AutoSizer>

        </div>
    )
}