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
    },

    getAccessories: (req, res) => {
        const db = req.app.get('db');
        db.get_accessories().then(accessories => {
            res.status(200).json(accessories)
        }).catch(error => {
            res.sendStatus(500)
            console.log('Error on getAccessories', error)
        })
    },

    getProductDetail: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        db.get_product_detail(id).then(item => {
            res.status(200).json(item)
        }).catch(error => {
            res.sendStatus(500)
            console.log('Error on getProductDetail', error)
        })
    },

    addProduct: (req, res) => {
        const db = req.app.get('db');
        const { type, name, description, image_url, price } = req.body;
        db.add_product(type, name, description, image_url, price).then(item => {
            res.status(200).json(item)
        }).catch(error => {
            res.sendStatus(500)
            console.log('Error on addProduct', error)
        })
    },

    updatePrice: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        const { price } = req.body;
        db.update_price(price, id).then(item => {
            res.status(200).json(item)
        }).catch(error => {
            res.sendStatus(500)
            console.log('Error on updatePrice', error)
        })
    },

    removeProduct: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        db.remove_product(id).then(item => {
            res.sendStatus(200)
        }).catch(error => {
            res.sendStatus(500)
            console.log('Error on removeProduct', error)
        })
    }
}