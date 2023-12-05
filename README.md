# level-2-assingment-2

**Copy this command and start this awesome project😊**

```

   git clone https://github.com/NiharMondal/level-2-assignment-2.git

   // install all dependencies and devDependencies

   npm run dev

```

**When you are ready to use this app, endpoint should be like that**

Users Endpoint--

[!NOTE]: Use userId for updating user, orders and retrive.

```

   //create user
   http://localhost:5000/api/users

   //get all users
   http://localhost:5000/api/users

   //get single user
   http://localhost:5000/api/users/:userId

   //update user by ID
   http://localhost:5000/api/users/:userId

   //delete user
   http://localhost:5000/api/users/:userId


```

Order endpoint

```

    //get all orders by ID
    http://localhost:5000/api/users/:userId/orders

    //update orders array by ID
    http://localhost:5000/api/users/:userId/orders


```

Get total amount of specific user

```

   //get total amount
   http://localhost:5000/api/users/:userId/orders/total-price

   Example

   {
      "success": true,
      "message": "Total price calculated successfully!",
      "data": {
         "totalPrice": 754
   }
}


```
