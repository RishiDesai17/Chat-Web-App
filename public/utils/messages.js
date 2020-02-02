const generateMsg = (username,text) =>{
    return{
        username,
        text,
        createdAt: new Date().getTime()
    }
}

const generateLoc = (username,link) =>{
    return{
        username,
        link,
        tstamp: new Date().getTime()
    }
}

module.exports = {
    generateMsg,generateLoc
}