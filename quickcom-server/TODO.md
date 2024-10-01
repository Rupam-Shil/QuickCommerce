Admin

1. write endpoint to generate discount code

Cart

1. Write endpoint for adding item to cart
   1. simple middleware to validate user
   2. simple product validation and push item to users cart
2. endpoint to checkout and place order
   1. If cart empty throw error
   2. sum the cart items
   3. if discount code present
      1. check if valid discount code
         1. Invalid -> throw error
         2. else -> modify discount code status to used
         3. get discount amount and subtract from total amount
      2. increment global stat data
      3. generate order dto
      4. send to user
3. Write a endpoint to generate product
