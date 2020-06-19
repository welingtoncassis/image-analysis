'use strict';

const { promises: {readFile} }= require('fs') // elimina o callback

class Handler {

  constructor({rekoSvc}) {
    this.rekoSvc = rekoSvc
  }

  async detectImagesLabels(buffer) {
    const result = await this.rekoSvc.detectLabels({
      Image: {
        Bytes: buffer
      }
    }).promise()

    const workingItems = result.Labels
      .filter(({Confidence})=> Confidence > 80);
    
    const names = workingItems
      .map(({Name}) => Name)
      .join(' and ')
    
    return { names, workingItems }
  }

  async main(event) {
    try {
      const imgBuffer = await readFile('./images/download.jpeg')
      const { names, workingItems } = await this.detectImagesLabels(imgBuffer)
      console.log(names, workingItems)
      return {
        statusCode: 200,
        body: 'Hello!'
      }
    } catch (error) {
      console.log('Error***', error.stack)
      return {
        statusCode: 500,
        body: 'Internal server error'
      }
    }
  }

}

const aws = require('aws-sdk')
const reko = new aws.Rekognition()

//factory
const handler = new Handler({
  rekoSvc : reko
})

module.exports.main = handler.main.bind(handler)
