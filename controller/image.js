const Clarifai = require('clarifai');

const handleImage =(req,res,db)=>{
	const {id} =req.body;
	  db('users').where('id', '=', id)
	  .increment('entries',1)
	  .returning('entries')
	  .then(entries=> {
	  	if(entries.length){
	  		res.json(entries[0]);	
	  	}else{ res.status(400).json('Unable to get entries')}
	  })
	  .catch(err => res.status(400).json('Unable to get entries'))
}

const app = new Clarifai.App({
 apiKey: '63f683f8bdba4f68a739ecad0b7f4877'
});

const handleApi =(req,res)=>{
	app.models
    	.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    	.then(data =>{
    		res.json(data)
    	})
}
module.exports ={
	handleImage:handleImage,
	handleApi:handleApi
}
