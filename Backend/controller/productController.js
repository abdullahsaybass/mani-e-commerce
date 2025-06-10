
export const getProducts = (req, res, next) => {
  
  res.json({
    success: true,
    products: []  
  });
};

export const getSingleProduct = (req, res, next) => {
  const { id } = req.params;
  
  res.json({
    success: true,
    product: { id } 
  });
};
