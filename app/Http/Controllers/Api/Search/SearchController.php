<?php

namespace App\Http\Controllers\Api\Search;

use App\Http\Controllers\Controller;
use App\Models\CurrencyShop;
use App\Models\Search\KeywordAnalytic;
use App\Models\Search\QueryAnalytic;
use App\Models\Search\SearchPlaceholder;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Arr;
use Illuminate\Support\Number;

class SearchController extends Controller
{
    public function instant(Request $request)
    {
        $products = Product::search($request->q)->query(fn ($query) => $query->with(['productLang', 'stock', 'productImage'])->where([
            ['id_shop_default', '=', $request->id_shop],
        ]))->get();

        $que = $this->storeSearchQuery($request->q, $request->id_shop, $request->ip());

        $response = [
            "keywords" => [],
            "products" => [],
            "suggestion" => []
        ];

        $currency = CurrencyShop::where('id_shop', '=', $request->id_shop)->first();

        foreach($products as $product)
        {

            if($product->stock !== null)
            {
                $key = explode("-", $product->productLang->name);


                if(!in_array($key[0], $response['keywords']))
                {
                    array_push($response['keywords'], $key[0]);
                    $this->storeSearchKeywordAnalytics($key[0], $request->id_shop, $que, $request->ip());
                }

                if($product->stock->quantity >= 1)
                {
                    $p = $product->productLang;

                    $conv_price = Number::format($currency->currency->conversion_rate, precision:2) * Number::format($product->price, precision:2);

                    $data = [
                        'id_product' => $product->id_product,
                        'col_default_id' => $product->id_product,
                        'name' => $p->name,
                        "price" => Number::format($conv_price, precision:2),
                        "price_tax_exc"=> Number::format($conv_price, precision:2),
                        "price_without_reduction"=> Number::format($conv_price, precision:2),
                        "quantity" => $product->stock->quantity,
                        'link_rewrite' => $p->link_rewrite,
                        'collection_name' => $product->category->categoriesLang->name,
                        'collection_name_link_rewrite' => $product->category->categoriesLang->link_rewrite,
                        'image_url' => count($product->productImage) !== 0 ? [
                            "https://poplook.com/".$product->id_product."-".$product->productImage[0]->id_image.'-home_default/'.$p->link_rewrite.".jpg"
                        ] : null

                    ];

                    count($response['products']) < 4 ? array_push($response['products'], $data) : '';

                }
            }


        }

        return response()->json($response, 200);
    }

    public function storeSearchQuery($query, $shop, $ip)
    {

        //wip
        $searches = [];

        $que = QueryAnalytic::where('search_query', $query)->first();

        if(empty($que))
        {
            $today = Carbon::now()->format('d-m-Y');

            Arr::set($searches, $today, [
                'shop_id' => $shop,
                'search' => 1,
                'logs' => [$ip]
            ]);

            $nque = QueryAnalytic::create([
               'search_query' => $query,
               'searches' => $searches
            ]);

            return $nque->id;
        }else{

        }

    }

    public function storeSearchKeywordAnalytics($keyword, $shop, $q, $ip)
    {
        //wip
        $searches = [];

        $key = KeywordAnalytic::where('keyword', $keyword)->first();

        if (empty($key))
        {
            $today = Carbon::now()->format('d-m-Y');

            Arr::set($searches, $today, [
                'shop_id' => $shop,
                'search' => 1,
                'logs' => [$ip]
            ]);

            $nkey = KeywordAnalytic::create([
                'keyword' => $keyword,
                'clicks' => [],
                'searches' => $searches,
                'query_analytic_id' => $q
            ]);
        }else{


        }
    }

    public function searchPlaceholder()
    {
        $schedule = SearchPlaceholder::where('schedule','=',Carbon::now()->format('Y-m-d H:i:s'))->first();

        if (!empty($schedule))
        {
            $disable = SearchPlaceholder::where('is_active', true)->first()->update([
                'is_active' => false
            ]);

            $up = $schedule->update([
                'is_active' => true
            ]);

            $search = $schedule->placholder;
        }else{
            $placeholder = SearchPlaceholder::where('is_active', true)->first();

            if (!empty($placeholder))
            {
                $search = $placeholder->placeholder;
            }else{
                $search = 'Search';
            }
        }

        return response()->json([
           'placeholder' => $search
        ]);
    }

    public function searchResult(Request $request)
    {
        $products = Product::search($request->q)->query(fn ($query) => $query->with(['productLang', 'stock', 'productImage']))->paginate();


        $response = [
            "products" => [],
        ];

        $currency = CurrencyShop::where('id_shop', '=', $request->id_shop)->first();
        foreach($products as $product)
        {

//            dd($product->getLink);
//            exit();

            if($product->stock !== null)
            {
                $key = explode("-", $product->productLang->name);

                if($product->stock->quantity >= 1)
                {
                    $p = $product->productLang;
                    $conv_price = Number::format($currency->currency->conversion_rate, precision:2) * Number::format($product->price, precision:2);

                        $data = [
                        'id_product' => $product->id_product,
                        'col_default_id' => $product->id_product,
                        'name' => $p->name,
                        "price" => Number::format($conv_price, precision:2),
                        "price_tax_exc"=> Number::format($conv_price, precision:2),
                        "price_without_reduction"=> Number::format($conv_price, precision:2),
                        "quantity" => $product->stock->quantity,
                        'link_rewrite' => $p->link_rewrite,
                        'collection_name' => $product->category->categoriesLang->name,
                        'collection_name_link_rewrite' => $product->category->categoriesLang->link_rewrite,
                        'image_url' => count($product->productImage) !== 0 ? [
                            "https://poplook.com/".$product->id_product."-".$product->productImage[0]->id_image.'-home_default/'.$p->link_rewrite.".jpg"
                        ] : null

                    ];

                    array_push($response['products'], $data);
                }
            }


        }


        $json = [
           'action' => 'Product_search',
           'data' => [
                 'total' => count($response['products']),
                  'result' => $response['products'],
                 'base' => 'keywords',
                 'pagination' => [
                     'total_items' => count($response['products']),
                     'limit_perpage' => $products['per_page'],
                     'first_page_url' => $products['first_page_url'],
                     'last_page_url' => $products['last_page_url'],
                     'current_page' => $products['from'],
                     'last_page' => $products['last_page']
                 ],
               'currency' => [
                   'id' => $currency->currency->id,
                   'name' => $currency->currency->name,
                   "iso_code"=> $currency->currency->iso_code,
                    "iso_code_num"=> $currency->currency->iso_code_num,
                    "sign"=> $currency->currency->sign,
                    "blank"=> $currency->currency->blank,
                    "format"=> $currency->currency->format,
                    "decimals"=> $currency->currency->decimals,
                    "conversion_rate"=> $currency->currency->conversion_rate,
                    "deleted"=> $currency->currency->deleted,
                    "active"=> $currency->currency->active,
                   "prefix"=> $currency->currency->sign,
               ]
           ],
           'status'  => true,
            'code' => 200,
            'message' => 'Success'
        ];

        return response()->json($json, 200);
    }
}
