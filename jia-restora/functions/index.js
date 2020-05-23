const functions = require('firebase-functions');
const admin = require('firebase-admin');
var rp = require('request-promise');
var sha256 = require('js-sha256');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addAdminRole = functions.https.onCall((data, context) => {
   // Get user and add custom claim (admin)
   return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin:true
        });
   }).then(() =>{
       return{
           message:`Success! {$data.email} has made an admin`
       }
   }).catch(err => {
       return err;
   })
});


function getSign(paramMap, token) {
    //var encoded = ""
    var combinedParam = ""
    console.log('Hi im in getsign: ', paramMap)
    paramMap.forEach(param => {
      combinedParam += (param.key + param.value) //append
    })
    combinedParam+=token
    console.log(combinedParam)
    var hash = sha256.create()
    hash.update(combinedParam)
    console.log('hash: ', hash.hex())
    return hash.hex()
  }

exports.getDetails = functions.https.onCall((data, context) => {
    console.log('data.paramMap: ', data.paramMap)
    console.log('data.paramMap[0].value: ', data.paramMap[0].value)


    var paramMap = []
    var unixTime = Math.floor(Date.now() / 1000 )
    paramMap.push({key: 'appKey', value: data.paramMap[0].value})
    paramMap.push({key: 'shopIdenty', value: data.paramMap[1].value})
    paramMap.push({key: 'timestamp', value: unixTime})
    paramMap.push({key: 'version', value: data.paramMap[2].value})


    var sign = getSign(paramMap, data.token)

    console.log('sign: ', sign)

    var options = {
        method: 'POST',
        uri: 'https://sg-openapi.keruyun.com/open/v1/cater/dish/category',
        qs: {
          appKey: data.paramMap[0].value,
          shopIdenty: data.paramMap[1].value,
          version: data.paramMap[2].value,
          timestamp: unixTime, 
          sign: sign,
        },
      }
      return rp(options).then(body => {
        console.log(body)
        return body
      })
})

exports.getDetailsItems = functions.https.onCall((data, context) => {
  console.log('data.paramMap: ', data.paramMap)
  console.log('data.paramMap[0].value: ', data.paramMap[0].value)


  var paramMap = []
  var unixTime = Math.floor(Date.now() / 1000 )
  paramMap.push({key: 'appKey', value: data.paramMap[0].value})
  paramMap.push({key: 'shopIdenty', value: data.paramMap[1].value})
  paramMap.push({key: 'timestamp', value: unixTime})
  paramMap.push({key: 'version', value: data.paramMap[2].value})


  var sign = getSign(paramMap, data.token)

  console.log('sign: ', sign)

  var options = {
      method: 'POST',
      uri: 'https://sg-openapi.keruyun.com/open/v1/cater/dish/dishMenu',
      body: {
        "shopIdenty":810137674,
        "startId":1,
        "pageNum":1000
      },
      json:{
        "shopIdenty":810137674,
        "startId":1,
        "pageNum":1000
      },
      qs: {
        appKey: data.paramMap[0].value,
        shopIdenty: data.paramMap[1].value,
        version: data.paramMap[2].value,
        timestamp: unixTime, 
        sign: sign,
      },
    }
    return rp(options).then(body => {
      console.log(body)
      return body
    })
})

