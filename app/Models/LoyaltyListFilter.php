<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Helpers\NetsuiteApi;

class LoyaltyListFilter extends Model
{
    use HasFactory;
    protected $table = 'loyalty_list_filter';

    public static function getUserTier($year, $id_shop, $email)
    {
        $query = LoyaltyListFilter::where('year', $year)
            ->where('id_shop', $id_shop)
            ->where('email', 'like', '%'.$email.'%')
            ->get('tier');
        return $query;
    }

    public static function getLoyaltyList($year, $tier, $id_shop, $from, $to, $searchTerm, $sortColumn, $sortOrder)
    {
        $query = LoyaltyListFilter::query()->where('year', $year)
            ->where('tier', $tier)
            ->where('id_shop', $id_shop);
        if ($searchTerm) {
            $query->where(function ($subquery) use ($searchTerm) {
                $subquery->where('email', 'like', '%' . $searchTerm . '%')
                    ->orWhere('amount_prev', 'like', '%' . $searchTerm . '%')
                    ->orWhere('amount_now', 'like', '%' . $searchTerm . '%');
            });
        }
        $query->orderBy($sortColumn, $sortOrder);
        $result = $query->paginate($to);
        return $result;
    }

    public static function checkInsert($year, $tier, $id_shop, $data)
    {
        $result = LoyaltyListFilter::where('year', $year)
            ->where('tier', $tier)
            ->where('id_shop', $id_shop)
            ->delete();

        $result = LoyaltyListFilter::insert($data);
        return $result;
    }

    public static function getLastFetched($year, $tier, $id_shop, $data)
    {
        $result = LoyaltyListFilter::where('year', $year)
            ->where('tier', $tier)
            ->where('id_shop', $id_shop)
            ->first('created_at');
        return $result;
    }

    public static function getLoyaltyListForExport($year, $tier, $id_shop)
    {
        $result = LoyaltyListFilter::where('year', $year)
            ->where('tier', $tier)
            ->where('id_shop', $id_shop)
            ->get();

        $lists = [];
        foreach ($result as $list) {
            $content = json_decode($list->content);

            if ($list->tier == 3) {
                $tier_name = 'GOLD';
            } elseif ($list->tier == 2) {
                $tier_name = 'SILVER';
            } else {
                $tier_name = 'BRONZE';
            }

            $country = $content->country;
            if ($content->currency == 1) {
                if (!$content->country) {
                    $country = 'MY';
                }
                $currency_label = 'MYR';
            } else if ($content->currency == 5) {
                if (!$content->country) {
                    $country = 'SG';
                }
                $currency_label = 'SGD';
            } else if ($content->currency == 2) {
                if (!$content->country) {
                    $country = 'INTL';
                }
                $currency_label = 'USD';
            }
            array_push($lists,[
                'INTERNAL ID' => $list->id,
                'YEAR'        => $list->year,
                'EMAIL'       => $list->email,
                'NAME'        => $content->name,
                'COUNTRY'     => $country,
                'CURRENCY'    => $currency_label,
                'AMOUNT'      => $list->amount_now,
                'TIER'        => $tier_name,
            ]);
        }
        $collection = collect($lists);
        return $collection;
    }

    public static function getSilverAndGoldEmail($year, $id_shop)
    {
        // get silver and gold list
        $silver_and_gold_list = LoyaltyListFilter::where('year', $year)
            ->where('id_shop', $id_shop)
            ->whereIn('tier', [2, 3])
            ->get();

        $silver_and_gold_list_email = [];
        foreach ($silver_and_gold_list as $key => $value) {
            array_push($silver_and_gold_list_email, $value['email']);
        }
        return $silver_and_gold_list_email;
    }

    public static function getBronzeListCount($year, $id_shop)
    {
        $silver_and_gold_list_email = LoyaltyListFilter::getSilverAndGoldEmail($year, $id_shop);
        // customer id shop
        if ($id_shop == 7) {
            $cust_id_shop = 3;
        } else if ($id_shop == 6) {
            $cust_id_shop = 2;
        } else {
            $cust_id_shop = 1;
        }
        $bronze_list_count = Customer::select(DB::raw('COUNT(1) AS total'))->whereNotIn('email', $silver_and_gold_list_email)
            ->where('id_shop', $cust_id_shop)->first();
        return $bronze_list_count;
    }

    public static function deleteProcessBronzeData($year, $id_shop, $tier)
    {
        $result = LoyaltyListFilter::where('year', $year)
            ->where('tier', $tier)
            ->where('id_shop', $id_shop)
            ->delete();
        return $result;
    }

    public static function getProcessBronzeData($year, $id_shop, $offset)
    {
        $silver_and_gold_list_email = LoyaltyListFilter::getSilverAndGoldEmail($year, $id_shop);

        // customer id shop
        if ($id_shop == 7) {
            $cust_id_shop = 3;
        } else if ($id_shop == 6) {
            $cust_id_shop = 2;
        } else {
            $cust_id_shop = 1;
        }

        // get bronze list
        DB::enableQueryLog();
        // for ($i = 0; $i <= 400; $i = $i + 10) {
        // dump($i);
        $bronze_list = Customer::select(DB::raw('CONCAT(firstname, " ", lastname) AS name, email, ' . $year . ' AS year, ' . $id_shop . ' AS id_shop, 1 AS tier, 1 AS tier_prev, 1 AS tier_now, 0 AS amount_now, 0 AS amount_prev'))
            ->whereNotIn('email', $silver_and_gold_list_email)
            ->where('id_shop', $cust_id_shop)
            ->skip($offset * 1000)
            ->take(1000)
            ->get();
        // dump(DB::getRawQueryLog());
        $bronze_arr = [];
        foreach ($bronze_list as $key => $value) {
            if ($value->id_shop == 7) {
                $id_currency = 2;
            } else if ($value->id_shop == 6) {
                $id_currency = 5;
            } else {
                $id_currency = 1;
            }
            $bronze_arr[$key] = [
                'year'        => $year,
                'tier'        => $value->tier,
                'tier_now'    => $value->tier_now,
                'tier_prev'   => $value->tier_prev,
                'amount_now'  => $value->amount_now,
                'amount_prev' => $value->amount_prev,
                'email'       => $value->email,
                'id_shop'     => $value->id_shop,
                'content'     => json_encode([
                    'name'         => $value->name,
                    'shop'         => $value->id_shop,
                    'currency'     => $id_currency,
                    "shop"         => "1",
                    "type"         => "CustPymt",
                    "email"        => $value->email,
                    "country"      => "",
                    "formula"      => 0,
                    "currency"     => $id_currency,
                    "fxamount"     => 0,
                    "internalid"   => '',
                    "netamounttax" => 0,
                ]),

                'created_at'  => date('Y-m-d H:i:s'),
                'updated_at'  => date('Y-m-d H:i:s'),
            ];
            // dump($bronze_arr);
        }
        // dd($bronze_arr);
        $result = LoyaltyListFilter::insert($bronze_arr);
        // }

        return $bronze_list;
    }

    public static function getBronzeListForExport($year, $tier, $id_shop)
    {
        $loyaltylist = LoyaltyListFilter::where('year', $year)->where('tier', $tier)->where('id_shop', $id_shop)->cursor();
        $lists       = collect();
        foreach ($loyaltylist as $list) {
            $content = json_decode($list->content);

            if ($list->tier == 3) {
                $tier_name = 'GOLD';
            } elseif ($list->tier == 2) {
                $tier_name = 'SILVER';
            } else {
                $tier_name = 'BRONZE';
            }

            $country = $content->country;
            if ($content->currency == 1) {
                if (!$content->country) {
                    $country = 'MY';
                }
                $currency_label = 'MYR';
            } else if ($content->currency == 5) {
                if (!$content->country) {
                    $country = 'SG';
                }
                $currency_label = 'SGD';
            } else if ($content->currency == 2) {
                if (!$content->country) {
                    $country = 'INTL';
                }
                $currency_label = 'USD';
            }
            $lists = collect([
                'INTERNAL ID' => $list->id,
                'YEAR'        => $list->year,
                'EMAIL'       => $list->email,
                'NAME'        => $content->name,
                'COUNTRY'     => $country,
                'CURRENCY'    => $currency_label,
                'AMOUNT'      => $list->amount_now,
                'TIER'        => $tier_name,
            ]);
            yield $lists;
        }
    }

    public static function getLoyaltyByYear($id_customer, $id_shop, $year = null)
    {
        if ($year === null) {
            $year = date('Y'); 
        }

        $netsuite = new NetsuiteApi();
        return LoyaltyListFilter::where([
            ['year', '=', $year],
            ['email', '=', $id_customer],
            ['id_shop', '=', $netsuite->getShop($id_shop)],
        ])->first();
    }
}
