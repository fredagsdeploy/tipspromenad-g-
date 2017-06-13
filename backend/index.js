const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const uuid = require('uuid')

app.use(bodyParser.json())

let state = JSON.parse(fs.readFileSync('./state.json', 'utf8'));

if(!state.questions) {
  state.questions = {}
}

if(!state.users) {
  state.users = {}
}

if(!state.answers) {
  state.answers = {}
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/answers', (req, res) => {
  let body = req.body

  if(body.id && state.questions[body.id]) {
    question = state.answers[body.id] || {}
    question[body.nick] = body.answer

    state.answers[body.id] = question

    saveState(state, function(err) {
      if (err) {
        res.status(404).send('Answer not saved');
        return;
      }
      res.json('Answer saved');
    });

  } else {
    res.status(404).json("Question not found")
  }
})

app.get('/answers', (req, res) => {
  res.json(state.answers)
})

app.post('/users', (req, res) => {
  let body = req.body
  if(body.nick) {

    if(Object.values(state.users).filter(u => u.nick === body.nick).length > 0) {
      res.status(400).json("User already exists with that nick")
      return;
    } else {
      const id = uuid.v4()
      user = {
        nick: body.nick,
        id: id
      }

      state.users[id] = user

      saveState(state, function(err) {
        if (err) {
          res.status(404).send('User not saved');
          return;
        }
        res.json('User saved');
      });
    }
  } else {
    res.status(400).json("User must have nick")
  }
})

app.get('/users', (req, res) => {
  res.json(Object.values(state.users).map((u) => ({nick: u.nick})))
})

app.get('/questions', (req, res) => {
  res.json(Object.values(state.questions))
})

app.post('/questions', (req, res) => {
  let body = req.body;
  if(body.question && body.alternatives.length === 3) {
    id = uuid.v4()
    body.id = id
    state.questions[id] = body

    saveState(state, function(err) {
      if (err) {
        res.status(404).send('Question not saved');
        return;
      }

      res.json('Question saved');
    });
  } else {
    res.status(400).json({msg: "Invalid question format"})
  }

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function saveState(state, callback) {
  fs.writeFile('./state.json', JSON.stringify(state), callback);
}
