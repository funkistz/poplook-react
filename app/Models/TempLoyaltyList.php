<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class TempLoyaltyList extends Model
{
    use HasFactory;
    protected $table = 'temp_loyalty_list';

    public static function checkDup($curr_year, $prev_year, $tier, $prev_tier, $id_shop)
    {
        // $temp_loyalty_list = TempLoyaltyList::all();
        // $temp_loyalty_list = DB::select('SELECT *, count(1) as dup, (SELECT tier FROM temp_loyalty_list AS tll2 ORDER BY tier DESC LIMIT 1) AS highest_tier
        // from temp_loyalty_list AS tll1
        // group by email');
        $temp_loyalty_list = DB::select('SELECT *
        FROM temp_loyalty_list
        WHERE year IN (' . $curr_year . ',' . $prev_year . ')
        AND tier IN (' . $tier . ',' . $prev_tier . ')
        AND id_shop = ' . $id_shop . '
        ');

        $arr = array();
        foreach ($temp_loyalty_list as $key => $item) {
            $arr[$item->email][$item->year] = $item;
        }
        // dd($arr);

        $default_arr = [];
        foreach ($arr as $key => $value) {
            $amount_now  = '0';
            $amount_prev = '0';
            // current year
            if (!empty($value[$curr_year])) {
                if ($value[$curr_year]->id_shop == 6 || $value[$curr_year]->id_shop == 7) {
                    $content    = json_decode($value[$curr_year]->content);
                    $amount_now = $content->fxamount;
                } else {
                    $content    = json_decode($value[$curr_year]->content);
                    $amount_now = $content->netamounttax;
                }

                // highest tier
                if (!empty($value[$prev_year])) {
                    if ($value[$curr_year]->tier > $value[$prev_year]->tier) {
                        $highest_tier = $value[$curr_year]->tier;
                    } else {
                        $highest_tier = $value[$prev_year]->tier;
                    }
                } else {
                    $highest_tier = $value[$curr_year]->tier;
                }
            }
            // last year
            if (!empty($value[$prev_year])) {
                if ($value[$prev_year]->id_shop == 6 || $value[$prev_year]->id_shop == 7) {
                    $content     = json_decode($value[$prev_year]->content);
                    $amount_prev = $content->fxamount;
                } else {
                    $content     = json_decode($value[$prev_year]->content);
                    $amount_prev = $content->netamounttax;
                }
                // highest tier
                if (!empty($value[$curr_year])) {
                    if ($value[$curr_year]->tier > $value[$prev_year]->tier) {
                        $highest_tier = $value[$curr_year]->tier;
                    } else {
                        $highest_tier = $value[$prev_year]->tier;
                    }
                } else {
                    $highest_tier = $value[$prev_year]->tier;
                }
            }
            if ($highest_tier == $tier) {
                # code...
                $default_arr[$key] = [
                    'year'        => $curr_year,
                    'tier'        => $highest_tier,
                    'tier_now'    => (!empty($value[$curr_year]->tier)) ? $value[$curr_year]->tier : 1,
                    'tier_prev'   => (!empty($value[$prev_year]->tier)) ? $value[$prev_year]->tier : 1,
                    'amount_now'  => $amount_now,
                    'amount_prev' => $amount_prev,
                    'content'     => (!empty($value[$curr_year]->content)) ? $value[$curr_year]->content : $value[$prev_year]->content,
                    'email'       => $key,
                    'id_shop'     => (!empty($value[$curr_year]->id_shop)) ? $value[$curr_year]->id_shop : $value[$prev_year]->id_shop,
                    'created_at'  => date('Y-m-d H:i:s'),
                    'updated_at'  => date('Y-m-d H:i:s'),
                ];
            }

            // array_push($new_arr, $default_arr);
        }
        // dd($new_arr);

        // ksort($arr, SORT_NUMERIC);

        return $default_arr;
    }

    public static function deleteTempLoyaltyList($year, $id_shop, $tier){
        $result = TempLoyaltyList::where('year', $year)
        ->where('id_shop', $id_shop)
        ->where('tier', $tier)
        ->delete();
        return $result;
    }
}
