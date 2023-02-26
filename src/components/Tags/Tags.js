import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { Link } from "gatsby";

export const Tags = ({ tags }) => {
    return (
        <ul itemScope itemType="http://schema.org/Blog" className="flex flex-wrap">
            {tags.map(tag => (
                <li key={tag.value} itemProp="keywords" className="bg-slate-100 p-1 mr-3 mb-3 rounded-lg">
                    <Link title={tag.title} to={`/tags/${kebabCase(tag.value)}/`}>
                        {tag.value}
                    </Link>
                </li>
            ))}
        </ul>
    )
}