const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const uuid = require('uuid')
const _ = require('lodash')

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

const getUserFromReq = (req) => {
  return state.users[req.get('Authorization')]
}

app.post('/answers', (req, res) => {
  let body = req.body
  let user = getUserFromReq(req)
  let questionId = body.id

  if(user && questionId && state.questions[questionId] && body.answer) {
    question = state.answers[questionId] || {}
    question[userId] = body.answer

    state.answers[questionId] = question

    saveState(state, function(err) {
      if (err) {
        res.status(404).send('Answer not saved');
        return;
      }
      res.json('Answer saved');
    });

  } else {
    res.status(400).json("Invalid request")
  }
})

app.get('/answers', (req, res) => {

  let answers = _.mapValues(state.answers, (question) => {
    let newQ = {}
    Object.keys(question).forEach(k => { newQ[state.users[k].nick] = question[k] })
    return newQ
   });

  res.json(answers)
})

app.post('/users', (req, res) => {
  console.log("POST", req.body)
  let body = req.body

  if(body.nick) {

    if(Object.values(state.users).filter(u => u.nick === body.nick).length > 0 && body.id) {
      res.status(400).json("User already exists with that nick")
      return;
    } else {
      const id = body.id
      user = {
        nick: body.nick,
        id: id
      }

      state.users[id] = user

      saveState(state, function(err) {
        if (err) {
          res.status(404).json('1User not saved');
          return;
        }
        res.json(user);
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
  let user = getUserFromReq(req)
  console.log("questions", user, body)

  if(user && body.question && body.alternatives.length === 3) {
    id = uuid.v4()
    body.id = id
    body.author = user.nick
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
  console.log('App listening on port 3000!')
})

function saveState(state, callback) {
  fs.writeFile('./state.json', JSON.stringify(state), callback);
}
