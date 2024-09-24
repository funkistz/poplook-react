<?php

namespace App\Helpers;

use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Http;

class NetsuiteApi
{
    // PRODUCTION CREDENTIALS
    const NETSUITE_CONSUMER_KEY    = '8703e552bd1cabfb364f0bed8092fbf66dcacc7e3608af36ee67b4a32041b274';
    const NETSUITE_ACCOUNT         = '4809454';
        const NETSUITE_CONSUMER_SECRET = '4dd7138e00d26380f474cb09e4abd7bf65764ed3d94c5f95c68214de390348a3';
        const NETSUITE_TOKEN_ID        = '9499564886a07304ad6b011bb23cc0c8e2134aa8a1c90c5e723df843a6c810c1';
    const NETSUITE_TOKEN_SECRET    = 'f716958df27c85a6b8e67f2809159438fd4d1f46d09d892b993b2abe112e4cb3';


    public static function callRestApi($url, $method = 'GET', $data = null, $json = false)
    {

        $oauth_nonce            = md5(mt_rand());
            $oauth_timestamp        = time();
        $oauth_signature_method = 'HMAC-SHA256';
        $oauth_version          = "1.0";

        // generate Signature
        $baseString = self::restletBaseString($method,
            $url,
            self::NETSUITE_CONSUMER_KEY,
            self::NETSUITE_TOKEN_ID,
            $oauth_nonce,
            $oauth_timestamp,
            $oauth_version,
            $oauth_signature_method, null);

        $key = rawurlencode(self::NETSUITE_CONSUMER_SECRET) . '&' . rawurlencode(self::NETSUITE_TOKEN_SECRET);

        $signature = base64_encode(hash_hmac('sha256', $baseString, $key, true));

        // GENERATE HEADER TO PASS IN CURL
        $header = 'Authorization: OAuth '
        . 'realm="' . rawurlencode(self::NETSUITE_ACCOUNT) . '", '
        . 'oauth_consumer_key="' . rawurlencode(self::NETSUITE_CONSUMER_KEY) . '", '
        . 'oauth_token="' . rawurlencode(self::NETSUITE_TOKEN_ID) . '", '
        . 'oauth_nonce="' . rawurlencode($oauth_nonce) . '", '
        . 'oauth_timestamp="' . rawurlencode($oauth_timestamp) . '", '
        . 'oauth_signature_method="' . rawurlencode($oauth_signature_method) . '", '
        . 'oauth_version="' . rawurlencode($oauth_version) . '", '
        . 'oauth_signature="' . rawurlencode($signature) . '"';

//        dd($header);

        return self::callCurl($header, $method, $url, $data);

    }

    public static function callCurl($header, $method, $url, $data)
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL            => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => "",
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_CUSTOMREQUEST  => $method,
            CURLOPT_HTTPHEADER     => array(
                $header,
                "content-type: application/json",
            ),

        ));

        if ($data !== null) {
            // curl_setopt($ch, CURLOPT_POST, 1)
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        }

        $response = curl_exec($curl);

        curl_close($curl);

        $product = json_decode($response, true);
        return $product;
    }

    public static function restletBaseString($httpMethod, $url, $consumerKey, $tokenKey, $nonce, $timestamp, $version, $signatureMethod, $postParams)
    {
        //http method must be upper case
        $baseString = strtoupper($httpMethod) . '&';

        //include url without parameters, schema and hostname must be lower case
        if (strpos($url, '?')) {
            $baseUrl   = substr($url, 0, strpos($url, '?'));
            $getParams = substr($url, strpos($url, '?') + 1);
        } else {
            $baseUrl   = $url;
            $getParams = "";
        }
        $hostname = strtolower(substr($baseUrl, 0, strpos($baseUrl, '/', 10)));
        $path     = substr($baseUrl, strpos($baseUrl, '/', 10));
        $baseUrl  = $hostname . $path;
        $baseString .= rawurlencode($baseUrl) . '&';

        //all oauth and get params. First they are decoded, next alphabetically sorted, next each key and values is encoded and finally whole parameters are encoded
        $params                           = array();
        $params['oauth_consumer_key']     = array($consumerKey);
        $params['oauth_token']            = array($tokenKey);
        $params['oauth_nonce']            = array($nonce);
        $params['oauth_timestamp']        = array($timestamp);
        $params['oauth_signature_method'] = array($signatureMethod);
        $params['oauth_version']          = array($version);

        foreach (explode('&', $getParams . "&" . $postParams) as $param) {
            $parsed = explode('=', $param);
            if ($parsed[0] != "") {
                $value = isset($parsed[1]) ? urldecode($parsed[1]) : "";
                if (isset($params[urldecode($parsed[0])])) {
                    array_push($params[urldecode($parsed[0])], $value);
                } else {
                    $params[urldecode($parsed[0])] = array($value);
                }
            }
        }

        //all parameters must be alphabetically sorted
        ksort($params);

        $paramString = "";
        foreach ($params as $key => $valueArray) {
            //all values must be alphabetically sorted
            sort($valueArray);
            foreach ($valueArray as $value) {
                $paramString .= rawurlencode($key) . '=' . rawurlencode($value) . '&';
            }
        }
        $paramString = substr($paramString, 0, -1);
        $baseString .= rawurlencode($paramString);

        return $baseString;
    }

    public static function getShop($shop)
    {
        if($shop == 2) { // Sgd
            return 6;
        } else if($shop == 3) { // Usd
            return 7;
        } else {
            return 5; // Myr
        }
    }
}
