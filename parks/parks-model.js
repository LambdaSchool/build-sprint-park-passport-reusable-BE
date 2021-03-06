const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    addPark,
    update,
    remove,
    getRatings,
    addRating,
    findRatingById,
    removeRating,
    updateRating
}

function find() {
    return db('parks');
};

function findById(id) {
    return db('parks')
        .where({ id })
        .first();
};

function addPark(park) {
    return db('parks') 
        .insert(park, 'id')
        .then(([id]) => {
            return findById(id);
        })
};

function update(changes, id) {
    return db('parks')
        .where('id', Number(id)) 
        .update(changes);
};

function remove(id) {
    return db('parks') 
        .where('id', Number(id))
        .delete();
};

function getRatings(parkId) {
    return db('park_ratings')
        .join('parks', 'parks.id', 'park_ratings.park_id')
        .join('users', 'users.id', 'park_ratings.user_id')
        .select('parks.name', 'park_ratings.id', 'users.username', 'park_ratings.rating', 'park_ratings.comment')
        .where({ park_id: parkId })
}

function addRating(rating) {
    return db('park_ratings') 
        .insert(rating, 'id')
}

function findRatingById(id) {
    return db('park_ratings')
        .where({ id })
        .first();
};

function removeRating(id) {
    return db('park_ratings')
        .where('id', Number(id))
        .delete();
}

function updateRating(changes, id) {
    return db('park_ratings')
        .where('id', Number(id)) 
        .update(changes);
};