import React from 'react'
import { Link } from 'gatsby'

const PaginationButton = ({ to, children, className }) => (
    <Link className={'px-4 py-3 rounded ' + className || ''} role={'button'} to={to}>
        {children}
    </Link>
);

export const Pagination = ({ pageContext }) => {
    const { currentPage, numPages } = pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? '/' : `/page/${currentPage - 1}`
    const nextPage = `/page/${currentPage + 1}`
    const activeButtonClassName = 'text-white bg-indigo-500 shadow-lg shadow-indigo-500/50';
    const inactiveButtonClassName = 'text-gray-900 bg-gray-50 shadow-lg shadow-gray-100/50';
    return (
        <div className="mb-8 mt-16 flex gap-2">
        {!isFirst && (
            <PaginationButton className={inactiveButtonClassName} to={prevPage}>
            ←
            </PaginationButton>
        )}
        {Array.from({ length: numPages }, (_, i) => (
            <PaginationButton
                className={i + 1 === currentPage ? activeButtonClassName : inactiveButtonClassName}
                key={`pagination-number${i + 1}`}
                to={i === 0 ? '/' : `/page/${i + 1}`}
            >
            {i + 1}
            </PaginationButton>
        ))}
        {!isLast && (
            <PaginationButton className={inactiveButtonClassName}  to={nextPage}>
            →
            </PaginationButton>
        )}
        </div>
    )
}