import userModel from "../models/userModel.js"

// Add products to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body

        const userData = await userModel.findById(userId)
        let cartDate = await userData.cartDate

        if(cartDate[itemId]){
            if(cartDate[itemId][size]){
                cartDate[itemId][size] += 1
            }else{
                cartDate[itemId][size] = 1
            }
        }else{
            cartDate[itemId] = {}
            cartDate[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, {cartDate})
        res.json({success: true, message: "Added To Cart"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// Update user cart
const updateCart = async (req, res) => {
    try {
        
        const { userId, itemId, size, quantity } = req.body

        const userData = await userModel.findById(userId)
        let cartDate = await userData.cartDate

        cartDate[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, {cartDate})
        res.json({success: true, message: "Cart Updated"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// get user cart data
const getUserCart = async (req, res) => {

    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId)
        let cartDate = await userData.cartDate

        res.json({success: true, cartDate })

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

export { addToCart, updateCart, getUserCart}