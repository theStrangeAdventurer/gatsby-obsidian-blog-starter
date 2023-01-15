import React from 'react'
import { Link } from 'gatsby'

export const Pagination = ({ pageContext }) => {
    const { currentPage, numPages } = pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? '/' : `/page/${currentPage - 1}`
    const nextPage = `/page/${currentPage + 1}`
    
    return (
        <div className="pagination">
        {!isFirst && (
            <Link to={prevPage} rel="prev">
            ←
            </Link>
        )}
        {Array.from({ length: numPages }, (_, i) => (
            <Link
            key={`pagination-number${i + 1}`}
            to={`/page/${i === 0 ? '' : i + 1}`}
            >
            {i + 1 === currentPage ? (
                <b>{i + 1}</b>
            ) : i + 1}
            </Link>
        ))}
        {!isLast && (
            <Link to={nextPage} rel="next">
            →
            </Link>
        )}
        </div>
    )
}