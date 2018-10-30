module.exports = {
    getWakeboards: (req, res) => {
        const db = req.app.get('db');
        db.get_wakeboards().then(wakeboards => {
            res.status(200).json(wakeboards)
        }).catch(error => {
            res.sendStatus(500)
            console.log('Error on getWakeboards', error)
        })
    },

    getWaterskis: (req, res) => {
        const db = req.app.get('db');
        db.get_waterskis().then(waterskis => {
            res.status(200).json(waterskis)
        }).catch(error => {
            res.sendStatus(500)
            console.log('Error on getWaterskis', error)
        })
    },

    getTubes: (req, res) => {
        const db = req.app.get('db');
        db.get_tubes().then(tubes => {
            res.status(200).json(tubes)
        }).catch(error => {
            res.sendStatus(500)
            console.log('Error on getTubes', error)
        })
    },

    getLifevests: (req, res) => {
        const db = req.app.get('db');
        db.get_lifevests().then(lifevests => {
            res.status(200).json(lifevests)
        }).catch(error => {
            res.sendStatus(500)
            console.log('Error on getLifevests', error)
        })
    }
}