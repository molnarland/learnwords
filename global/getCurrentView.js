module.exports = () =>
{
    return global[`${global.currentView}ViewDirectory`];
};