const pkg_json = require('../package.json')
const turbo = require('turbo360')({site_id:pkg_json.app})
const vertex = require('vertex360')({site_id:pkg_json.app})
const router = vertex.router()

router.post('/createcompany', function(req, res){
	turbo.create('company', req.body)
	.then(data => {
		res.json({
			confirmation: 'success',
			message: 'Company ' + req.body.name + ' created. Log into your Turbo dashboard and check the "Datastore" section of this project.'
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/companies', function(req, res){

	turbo.fetch('company', req.query)
	.then(data => {
		res.json({
			confirmation: 'success',
			companies: data
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/companies/:id', function(req, res){
	turbo.fetchOne('company', req.params.id, null)
	.then(data => {
		res.json({
			confirmation: 'success',
			company: data
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

// this endpoint updates a company speficied by ID
router.put('/companies/:id', function(req, res){

	// turbo.update('company', original, updatedParams)
	// .then(data => {
	// 	res.json({
	// 		confirmation: 'success',
	// 		company: data
	// 	})
	// })
	// .catch(err => {
	// 	res.json({
	// 		confirmation: 'fail',
	// 		message: err.message
	// 	})
	// })
})


module.exports = router
