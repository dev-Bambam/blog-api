const auth = async (req, res, next) => {
   const authHeader = req.headers.authorisation;
   if (!authHeader) {
      return res.status(401).json({
         status: "fail",
         message: `please provide bearer's token`,
      });
   } else {
      const token = authHeader.split(" ")[1];
      try {
         const decodedToken = await JsonWebTokenError.verify(token, process.env.SECRET_KEY);
         req.user = decodedToken;
         next();
      } catch (error) {
         return res.status(500).json({
            status: "error",
            message: {
               error: error.message,
            },
         });
      }
   }
};
