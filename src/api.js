import axios from 'axios'
const create = async (user) => {
    try {
        let response = await fetch('/api/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const signin = async (user) => {
    try {
        let response = await fetch('https://api.nileshjp.squareboat.info/v1/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        console.log(response)
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}
const signup = async (user) => {
    console.log(user)
    try {
        let response = await fetch('https://api.nileshjp.squareboat.info/v1/users/register/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        console.log(response + " my response")
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const signout = async () => {
    try {
        let response = await fetch('/auth/signout/', { method: 'GET' })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}
const allUsers = async (body, cred) => {
    try {
        let response = await fetch('http://139.59.74.117/api/admin/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cred.t
            },
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export {
    create,
    signin,
    signup,
    signout,
    allUsers
}