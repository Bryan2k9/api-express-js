const express = require('express');
const db = require('./db');
const app = express()
const convercao = require('./temperatura')
const port = 3000
app.use(express.json())

// mensagem de teste
app.get('/', (req, res) => {
  res.send('API ESTÁ FUNCIONANDO! NÍCOLAS É LARPADOR')
})

// 1
app.get('/medicao', async (req, res) => {
  try {
    const [rows] = await db.execute('select * from medicoes');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro Interno do Servidor",
      detalhes: error.message
    });
  }
})

// 2
app.get('/medicao/temperatura_ideal', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM medicoes WHERE classificacao like "Temperatura ideal";');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro Interno do Servidor",
      detalhes: error.message
    });
  }
})

// 3
app.get('/medicao/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute('select * from medicoes where id=?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        mensagem: "Temperatura não encontrado",
        detalhes: error.message
      });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro Interno do Servidor",
      detalhes: error.message
    });
  }
})

// 4
app.get('/medicao/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute('select * from medicoes where id=?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        mensagem: "Temperatura não encontrado",
        detalhes: error.message
      });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro Interno do Servidor",
      detalhes: error.message
    });
  }
})

// 5 salvar as temperaturas
app.post('/medicao/salvar', async (req, res) => {
  const {
    descricao, 
    tipo, 
    valor_original, 
    unidade_original,
    valor_convertido,
    unidade_convertida,
    classificacao,
    } = req.body;

  if(!descricao || !tipo || !valor_original || !unidade_original || !valor_convertido || !unidade_convertida || !classificacao){
      return res.status(400).json({
        mensagem: "Verifique se todos os campos estão preenchidos",
      });
  }

  try {
      const [rows] = await db.execute('INSERT INTO `medicoes` (`descricao`, `tipo`, `valor_original`, `unidade_original`, `valor_convertido`, `unidade_convertida`, `classificacao`) VALUES (?,?,?,?,?,?,?);',
      [descricao, tipo, valor_original, unidade_original, valor_convertido, unidade_convertida, classificacao]);
      res.status(201).json({
        id:rows.insertId,
        descricao, 
        tipo, 
        valor_original, 
        unidade_original, 
        valor_convertido, 
        unidade_convertida, 
        classificacao
      });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro Interno do Servidor",
      detalhes: error.message
    });
  }
})

// 6 Editar as temperaturas
app.put('/medicao/:id', async (req, res) => {
    const { id } = req.params;
    const {
        descricao,
        tipo,
        valor_original,
        unidade_original,
        valor_convertido,
        unidade_convertida,
        classificacao
    } = req.body;

    try {
        const [rows] = await db.execute(
            'UPDATE medicoes SET descricao = ?, tipo = ?, valor_original = ?, unidade_original = ?, valor_convertido = ?, unidade_convertida = ?, classificacao = ? WHERE id = ?',
            [descricao, tipo, valor_original, unidade_original, valor_convertido, unidade_convertida, classificacao, id]
        );

        if (rows.affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Medição não encontrada"
            });
        }

        res.status(200).json({
            mensagem: "Medição atualizada com sucesso"
        });

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro Interno do Servidor",
            detalhes: error.message
        });
    }
});

// 7 deletar as temperaturas
app.delete('/medicao/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute('delete from medicoes where id=?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        mensagem: "Temperatura não encontrado",
        detalhes: error.message
      });
    }
    res.status(200).json({
      mensagem: "Temperatura deletada"
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro Interno do Servidor",
      detalhes: error.message
    });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})