'use strict';

/**
 * This lambda function returns a policy document and signature that can be used to
 * upload an object directly to S3 from a website. It also returns a unique name that can
 * be used as key for S3.
 * 
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  27 Jul. 2015
 */

// module dependencies
var crypto = require('crypto'),
    moment = require('moment');

// Load the aws config file
var aws = require('./aws.json');

/**
 * Main entrypoint of the service.
 * 
 * @param {object}  event       The data regarding the event.
 * @param {object}  context     The AWS Lambda execution context.
 */
exports.handler = function(event, context) {
    // Calculate the expiration date
    var expiration = moment().add(30, 'minutes');
    
    // Create the policy document
    var policy = {
        expiration: expiration.format('YYYY-MM-DD[T]HH:mm:ss[Z]'),
        conditions: [
            { bucket: 'app-selfies'},
            { acl: 'private' },
            ['starts-with', '$filename', ''],
            ['starts-with', '$key', ''],
            ['starts-with', '$Content-Type', ''],
            ['content-length-range', 0, 1048576]
        ]
    };
    
    // Convert the policy to a base64 string
    var base64Policy = new Buffer(JSON.stringify(policy)).toString('base64');
    
    // Calculate the signature of the base64 string
    var signature = crypto.createHmac('sha1', aws.AWS_SECRET_ACCESS_KEY);
    signature.update(base64Policy);
    signature = signature.digest('base64');
    
    // Return the json object
    context.succeed({
        policy: base64Policy,
        signature: signature,
        key: context.awsRequestId
    });
};