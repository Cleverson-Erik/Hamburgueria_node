const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())


const Orders = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    
    const index = Orders.findIndex(user => user.id === id)

    if(index < 0){
      return response.status(404).json({ message: "User not found"})
    }

    request.userIndex = index
    request.userId = id

  next()
}

     const checkMethod = (request, response, next) => {
      const method = request.method
      const url = request.url

      console.log(`Esse é o methodo: ${method} seguido dessa URL: ${url}`)
       
    next()
};

app.post('/order', checkMethod,(request, response) => { //mostra a rota criada
    const { order, clientName, price }  = request.body

    const user = { id:uuid.v4(), order, clientName, price, Status: "Em preparação"}

    Orders.push(user)

    return response.status(201).json(user)

})

app.get('/order', checkMethod, (request, response) => {
    
  console.log(Orders)
    
    return response.json(Orders)
  
  })

  app.put('/order/:id', checkUserId, checkMethod, (request, response) => { //atualza a rota criada
    const { order, clientName, price  } = request.body
    const index = request.userIndex
    const id = request.userId

    const NewRequest = {id, order, clientName, price }

    Orders [index] = NewRequest

  return response.json(NewRequest)

})

app.delete('/order/:id', checkUserId, checkMethod,(request, response) => {
  const index = request.userIndex
    
    Orders.splice(index,1)

    return response.status(204).json()

})

app.get('/order/:id', checkUserId, checkMethod,(request, response) => {
    const index = request.userIndex
     
    return response.json(Orders[index])
  
  })

  app.patch('/order/:id', checkUserId, checkMethod, (request, response) => {
    
    const index = request.userIndex
    const { id } = request.params
    const { order, clientName, price } = request.body

    const StatusPedido = { id, order, clientName, price,  Status: "Pedido pronto" }


    Orders[index] = StatusPedido
    
    console.log(StatusPedido)
    return response.json(StatusPedido)
  })




app.listen(port, () => {
  console.log(`🛸 Server started at port ${port}`)
})