import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { Link } from "gatsby";

export const Tags = ({ tags }) => {
    return (
        <ul itemScope itemType="http://schema.org/Blog" className="flex flex-wrap">
            {tags.map(tag => (
                <li key={tag.value} itemProp="keywords" className="bg-gray-800 p-2 mr-3 mt-1 mb-1 rounded-lg">
                    <Link title={tag.title} to={`/tags/${kebabCase(tag.value)}/`} className='text-white hover:text-gray-100 text-sm'>
                        {tag.value}
                    </Link>
                </li>
            ))}
        </ul>
    )
}