module.exports = {
    filterPosts: function filterPosts(nodes) {
        return nodes.filter(node => {
            node = node?.node || node;
            const hasFrontmatterStage = node.frontmatter?.stage && !(node.frontmatter?.stage || '').includes('inProgress');
            const hasFieldsStage = node.fields?.stage && !(node.fields?.stage || '').includes('inProgress');
            return hasFrontmatterStage || hasFieldsStage;
        });
    },
}