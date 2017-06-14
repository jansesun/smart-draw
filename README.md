# smart-draw
Generate brackets according to players' rank
# Getting Started
Run npm start script
```bash
npm start
```
You can browse the page via http://localhost:3000/static/index.html
Finish the form
# Tips
seedIndex should be a positive integer.
gender will be 1 as default.
You should type a name before add player.
Once you have generated brackets, you cannot add, remove or generate brackets;
If you really want to generate brackets again, you can execute the code below.
![demo gif](http://t2.qpic.cn/mblogpic/190767bd14bfd882516c/2000)
```javascript
// TIMESTAMP should be formated as 'yyMMdd', like '170613'
localStorage.removeItem(`drawResult_${TIMESTAMP}`);
```
# Installing
```bash
npm i
```
# Running the tests
```bash
npm test
```

