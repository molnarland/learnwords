module.exports = (request) =>
{
    return request.session.user._id;
};