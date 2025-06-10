import jwt from  'jsonwebtoken';

const userAuth = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.json({
            success: 'false',
            message: 'Notauthorized access, login again',
        })
    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if(!tokenDecode.id) {
            req.body.userId = tokenDecode.id;
        }
        else{
            return res.json({
                success: 'false',
                message: 'Notauthorized access, login again',
            });
        }

        next();
    }
    catch(error) {
        res.json({
            success: 'false',
            message: error.message,
        });
    }
}
}