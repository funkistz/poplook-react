<?php

namespace App\Helpers;

use App\Models\Categories;

class BannerData
{

    public function get($banner, $shop_id, $categoryId = -1)
    {
        $shop = 'myr';
        switch ($shop_id) {
            case 2:
                $shop = 'sgd';
                break;
            case 3:
                $shop = 'usd';
                break;
        }

        $new_banner = json_decode(json_encode($banner));

        if ($banner) {
            $new_banner->data = json_decode($new_banner->data);
            foreach ($new_banner->data as $key => $data) {
                // dd($data);

                // Checking for Top Banner only
                if (empty($data->categoryId)) { // CategoryId Not Found
                    $this->processData($data, $shop, $shop_id);
                } else {
                    if (!empty($categoryId) && in_array($categoryId, $data->categoryId)) {
                        $this->processData($data, $shop, $shop_id);
                    } else {
                        unset($new_banner->data[$key]);
                    }
                }
            }
        }

        return $new_banner;
    }

    public function processData($data, $shop, $shop_id)
    {
        if (isset($data->shops) && is_array($data->shops)) {
            if (in_array($shop, $data->shops)) {
                if ($data->children) {
                    foreach ($data->children as $key2 => $child) {
                        if (isset($child->shops) && is_array($child->shops)) {
                            if (in_array($shop, $child->shops)) {
                                if ($child->block && $child->block->resource) {
                                    if (!is_array($child->block->resource)) {
                                        $child->block->resource = $child->block->resource->{$shop};
                                    } else {
                                        $temp = [];
                                        foreach ($child->block->resource as $key3 => $resource) {
                                            array_push($temp, $resource->{$shop});
                                            $resource = $resource->{$shop};
                                        }
                                        $child->block->resource = $temp;
                                        // product list slider
                                        if ($child->block->type == 'product_list') {
                                            $productlistdata = [];
                                            if (!empty($child->block->category)) {
                                                $productlistdata        = $this->productListData($child, $resource, $shop_id);
                                                $child->block->resource = $productlistdata;
                                            }
                                        } else {
                                            $child->block->resource = $temp;
                                        }
                                    }
                                }
                            } else {
                                $child->block = [];
                            }
                        } else {
                            $child->block = [];
                        }
                    }
                }
            } else {
                $data->children = [];
            }
        } else {
            $data->children = [];
        }

        return $data;
    }

    public function productListData($child, $resource, $shop_id)
    {
        # code...
        $param['cat_name']     = Categories::find($child->block->category->id)->categoriesLang[0];
        $param['category']     = $child->block->category->id;
        $param['num_page']     = (!empty($child->block->numPage)) ? $child->block->numPage : 0;
        $param['num_list']     = (!empty($child->block->numList)) ? $child->block->numList : 0;
        $param['sort_options'] = (!empty($child->block->sortOption)) ? $child->block->sortOption : 0;
        $param['shop']         = $shop_id;
        $response              = ApiService::get('Products/filterCategoryProducts', $param);
        $product_list_array    = [];
        $size                  = 13;
        $bold                  = 400;
        $textDecoration        = 'none';
        $color                 = '#000';
        $align                 = 'left';
        $transform             = 'none';
        $fontFamily            = 'null';
        $fontStyle             = 'normal';
        $letterSpacing         = 'normal';
        foreach ($response['data']['products'] as $product_list_key => $val) {
            $product_list_array[] = clone $resource;
        }
        if ($child->block->labelResourceObj) {
            # code...
            if ($child->block->labelResourceObj->size) {
                # code...
                $size = $child->block->labelResourceObj->size;
            }
            if ($child->block->labelResourceObj->bold) {
                # code...
                $bold = $child->block->labelResourceObj->bold;
            }
            if ($child->block->labelResourceObj->textDecoration) {
                # code...
                $textDecoration = $child->block->labelResourceObj->textDecoration;
            }
            if ($child->block->labelResourceObj->color) {
                # code...
                $color = $child->block->labelResourceObj->color;
            }
            if ($child->block->labelResourceObj->align) {
                # code...
                $align = $child->block->labelResourceObj->align;
            }
            if ($child->block->labelResourceObj->transform) {
                # code...
                $transform = $child->block->labelResourceObj->transform;
            }
            if ($child->block->labelResourceObj->fontFamily) {
                # code...
                $fontFamily = $child->block->labelResourceObj->fontFamily;
            }
            if ($child->block->labelResourceObj->fontStyle) {
                # code...
                $fontStyle = $child->block->labelResourceObj->fontStyle;
            }
            if ($child->block->labelResourceObj->letterSpacing) {
                # code...
                $letterSpacing = $child->block->labelResourceObj->letterSpacing;
            }
        }
        foreach ($product_list_array as $list_key => $value) {
            $value->labelObj                 = clone $resource->labelObj;
            $value->nameObj                 = clone $resource->labelObj;
            $value->priceObj                 = clone $resource->labelObj;
            $value->linkData                 = clone $resource->linkData;
            $value->type                     = 'image';
            $value->href                     = (!empty($response['data']['products'][$list_key]['image_url'][0])) ? $response['data']['products'][$list_key]['image_url'][0] : '';
            $value->hoverHrefUrl             = (!empty($response['data']['products'][$list_key]['image_url'][1])) ? $response['data']['products'][$list_key]['image_url'][1] : '';
            $value->isHoverHref              = true;
            $value->internalLink             = false;
            $value->categoryId               = (int) $param['category'];
            $value->link                     = $response['data']['products'][$list_key]['link'];
            $value->linkData->type           = 'product';
            $value->linkData->id             = (int) $response['data']['products'][$list_key]['id_product'];
            $value->linkData->name           = $response['data']['products'][$list_key]['name'];
            $value->labelObj->content        = '<p>' . $response['data']['products'][$list_key]['name'] . '<br/>' . $response['data']['currency']['sign'] . ' ' . $response['data']['products'][$list_key]['price_tax_inc'] . '</p>';
            $value->labelObj->size           = $size;
            $value->labelObj->bold           = $bold;
            $value->labelObj->textDecoration = $textDecoration;
            $value->labelObj->color          = $color;
            $value->labelObj->align          = $align;
            $value->labelObj->transform      = $transform;
            $value->labelObj->fontFamily     = $fontFamily;
            $value->labelObj->fontStyle      = $fontStyle;
            $value->labelObj->letterSpacing  = $letterSpacing;

            $value->nameObj->content        = $response['data']['products'][$list_key]['name'];
            $value->nameObj->size           = $size;
            $value->nameObj->bold           = $bold;
            $value->nameObj->textDecoration = $textDecoration;
            $value->nameObj->color          = $color;
            $value->nameObj->align          = $align;
            $value->nameObj->transform      = $transform;
            $value->nameObj->fontFamily     = $fontFamily;
            $value->nameObj->fontStyle      = $fontStyle;
            $value->nameObj->letterSpacing  = $letterSpacing;

            $value->priceObj->content        = $response['data']['currency']['sign'] . ' ' . $response['data']['products'][$list_key]['price_tax_inc'];
            $value->priceObj->size           = $size;
            $value->priceObj->bold           = $bold;
            $value->priceObj->textDecoration = $textDecoration;
            $value->priceObj->color          = $color;
            $value->priceObj->align          = $align;
            $value->priceObj->transform      = $transform;
            $value->priceObj->fontFamily     = $fontFamily;
            $value->priceObj->fontStyle      = $fontStyle;
            $value->priceObj->letterSpacing  = $letterSpacing;
        }

        return $product_list_array;
    }
}
