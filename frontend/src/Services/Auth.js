let setToken = (token) => {
    console.log("Token", token)
    if(token){
        localStorage.setItem('access-token', token);
    }
}

let getToken = () => {
    let token = localStorage.getItem('access-token');
    if (token) {
        return token;
    } else {
        return null;
    }
}

let isAuthenticated = () => {
    if (getToken()) {
        return true;
    } else {
        return false;
    }
}

let destroyToken = () => {
    localStorage.removeItem('access-token');

    return true;
}

let setUser = (user) => {
    if (user) {
        localStorage.setItem('user', JSON.stringify(user))
    }
}

let getUser = () => {
    const user = localStorage.getItem('user')
    if (user) {
        return JSON.parse(user)
    }
}

let getUserRole = () => {
    const user = getUser()
    return user.role
}

let isAdmin = () => {
    return getUserRole() === 'admin'
}

let isModerator = () => {
    return getUserRole() === 'moderator'
}

let isClient = () => {
    return getUserRole() === 'client'
}
export default {
    setToken: setToken,
    getToken: getToken,
    isAuthenticated: isAuthenticated,
    destroyToken: destroyToken,
    setUser: setUser,
    getUser: getUser,
    getUserRole: getUserRole,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isClient: isClient
}