module.exports = [

    // prevent deletion of localStorage
    {
        signature: 'delete window.localStorage',
        payload: ''
    }

];