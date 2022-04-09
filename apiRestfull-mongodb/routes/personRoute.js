const router = require('express').Router()   // router do express
const Person = require('../models/Person')   //sintaxe para importação de arquivo
// read json  / middlewares

//create
router.post('/', async (req, res) => {
    const { name, salary, approved } = req.body

    if (!name) {
        res.status(422).json({ erro: 'O nome é obrigatório' })   // é necessário fazer validação de todos os dados do sistema
        return
    }
    const person = {
        name,
        salary,
        approved,
    }
    try {

        await Person.create(person)   //método criação de dados do mongoose

        res.status(201).json({ message: 'Pessoa cadastrada com sucesso!' })     // 201 dado criado com sucesso
    } catch (error) {
        res.status(500).json({ error: error })    //500 erro de conexão exemplo de teste não é a melhor pratica recomendada
    }
})

// read
router.get('/', async (req, res) => {
    try {

        const people = await Person.find()   // busca todos os dados
        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

router.get('/:id', async (req, res) => {

    const id = req.params.id   //extrair o dado da requisição , pela url = req.params

    try {

        const people = await Person.findOne({ _id: id })   // busca apenas um dado

        if (!people) {
            res.status(422).json({ message: 'erro usuário não encontrado' })
            return
        }

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

//update   - PUT/PATCh
router.patch('/:id', async (req, res) => {

    const id = req.params.id
    const { name, salary, approved } = req.body

    const person = {   // atualiza novos dados
        name,
        salary,
        approved,
    }

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person)

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

// Delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const people = await Person.findOne({ _id: id })   // busca apenas um dado

    if (!people) {
        res.status(422).json({ message: 'erro usuário não encontrado' })
        return
    }
    try {
        await Person.deleteOne({ _id: id })
        res.status(200).json({ message: 'usuário removido com sucesso!' })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

module.exports = router