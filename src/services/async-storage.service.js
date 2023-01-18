
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany,
    saveGuestGigs,
    isLikedByGuest, // added by Ariel
}

// !!!! for guest - only in local storage

var guestGigs = JSON.parse(localStorage.getItem("guestGigs_db")) || []

function saveGuestGigs(gig) {
    const gigIdx = guestGigs.findIndex((guestGig) => guestGig._id === gig._id)
    if (gigIdx !== -1) guestGigs.splice(gigIdx, 1)
    else guestGigs = [...guestGigs, gig]
    localStorage.setItem("guestGigs_db", JSON.stringify(guestGigs))
}

// This function was not exist and caused a console error in gig preview - Just created it. currently returns false:
function isLikedByGuest(gig) {
    return false
}

// functions to convert to httpService

function query(entityType, delay = 600) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject('OOOOPs')
            resolve(entities)
        }, delay)
    })
    // return Promise.resolve(entities)
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}
function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function postMany(entityType, newEntities) {
    return query(entityType)
        .then(entities => {

            newEntities = newEntities.map(entity => {
                console.log('entity:', entity)
                if (!entity._id) return { ...entity, _id: _makeId() }
                else return { ...entity }
            })
            // newEntities = newEntities.map(entity => ({ ...entity, _id: _makeId()}) )
            entities.push(...newEntities)
            _save(entityType, entities)
            return entities
        })
}