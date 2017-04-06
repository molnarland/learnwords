module.exports = (object) =>
{
    for(
        let j, x, i = object.length;
        i;
        j = parseInt(Math.random() * i), x = object[--i], object[i] = object[j], object[j] = x
    );
    return object;
};