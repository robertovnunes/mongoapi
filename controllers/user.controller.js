const User = require('../models/user.model');

exports.getUsers = async (req, res) => {
   try {
         const users = await User.find();
         console.log(users);
         if(users.length > 0) {
                return res.status(200).json(users);
            } else res.status(204).send('Nenhum usuário cadastrado');
   } catch (error) {
         console.error('Erro ao ler os usuários', error);
         res.status(500).send('Erro ao ler os usuários');
   }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao ler o usuário', error);
        res.status(500).send('Erro ao ler o usuário');
    }
};

exports.createUser = async (req, res) => {
    try {
        const {nome, email, senha} = req.body;
        if (!nome || !email || !senha) {
            return res.status(400).send('Campos obrigatórios não preenchidos');
        }
        const userAlreadyExists = User.findOne({email: email});
        if (userAlreadyExists > 0) {
            return res.status(409).send('Usuário já cadastrado');
        }
        const user = {nome, email, senha};
        await User.create(user);
        res.status(201).json(user);
    } catch (error) {
            console.error('Erro ao criar o usuário', error);
            res.status(500).send('Erro ao criar o usuário');
    }
};

exports.patchUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = User.findById(id);
        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }
        const {nome, email, senha} = req.body;
        userUpdate = {nome, email, senha};
        await User.updateOne(userUpdate);
        res.status(200).json(userUpdate);
    } catch (error) {
        console.error('Erro ao atualizar o usuário', error);
        res.status(500).send('Erro ao atualizar o usuário');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }
        let id = req.params.id;
        console.log(id);
        await User.deleteOne({_id: id});
        res.status(204).send("Usuário deletado com sucesso");
    } catch (error) {
        console.error('Erro ao deletar o usuário', error);
        res.status(500).send('Erro ao deletar o usuário');
    }
}