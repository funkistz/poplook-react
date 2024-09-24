<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Outlet extends Model
{
    use HasFactory, SoftDeletes;
    protected $table      = 'outlet';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'name',
        'image',
        'imgHover',
        'address',
        'link',
        'phone',
        'status',
        'position',
        'email',
    ];

    public function updatePosition($new_position)
    {
        if ($new_position != $this->position && $new_position > 0) {

            if ($this->position > $new_position) {
                $vacancy_after_position = Outlet::where([
                    ['position', '<', $this->position],
                    ['position', '>=', $new_position],
                    ['id', '!=', $this->id]
                ])->get();

                if ($vacancy_after_position) {
                    foreach ($vacancy_after_position as $key => $banner_after_position) {
                        $banner_after_position->position++;
                        $banner_after_position->save();
                    }
                }
            } else {
                $vacancy_after_position = Outlet::where([
                    ['position', '<=', $new_position],
                    ['position', '>', $this->position],
                    ['id', '!=', $this->id]
                ])->get();

                if ($vacancy_after_position) {
                    foreach ($vacancy_after_position as $key => $banner_after_position) {
                        $banner_after_position->position--;
                        $banner_after_position->save();
                    }
                }
            }

            $this->position = $new_position;
            $this->save();
        }
    }

    public static function listOutlet()
    {
        $categories = Outlet::orderBy('position', 'ASC')->get();

        $cat = [];
        foreach ($categories as $key => $value) {
            $cat[$key]['label'] = strtoupper($value->name);
            $cat[$key]['value'] = $value->id;
        }
        $collection = collect(
            $cat,
        );

        return $collection;
    }

    public static function getOutlet($data)
    {
        $query = Outlet::where(DB::Raw('1 = 1'));
        if ($data->email) {
            $query->orWhere('email', $data->email);
        }
        $result = $query->first();
        return $result;
    }
}
