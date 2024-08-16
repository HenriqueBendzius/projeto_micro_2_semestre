const express = require('express')
const router = new express.Router()

//ponto de acesso de get 
//retornar status 200 ok

router.get('/' , (req, res , next) =>{
    res.status(200).send(
        {
            "nome" : "Henrique Bendzius"

        }
    )

})


//401 unauthorized
router.get('/privada' , (req, res) =>{
    const token = req.headers['authorization'];
        if(!token || token != 'minhaSenha'){
            return res.status(401).send('Sem autorização')
        }

        res.send('Area acessada com sucesso').status(200)

})

const tokenExemplos ={
    'tokenAdmin' : {role: 'admin'},
    'tokenUser' : {role: 'user'},
    'tokenConvidado' : {role: 'convidado'},

}

router.get('/admin' ,(req, res)=>{
    const token = req.headers["authorization"]

    if(!token){
        return res.status(401).send('sem autorização')
    }

    const user = tokenExemplos[token]

    if(!user){
        return res.status(401).send('token inválido')

        }

    if(user.role != 'admin'){
        return res.status(403).send('você não tem permissão para acessar aqui')
    }

    return res.send('acesso liberado!').status(200)
})

//exemplo bad request -400
router.post('/submit' , (req,res)=>{
    const {nome , email} = req.body;

    if(!nome || !email){
        return res.status(400).send('bad request..favor enviar nomee email')
    }
        //status 2025 sucesso
        res.status(201).send('dado criado com sucesso');
})

//status 404

let items =[
    {id:1 , nome: 'item1'},
    {id:2 , nome: 'item2'},
    {id:3 , nome: 'item3'}
]

router.get("/items/:id" , (req, res)=>{
    const id = parseInt(req.params.id)
    const item = items.find(item => item.id == id)

    if(item){
       return res.status(200).send(item)
    }else {
        return res.status(404).send('item não encontrado')
    }

})



module.exports = router;

