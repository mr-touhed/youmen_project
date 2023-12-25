var jwt = require('jsonwebtoken');

// verify token
const verifyJWT = (req,res,next) =>{
    
    const token = (req.headers.authorization).split(" ")[1]
    
    if(!token){
        return res.status(401).json({result:false,massage:"token not found"})
    }
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, function(err, decoded) {
        if(err){
            return res.status(403).json({result:false,massage:"unauthorized token"})
        }
        
        if(decoded){
            
            req.headers.id = decoded.data;
            next()
        }
      });

      
     
}

module.exports = {
    verifyJWT
}