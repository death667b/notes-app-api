/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
/* eslint max-len: ["error", 100]*/

import SHA256 from 'crypto-js/sha256';
import encHex from 'crypto-js/enc-hex';
import HmacSHA256 from 'crypto-js/hmac-sha256';

const sigV4Client = {};
sigV4Client.newClient = (config) => {
    const AWS_SHA_256 = 'AWS4-HMAC-SHA256';
    const AWS4_REQUEST = 'aws4_request';
    const AWS4 = 'AWS4';
    const X_AMZ_DATE = 'x_amz_date';
    const X_AMZ_SECURITY_TOKEN = 'x_amz_security_token';
    const HOST = 'host';
    const AUTHORIZATION = 'Authorization';

    hash = (value) => {
        return SHA256(value); // eslint-disable-line
    }

    hexEncode = (value) => {
        return value.toString(encHex);
    }

    hmac = (secret, value) => {
        return HmacSHA256(value, secret, {asBytes: true}); // eslint-disable-line
    }

    buildCanonicalRequest = (method, path, queryParams, headers, payload) => {
        return (
            method + '\n' +
            buildCanonicalUri(path) + '\n' +
            buildCanonicalQueryString(queryParams) + '\n' +
            buildCanonicalHeaders(headers) + '\n' +
            buildCanonicalSignedHeaders(headers) + '\n' +
            hexEncode(hash(payload))
        );
    }

    hashCanonicalRequest = (request) => {
        return hexEncode(hash(request));
    }

    buildCanonicalUri = (Uri) => {
        return encodeURI(Uri);
    }

    buildCanonicalQueryString = (queryParams) => {
        if (Object.keys(queryParams).length < 1) return '';
        let canonicalQueryString = '';
        let sortedQueryParams = [];

        for (let property in queryParams) {
            if (queryParams.hasOwnProperty(property)) {
                sortedQueryParams.push(property);
            }
        }
        sortedQueryParams.sort();

        for (let i = 0; i < sortedQueryParams.length; i++) {
            canonicalQueryString +=
                sortedQueryParams[i] +
                '=' +
                encodeURIComponent(queryParams[sortedQueryParams[i]]) +
                '&';
         }
         return canonicalQueryString.substr(0, canonicalQueryString.length - 1);
    }

    buildCanonicalHeaders = (headers) => {
        let canonicalHeaders = '';
        let sortedKeys = [];
        for (let property in headers) {
            if(headers.hasOwnProperty(property)) {
                sortedKeys.push(property);
            }
        }
        sortedKeys.sort();

        for (let i = 0; i < sortedKeys.length; i++) {
            canonicalHeaders += 
                sortedKeys[i].toLowerCase() + ":" +
                headers[sortedKeys[i]] + '\n';
        }
        return canonicalHeaders;
    }
}