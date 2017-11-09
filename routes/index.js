const pkg_json = require('../package.json')
const turbo = require('turbo360')({site_id:pkg_json.app})
const vertex = require('vertex360')({site_id:pkg_json.app})
const router = vertex.router()

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', function(req, res){

	turbo.fetch('company', null)
	.then(data => {
		res.render('index', {companies:data, initial:JSON.stringify(data)})
	})
	.catch(err => {
		res.render('index', {text: 'This is the dynamic data. Open index.js from the routes directory to see.'})
	})
})


module.exports = router
