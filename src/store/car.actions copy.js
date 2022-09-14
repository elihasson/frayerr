import { carService } from "../services/gig.service.js";
import { userService } from "../services/user.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

// Action Creators:
export function getActionRemoveCar(carId) {
    return {
        type: 'REMOVE_CAR',
        carId
    }
}
export function getActionAddCar(car) {
    return {
        type: 'ADD_CAR',
        car
    }
}
export function getActionUpdateCar(car) {
    return {
        type: 'UPDATE_CAR',
        car
    }
}

export function loadCars() {
    return async (dispatch) => {
        try {
            const cars = await carService.query()
            console.log('Cars from DB:', cars)
            dispatch({
                type: 'SET_CARS',
                cars
            })

        } catch (err) {
            showErrorMsg('Cannot load cars')
            console.log('Cannot load cars', err)
        }
    }
}

export function removeCar(carId) {
    return async (dispatch) => {
        try {
            await carService.remove(carId)
            console.log('Deleted Succesfully!');
            dispatch(getActionRemoveCar(carId))
            showSuccessMsg('Car removed')
        } catch (err) {
            showErrorMsg('Cannot remove car')
            console.log('Cannot remove car', err)
        }
    }
}

export function addCar(car) {
    return (dispatch) => {

        carService.save(car)
            .then(savedCar => {
                console.log('Added Car', savedCar);
                dispatch(getActionAddCar(savedCar))
                showSuccessMsg('Car added')
            })
            .catch(err => {
                showErrorMsg('Cannot add car')
                console.log('Cannot add car', err)
            })
    }
}

export function updateCar(car) {
    return (dispatch) => {
        carService.save(car)
            .then(savedCar => {
                console.log('Updated Car:', savedCar);
                dispatch(getActionUpdateCar(savedCar))
                showSuccessMsg('Car updated')
            })
            .catch(err => {
                showErrorMsg('Cannot update car')
                console.log('Cannot save car', err)
            })
    }
}

export function addToCart(car) {
    return (dispatch) => {
        dispatch({
            type: 'ADD_TO_CART',
            car
        })
    }
}
export function removeFromCart(carId) {
    return (dispatch) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            carId
        })
    }
}
export function checkout() {
    return async (dispatch, getState) => {
        try {
            const state = getState()
            const total = state.carModule.cart.reduce((acc, car) => acc + car.price, 0)
            const score = await userService.changeScore(-total)
            dispatch({ type: 'SET_SCORE', score })
            dispatch({ type: 'CLEAR_CART' })
            showSuccessMsg('Charged you: $' + total.toLocaleString())
        } catch (err) {
            showErrorMsg('Cannot checkout, login first')
            console.log('CarActions: err in checkout', err)
        }
    }
}


// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveCarOptimistic(carId) {

    return (dispatch, getState) => {

        dispatch({
            type: 'REMOVE_CAR',
            carId
        })
        showSuccessMsg('Car removed')

        carService.remove(carId)
            .then(() => {
                console.log('Server Reported - Deleted Succesfully');
            })
            .catch(err => {
                showErrorMsg('Cannot remove car')
                console.log('Cannot load cars', err)
                dispatch({
                    type: 'UNDO_REMOVE_CAR',
                })
            })
    }
}