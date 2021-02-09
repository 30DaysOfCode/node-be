const CertController = require('./certificates.controller');
const { Router } = require('express');

var router = Router()

router.get('/', CertController.fetchCertificates)

router.get('/:id', CertController.fetchCertById)

router.get('download/:id', CertController.downloadCert)

router.post('/create', CertController.createCertificate)

router.patch('/edit/:id', CertController.editCertificate)

router.delete('/delete/:id', CertController.deleteCertificate)

module.exports = router