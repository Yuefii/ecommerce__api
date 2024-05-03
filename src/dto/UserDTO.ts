export function UserDetailDTO(user: any) {
    return {
        user_id: user.userId,
        name: user.nama,
        email: user.email,
        address: user.alamat,
        phone_number: user.no_telp,
        history_search: Array.isArray(user.history) ?
            user.history.map((userHistory: any) => (
                {
                    history_id: userHistory.historyId,
                    title: userHistory.title,
                    category: userHistory.category,
                }
            )) : [],
        products: Array.isArray(user.products) ?
            user.products.map((userProduct: any) => (
                {
                    product_id: userProduct.productId,
                    name: userProduct.nama,
                    brand: userProduct.brand,
                    category: userProduct.category,
                }
            )) : [],
        reviews: Array.isArray(user.review) ?
            user.review.map((userReview: any) => ({
                review_id: userReview.reviewId,
                product_name: userReview.product.nama,
                rating: userReview.rating,
                comment: userReview.comment,
            })) : [],
        carts: Array.isArray(user.cart) ?
            user.cart.map((userCart: any) => ({
                cart_id: userCart.cartId,
                name: userCart.product.nama,
                quantity: userCart.quantity,
                created_at: userCart.createdAt
            })) : [],
        created_at: user.createdAt,
        updated_at: user.updatedAt
    }
}

export function UserDTO(user: any) {
    return {
        user_id: user.userId,
        name: user.nama,
        email: user.email,
        address: user.alamat,
        phone_number: user.no_telp,
        updated_at: user.updatedAt
    }
}

export function UserInfoDTO(user: any) {
    return {
        user_id: user.userId,
        name: user.nama,
        email: user.email,
        phone_number: user.no_telp,
        created_at: user.createdAt,
        updated_at: user.updatedAt
    }
}