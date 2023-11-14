import React, { useEffect } from 'react'
import { useState } from 'react'

const useLocalStorage = () => {
    const [storage, setStorage] = useState({})

    useEffect(() => {
        if (localStorage.length > 0) {
            Object.keys(localStorage).forEach((key) => {
                setStorage({ ...storage, [key]: JSON.parse(localStorage.getItem(key)) })
            })
        }
    }, [])

    const set = (key, value) => {
        if (typeof value === 'string') {
            localStorage.setItem(key, value)
            setStorage({ ...storage, [key]: value })
            return true
        }
        localStorage.setItem(key, JSON.stringify(value))
        setStorage({ ...storage, [key]: value })
        return true
    }
    /**
     * Recupera el valor asociado con la clave dada desde el almacenamiento.
     * Si la clave existe en el almacenamiento, devuelve el valor.
     * Si la clave existe en el localStorage, analiza el valor y guárdalo en el almacenamiento antes de devolverlo.
     * Si la clave no existe en el almacenamiento ni en el localStorage, devuelve false.
     * 
     * @param {string} key - La clave para la cual recuperar el valor.
     * @returns {any} - El valor asociado con la clave, o false si la clave no existe.
     */
    const get = (key) => {
        // Comprueba si la clave existe en el almacenamiento
        if (storage[key]) {
            return storage[key]
        }

        // Comprueba si la clave existe en el localStorage
        if (localStorage.getItem(key)) {
            const value = localStorage.getItem(key)

            // Comprueba si el valor es un objeto o un arreglo
            if (value.match(/^{.*}$/) || value.match(/^\[.*\]$/)) {
                setStorage({ ...storage, [key]: JSON.parse(value) })
                return JSON.parse(value)
            } else {
                setStorage({ ...storage, [key]: value })
                return value
            }
        }

        // La clave no existe en el almacenamiento ni en el localStorage
        return false
    }

    const remove = (key) => {
        if (localStorage.getItem(key)) {
            localStorage.removeItem(key)
            if (storage[key]) {
                setStorage({ ...storage, [key]: undefined })
            }
            return true
        }
        return false
    }

    const clear = () => {
        localStorage.clear()
        if (localStorage.length === 0) {
            setStorage({})
            return true
        }
        return false
    }

    const length = () => {
        return localStorage.length
    }

    return [storage, {
        set,
        get,
        remove,
        clear,
        length
    }]
}

export default useLocalStorage