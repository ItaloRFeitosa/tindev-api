const Dev = require('../models/Dev');

module.exports = {

    async index(req, res){
        try {
            
            const { user } = req.headers;
    
            const loggedDev = await Dev.findById(user);
            
            if(loggedDev.dislikes.length == 0){

                return res.json({message: "Without Dislikes"});

            } else {
    
                const devs = await Dev.findById(loggedDev.dislikes);
        
                return res.json(devs);

            }

        } catch (error) {

            return res.status(400).json({error})

        }
    },

    async store(req,res){
        try {
            const { devId } = req.params;
            const { user } = req.headers;

            const loggedDev = await Dev.findById(user);

            const targetDev = await Dev.findById(devId);

            if (!targetDev) {
                return res.status(400).json({message: "Dev not exists"})
            }
            
            loggedDev.dislikes.push(devId);

            await loggedDev.save();

            return res.json(loggedDev);
        } catch (error) {
            return res.status(400).json(error);
        }
        
    }
}