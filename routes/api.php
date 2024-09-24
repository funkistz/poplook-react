<?php

use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CartRuleController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CMSController;
// use App\Http\Controllers\HomeBannerController;
use App\Http\Controllers\Api\CountdownBannerController;
use App\Http\Controllers\Api\CustomerController as CustomerControllerAPI;
use App\Http\Controllers\Api\CustomPageController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ExitIntentBannerController;
use App\Http\Controllers\Api\FooterBannerController;
use App\Http\Controllers\Api\HomeBannerController;
use App\Http\Controllers\Api\HomeTopMenuController;
use App\Http\Controllers\Api\InfosController;
use App\Http\Controllers\Api\LogoController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\OutletController;
use App\Http\Controllers\Api\StoreCreditController;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\Api\TopBannerController;
use App\Http\Controllers\Api\VoucherController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\Marketing\EmailCampaignController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SeoController;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
 */
//test

//Route::get("trck/link/{id}",[\App\Http\Controllers\Marketing\EmailCampaignController::class, 'linkMasking'])->name('tracking.link');

//sns testing
Route::post('sns/notifications', [\App\Http\Controllers\Marketing\Notification\SNSController::class, 'notifications']);

Route::post('/design/', [\App\Http\Controllers\Marketing\Email\EmailDesignController::class, 'upload']);

Route::get('test_loyalty', [TestController::class, 'testLoyalty'])->name('test.test_loyalty');

Route::post('generateToken', [AuthController::class, 'generateToken'])->name('generateToken');

Route::get('/db', function (Request $request) {
    $databaseName = DB::connection()->getDatabaseName();

    dd($databaseName);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('testcache', function () {
    return Cache::remember('users', 60, function () {
        return 'User::all()';
    });
});

Route::post("notification/test", function (Request $request){

    $fb = new \App\Services\Firebase\FirebaseService();

    return $fb->notificationTest($request->token, $request->url);
});

//end test

Route::get('order/getTotalOrderByMonth', [OrderController::class, 'getTotalOrderByMonth'])->name('order.getTotalOrderByMonth');
Route::get('order/getTotalSaleByMonth', [OrderController::class, 'getTotalSaleByMonth'])->name('order.getTotalSaleByMonth');
Route::get('order/getWeekSale', [OrderController::class, 'getWeekSale'])->name('order.getWeekSale');
Route::get('order/getRecentOrder', [OrderController::class, 'getRecentOrder'])->name('order.getRecentOrder');
Route::get('customer/getTotalUserByMonth', [CustomerControllerAPI::class, 'getTotalUserByMonth'])->name('customer.getTotalUserByMonth');
Route::get('order/getOrdersUser/{id}', [OrderController::class, 'getOrdersUser'])->name('order.getOrdersUser');
Route::get('cart_rule/getVoucherByUser/{id}', [CartRuleController::class, 'getVoucherByUser'])->name('order.getVoucherByUser');

Route::middleware('auth:sanctum')->group(function () {
    Route::controller(CustomerController::class)->group(function () {
        Route::get('customer/check_connection', 'check_connection');
    });
    Route::apiResource('customer', CustomerController::class);
    Route::apiResource('address', AddressController::class);

    // Route::get('product/category/id/{id}/shop/{id_shop}/num_page/{page}/num_list/{max}/sort_options/{order}/full/1', [ProductController::class, 'category'])->name('product.category');
    Route::controller(OrderController::class)->group(function () {
        Route::get('order/order_history/customer/{id}/n/{$total_item}/p/1', 'order_history');
        Route::get('order/order_step_1', 'order_step_1');
        Route::get('order/order_step_2', 'order_step_2');
        Route::get('order/order_step_3', 'order_step_3');
        Route::get('order/order_step_4', 'order_step_4');
        Route::get('order/order_step_4', 'order_step_4');
    });
    Route::apiResource('order', OrderController::class);
});

Route::apiResource('seo/{id}/lang/{id_lang}/shop/{id_shop}/id_cms_category', SeoController::class);
Route::apiResource('menu/{menu}/lang/{id_lang}/shop/{id_shop}/user_tier', MenuController::class);
Route::controller(BannerController::class)->group(function () {
    Route::get('banner/poplook_app_banner', 'lookbook');
});

Route::apiResource('banner', BannerController::class);
Route::apiResource('forgot_password', ForgotPasswordController::class);

// Route::get('product/category/id/{id}/shop/{id_shop}/num_page/{page}/num_list/{max}/sort_options/{order}/full/1', [ProductController::class, 'category'])->name('product.category');
Route::controller(ProductController::class)->group(function () {
    Route::get('product/category/id/{id}/shop/{id_shop}/num_page/{page}/num_list/{max}/sort_options/{order}/full/1', 'category');
    Route::get('product/view/id/{id}/shop/{id_shop}/lang/{id_lang}/full/1', 'view');
});
Route::apiResource('product', ProductController::class);

Route::controller(LoginController::class)->group(function () {
    Route::post('login/create_token', 'create_token');
});
// Route::apiResource('login', LoginController::class);

Route::resource('category', CategoryController::class);

// Poplook new api
Route::get('/customer_count', [DashboardController::class, 'customer_count_by_shop'])->name('dashboard.customer_count');
Route::get('/order_count', [DashboardController::class, 'order_count_by_status'])->name('dashboard.order_count');

Route::get('group/list_group', [GroupController::class, 'listGroup'])->name('group.list_group');

Route::get('home_banner/desktop', [HomeBannerController::class, 'desktop'])->name('home_banner.desktop');
Route::get('home_banner/mobile', [HomeBannerController::class, 'mobile'])->name('home_banner.mobile');

Route::get('top_banner/desktop', [TopBannerController::class, 'desktop'])->name('top_banner.desktop');
Route::get('top_banner/mobile', [TopBannerController::class, 'mobile'])->name('top_banner.mobile');

Route::get('countdown_banner/desktop', [CountdownBannerController::class, 'desktop'])->name('countdown_banner.desktop');
Route::get('countdown_banner/mobile', [CountdownBannerController::class, 'mobile'])->name('countdown_banner.mobile');

Route::get('top_menu/desktop', [HomeTopMenuController::class, 'desktop'])->name('top_menu.desktop');
Route::get('top_menu/mobile', [HomeTopMenuController::class, 'mobile'])->name('top_menu.mobile');

Route::resource('custom_page', CustomPageController::class);

Route::get('footer_banner/desktop', [FooterBannerController::class, 'desktop'])->name('footer_banner.desktop');
Route::get('footer_banner/mobile', [FooterBannerController::class, 'mobile'])->name('footer_banner.mobile');

Route::get('logo', [LogoController::class, 'index'])->name('logo.index');

Route::get('exit_intent_banner/desktop/{id}', [ExitIntentBannerController::class, 'desktop'])->name('exit_intent_banner.desktop');
Route::get('exit_intent_banner/mobile/{id}', [ExitIntentBannerController::class, 'mobile'])->name('exit_intent_banner.mobile');

Route::get('infos/countries', [InfosController::class, 'country'])->name('infos.country');
Route::controller(OutletController::class)->group(function () {
    Route::get('outlet/get_by_name', 'outletByName')->name('outlet.getbyname');
});
Route::apiResource('outlet', OutletController::class);

// Route::group(['prefix' => 'whatsapp', 'controller' => \App\Http\Controllers\Api\Marketing\Whatsapp\WhatsappSegmentController::class], function () {
//     Route::get('/get_phone', [\App\Http\Controllers\Api\Marketing\Whatsapp\WhatsappSegmentController::class, 'getPhoneNumber']);
//     Route::post('/store_phone', [\App\Http\Controllers\Api\Marketing\Whatsapp\WhatsappSegmentController::class, 'storePhoneNumber']);
// });

Route::middleware(['api_token', 'change_db'])->group(function () {

    Route::post('login', [AuthController::class, 'login'])->name('auth.login');
    Route::post('login_special', [AuthController::class, 'loginSpecial'])->name('auth.login_special');

    Route::group(['prefix' => 'register', 'controller' => \App\Http\Controllers\Api\Customer\RegisterController::class], function () {
        Route::post('/', 'register')->name('register');
        Route::post('/phone', 'phoneNumberValidation')->name('register.phone.validate');
        Route::get('/country_code', 'countryCodeLists');

    });

    Route::group(['prefix' => 'search'], function () {
        Route::get('/', [\App\Http\Controllers\Api\Search\SearchController::class, 'instant']);
        Route::get('/placeholder', [\App\Http\Controllers\Api\Search\SearchController::class, 'searchPlaceholder']);
        Route::get('/result', [\App\Http\Controllers\Api\Search\SearchController::class, 'searchResult']);
    });

    Route::group(['prefix' => 'whatsapp', 'controller' => \App\Http\Controllers\Api\Marketing\Whatsapp\WhatsappSegmentController::class], function () {
        Route::post('/store_phone', [\App\Http\Controllers\Api\Marketing\Whatsapp\WhatsappSegmentController::class, 'storePhoneNumber']);
    });

    //Cart API
    Route::get('cart/{id}/order_step1', [CartController::class, 'orderStep1'])->name('cart.orderStep1');
    Route::get('cart/{id}/order_step2', [CartController::class, 'orderStep2'])->name('cart.orderStep2');
    Route::get('cart/{id}/order_step3', [CartController::class, 'orderStep3'])->name('cart.orderStep3');
    Route::get('cart/{id}/order_step4', [CartController::class, 'orderStep4'])->name('cart.orderStep4');
    Route::get('cart/{id}/order_step5', [CartController::class, 'orderStep5'])->name('cart.orderStep5');
    Route::post('cart/{id}/validate_voucher', [CartController::class, 'validateVoucher'])->name('cart.validate_voucher');
    Route::delete('cart/{id}/remove_voucher', [CartController::class, 'removeVoucher'])->name('cart.remove_voucher');
    Route::put('cart/{id}/updateOrderSummary', [CartController::class, 'updateOrderSummary'])->name('cart.updateOrderSummary');
    Route::apiResource('cart', CartController::class);

    //Order API
    Route::post('order/{id}/cancel', [OrderController::class, 'cancel'])->name('order.cancel');
    Route::get('order/{id}/repay', [OrderController::class, 'repay'])->name('order.repay');
    Route::apiResource('order', OrderController::class);

    Route::controller(AddressController::class)->group(function () {
        Route::post('address/set_default_address', 'set_default_address');
    });
    Route::apiResource('address', AddressController::class);

    Route::delete('customers/account_deletion', [CustomerControllerAPI::class, 'account_deletion'])->name('customer.account_deletion');
    Route::get('customers/{id}/loyalty', [CustomerControllerAPI::class, 'loyalty'])->name('customer.loyalty');
    Route::apiResource('customers', CustomerControllerAPI::class);

    Route::post('wishlist/{id}/add_to_cart', [WishlistController::class, 'addToCart'])->name('wishlist.add_to_cart');
    Route::apiResource('wishlist', WishlistController::class);

    Route::apiResource('store_credit', StoreCreditController::class);

    Route::apiResource('voucher', VoucherController::class);

    Route::post('cms/send_email', [CMSController::class, 'sendEmail'])->name('cms.send_email');

    Route::middleware('auth:sanctum')->group(function () {
    });

    Route::apiResource('home_banner', HomeBannerController::class);
    Route::apiResource('top_banner', TopBannerController::class);


    Route::post('notification/token', [\App\Http\Controllers\Api\Marketing\Web\WebNotificationController::class, 'storeToken']);
});
