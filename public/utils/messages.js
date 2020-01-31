const generateMsg = (text) =>{
    return{
        text,
        createdAt: new Date().getTime()
    }
}

const generateLoc = (link) =>{
    return{
        link,
        tstamp: new Date().getTime()
    }
}

module.exports = {
    generateMsg,generateLoc
}