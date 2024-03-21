export function UserDetailDTO(user: any,) {
    return {
        user_id: user.userId,
        name: user.nama,
        email: user.email,
        address: user.alamat,
        phone_number: user.no_telp,
        products: user.products.map((userProduct: any) => (
            {
                product_id: userProduct.productId,
                name: userProduct.nama,
                brand: userProduct.brand,
                category: userProduct.category,
            }
        )),
        reviews: user.review.map((userReview: any) => ({
            review_id: userReview.reviewId,
            product_name: userReview.product.nama,
            rating: userReview.rating,
            comment: userReview.comment,
        })),
        carts: user.cart.map((userCart: any) => ({
            cart_id: userCart.cartId,
            name: userCart.product.nama,
            quantity: userCart.quantity,
            created_at: userCart.createdAt
        }))
    }
}

export function UserDTO(user: any) {
    return {
        user_id: user.userId,
        name: user.nama,
        email: user.email,
        address: user.alamat,
        phone_number: user.no_telp
    }
}