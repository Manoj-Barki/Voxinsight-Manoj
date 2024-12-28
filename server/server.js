const express = require('express')
const axios = require('axios');
const cheerio = require('cheerio');
var Sentiment = require('sentiment');
var sentiment = new Sentiment;
const app = express();
const cors = require('cors');
app.use(cors())
// app.use(express.json());

const url = "https://www.amazon.com/HP-i3-1125G4-Processor-Anti-Glare-Accessories/dp/B0CJQVVSL2/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.kuslKlXXv2lRPqY7IfE9WHDGtsIgFIQhUJ63TYSY4xr-SJ6IVTTagl4o_FCue59nC9nJ8XZmP6-qrKgqBenCYgswx63lCSHBx78KiRPHBusWWgIjNymhA0hEoBgVI77f6H6l4rIZowgRkAs9YKN4qY61hge9v0wZg-XTabv3yoGbsrFEzNVO2TICecMKIEAeSzom_QP0Zecml1YoamyWU2vQVF8fZIEXL3Gtokky4_c.i740TwTVHZ9DYF4uVDKXY_0h_xb9hLvsObPy6GeD6d0&dib_tag=se&keywords=laptops&qid=1734101062&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1";

const productData = [];

app.get("/api", async(req, res) => {
    var totalScore = 0;
    var numRev = 0;
    var posRev = 0;
    var negRev =0;
    var neuRev =0;
    var posScore = 0;
    var negScore = 0;

    let webCode = (await axios.get(url)).data;
    const $ = cheerio.load(webCode);
    $('#cm-cr-dp-review-list>li').each((i, review) => {
        const rev = $(review).find('.a-size-base.review-text').text();
        var x = sentiment.analyze(rev).score;
        // console.log(sentiment.analyze(rev))
        totalScore += x;
        numRev++;
        if(x>0) {
            posRev++;
            posScore += x;
        }
        if(x===0) neuRev++;
        if(x<0) {
            negRev++;
            negScore -= x;
        }
        productData[i]={score: x, review: rev};
    })
    $('#title').each((i, productname) => {
        productName = $(productname).find('span').text();
        // console.log(productName)
    });
    return res.json({ ProductName: productName, TotScore: totalScore, NumRevs : numRev, PosRevs : posRev, NegRevs: negRev, NeuRevs: neuRev, PosScore: posScore, NegScore: negScore})

})

app.listen(5000, () => {console.log("Server is listening on port 5k")})
