<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Http;

class ApiHelper
{
    public static $domain;
    public static $endpoint;
    public static $full_enpoint;

    public static function injectParams($params)
    {
        $params['apikey'] = env("API_KEY");

        return $params;
    }

    public static function getDomain($params)
    {
        self::$domain =  env("API_DOMAIN");

        if (!empty($params['api_url'])) {
            return $params['api_url'];
        }

        if(!empty($params['module'])) {
            return 'https://dev3.poplook.com/modules/';
        }

        if (!empty($params['dev'])) {
            return env("API_URL_DEV");
        } else {
            return env("API_URL");
        }
    }

    public static function setDomain($params){
        if(empty(self::$domain)){
            self::$domain =  env("API_DOMAIN");
        }
    }

    public static function setEndpoint($params){
        if(empty(self::$endpoint)){
            self::$endpoint =  env("API_ENDPOINT");
        }
    }

    public static function getURL($params){
        self::setDomain($params);
        self::setEndpoint($params);

        self::$full_enpoint =  self::$domain .  self::$endpoint;
        return self::$full_enpoint;
    }

    public static function moduleApi(){
        static::$endpoint = 'modules/';
        return new static;
    }

    public static function dev3(){
        static::$domain = 'https://dev3.poplook.com/';
        return new static;
    }

    public static function useDomain(string $domain){
        static::$domain = 'https://' . $domain .'/';
        return new static;
    }

    public static function get($url, $params = null)
    {
        self::getURL($params);

        $response = Http::withoutVerifying()->get(self::$full_enpoint . $url, self::injectParams($params));

        $response = $response->json();

        if (!empty($response) && $response['status']) {
            return $response;
        } else {
            $response['code'] = 404;
        }

        return $response;
    }

    public static function post($url, $params = null)
    {

        self::getURL($params);

        $response = Http::withoutVerifying()->asForm()->post(self::$full_enpoint . $url , self::injectParams($params));
        $response = $response->json();

        if ($response['status']) {
            return $response;
        } else {
            $response['code'] = 404;
        }

        return $response;
    }

    public static function put($url, $params = null)
    {
        self::getURL($params);
        $response = Http::withoutVerifying()->asForm()->put(self::getDomain($params) . $url, self::injectParams($params));
        $response = $response->json();

        if ($response['status']) {
            return $response;
        } else {
            $response['code'] = 404;
        }

        return $response;
    }

    public static function delete($url, $params = null)
    {
        self::getURL($params);
        $response = Http::withoutVerifying()->asForm()->delete(self::$full_enpoint . $url, self::injectParams($params));
        $response = $response->json();

        if ($response['status']) {
            return $response;
        } else {
            $response['code'] = 404;
        }

        return $response;
    }
}
