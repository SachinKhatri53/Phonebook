const express = require('express');
const router = express.Router();
const Phone = require('../models/Phone');
const { uploadDir, isEmpty } = require('../helpers/upload-helper');
const fs = require('fs');

router.get('/', async (req, res) => {
    const phones = await Phone.find().sort({ firstname: 'asc' });
    Phone.findOne({}, {}, { sort: { 'firstname' : 1, '_id' : -1 } }, (err, doc) => {
        if (err) throw err;
    }).then(phone => {
        res.render('index', { phone: phone, phones });
    });
});


router.get('/add', async (req, res) => {
    const phones = await Phone.find().sort({ firstname: 'asc' });
    res.render('add', { phones });
});
router.post('/add', (req, res) => {
    let filename = 'profile.jpg';
    if (!isEmpty(req.files)) {
        let file = req.files.photo;
        filename = Date.now() + '-' + file.name;
        file.mv('./public/uploads/' + filename, (err) => {
            if (err) throw err;
        });
    }
    const newPhone = new Phone({
        photo: filename,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        company: req.body.company,
        phonenumber: req.body.phone,
        email: req.body.email,
        address: req.body.address
    });

    newPhone.save().then(savedPhone => {
        res.redirect('/');
    }).catch(err => {
        console.log('Failed Operation ' + err);
    });
});

router.get('/view/:id', async (req, res) => {
    const phones = await Phone.find().sort({ firstname: 'asc' });
    Phone.findOne({ _id: req.params.id })
        .then(phone => {
            res.render('view', { phone: phone, phones });
        });
});

router.get('/edit/:id', async (req, res) => {
    const phones = await Phone.find().sort({ firstname: 'asc' });
    Phone.findOne({ _id: req.params.id }).then(phone => {
        res.render('edit', { phone: phone, phones });
    });
});



router.put('/edit/:id', async (req, res) => {
    const phones = await Phone.find();
    const phoneData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        company: req.body.company,
        phonenumber: req.body.phone,
        email: req.body.email
    };

    if (!isEmpty(req.files)) {
        let file = req.files.photo;
        let filename = Date.now() + '-' + file.name;
        phoneData.photo = filename;
        Phone.findOne({ _id: req.params.id })
            .then(phone => {
                fs.unlink(uploadDir + phone.photo, (err) => {
                    file.mv('./public/uploads/' + filename, (err) => {
                        if (err) throw err;
                    });
                });
            });
    }
    console.log(phoneData);
    Phone.findByIdAndUpdate(req.params.id, phoneData, { new: true })
        .then(phone => {
            res.render('view', { phone: phone, phones });
        })
        .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
    Phone.findOne({ _id: req.params.id })
        .then(phone => {
            fs.unlink(uploadDir + phone.photo, (err) => {
                phone.deleteOne({ _id: req.params.id });
                res.redirect('/');
            });
        });
});

//     Phone.deleteOne({ _id: req.params.id })
//         .then(result => {

//         })
// });

module.exports = router;