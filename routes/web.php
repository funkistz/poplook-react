<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Api\TopBannerController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\CustomerGroupController;
use App\Http\Controllers\CustomPageController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Dashboard\AppNotificationController;
use App\Http\Controllers\Dashboard\EmailAnalyticsController;
use App\Http\Controllers\Dashboard\ProductController;
use App\Http\Controllers\Dashboard\SettingLogoController;
use App\Http\Controllers\Dashboard\WebPushController;
use App\Http\Controllers\Dashboard\WhatsAppController;
use App\Http\Controllers\DesktopExitIntentBannerController;
use App\Http\Controllers\DesktopFooterBannerController;
use App\Http\Controllers\DesktopMenuSettingController;
use App\Http\Controllers\DesktopTopBannerController;
use App\Http\Controllers\EmployeeAuthController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\HomeBannerController;
use App\Http\Controllers\HomeCategoryController;
use App\Http\Controllers\HomeCustomerController;
use App\Http\Controllers\HomeEmployeeController;
use App\Http\Controllers\HomeLoyaltyController;
use App\Http\Controllers\HomeNavigationLinkController;
use App\Http\Controllers\HomeOrderController;
use App\Http\Controllers\HomeRoleController;
use App\Http\Controllers\LHDN\ConsolodationEinvoiceController;
use App\Http\Controllers\LHDN\IndividualEinvoiceController;
use App\Http\Controllers\Marketing\ContactGroupController;
use App\Http\Controllers\Marketing\SearchKeywordController;
use App\Http\Controllers\Marketing\TemplateListController;
use App\Http\Controllers\MobileBannerController;
use App\Http\Controllers\MobileFooterBannerController;
use App\Http\Controllers\MobileMenuSettingController;
use App\Http\Controllers\MobileTopBannerController;
use App\Http\Controllers\OutletController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Retail\PayInStoreController;
use App\Http\Controllers\Retail\SettlementController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\View\View;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
 */

Route::view('welcome', 'welcome');
Route::get('banner_desktop_preview', [HomeBannerController::class, 'desktop_preview'])->name('banner_desktop_preview');
Route::get('banner_mobile_preview', [HomeBannerController::class, 'mobile_preview'])->name('banner_mobile_previews');
Route::get('top_banner_desktop_preview', [DesktopTopBannerController::class, 'desktop_preview'])->name('top_banner_desktop_preview');
Route::get('top_banner_mobile_preview', [MobileTopBannerController::class, 'mobile_preview'])->name('top_banner_mobile_preview');

Route::get('top_menu_desktop_preview', [DesktopMenuSettingController::class, 'desktop_preview'])->name('top_menu_desktop_preview');
Route::get('top_menu_mobile_preview', [MobileMenuSettingController::class, 'mobile_preview'])->name('top_menu_mobile_preview');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/', function () {
//     return view('welcome');
// })->name('home');

Route::prefix('admin')
    ->as('admin.')
    ->group(function () {
        // Route::get('/', [EmployeeController::class, 'index'])->name('admin');
        Route::get('login', [EmployeeAuthController::class, 'index'])->name('login_form');
        Route::post('login', [EmployeeAuthController::class, 'login'])->name('login');
        Route::get('logout', [EmployeeAuthController::class, 'logout'])->name('logout');
        Route::post('cookie', [EmployeeAuthController::class, 'setCookie'])->name('cookie');

    });

Route::group(['middleware' => ['auth:admin']], function () {

    

    Route::middleware(['route'])->group(function () {
        Route::resource('dashboard', DashboardController::class);
        // user
        Route::resource('customer', HomeCustomerController::class);
        Route::controller(HomeCustomerController::class)->group(function () {
            Route::post('customer/update_pass', 'changePassword')->name('customer.update_pass');
            Route::post('customer/update_group', 'changeGroup')->name('customer.update_group');
            Route::post('customer/generate_voucher', 'generetaVoucher')->name('customer.generate_voucher');
            Route::post('customer/set_default_address/{id}', 'setDefaultAddress')->name('customer.set_default_address');
            Route::post('customer/update_address', 'updateAddress')->name('customer.update_address');
        });
        Route::resource('employee', HomeEmployeeController::class);
        Route::controller(HomeEmployeeController::class)->group(function () {
            Route::post('employee/update_pass', 'changePassword')->name('employee.update_pass');
            Route::post('employee/update_status', 'changeStatus')->name('employee.update_status');
            Route::post('employee/update_role', 'changeRole')->name('employee.update_role');
        });
        // end user
        // banner setting
        Route::controller(BannerController::class)->group(function () {
            Route::get('desktop_banner/poplook_app_banner', 'lookbook');
            Route::post('desktop_banner/duplicate', 'duplicate');
            Route::put('desktop_banner/activate', 'activate');
            Route::put('desktop_banner/deactivate', 'deactivate');
        });
        Route::resource('desktop_banner', BannerController::class);

        Route::controller(MobileBannerController::class)->group(function () {
            Route::get('mobile_banner/poplook_app_banner', 'lookbook');
            Route::post('mobile_banner/duplicate', 'duplicate');
            Route::put('mobile_banner/activate', 'activate');
            Route::put('mobile_banner/deactivate', 'deactivate');
        });
        Route::resource('mobile_banner', MobileBannerController::class);

        Route::controller(DesktopTopBannerController::class)->group(function () {
            Route::post('desktop_top_banner/duplicate', 'duplicate');
            Route::put('desktop_top_banner/activate', 'activate');
            Route::put('desktop_top_banner/deactivate', 'deactivate');
            Route::get('desktop_top_banner/product_list_slider', 'productListSlider');
        });
        Route::resource('desktop_top_banner', DesktopTopBannerController::class);

        Route::controller(MobileTopBannerController::class)->group(function () {
            Route::post('mobile_top_banner/duplicate', 'duplicate');
            Route::put('mobile_top_banner/activate', 'activate');
            Route::put('mobile_top_banner/deactivate', 'deactivate');
        });
        Route::resource('mobile_top_banner', MobileTopBannerController::class);

        Route::controller(DesktopFooterBannerController::class)->group(function () {
            Route::post('desktop_footer_banner/duplicate', 'duplicate');
            Route::put('desktop_footer_banner/activate', 'activate');
            Route::put('desktop_footer_banner/deactivate', 'deactivate');
        });
        Route::resource('desktop_footer_banner', DesktopFooterBannerController::class);

        Route::controller(MobileFooterBannerController::class)->group(function () {
            Route::post('mobile_footer_banner/duplicate', 'duplicate');
            Route::put('mobile_footer_banner/activate', 'activate');
            Route::put('mobile_footer_banner/deactivate', 'deactivate');
        });
        Route::resource('mobile_footer_banner', MobileFooterBannerController::class);

        Route::controller(DesktopExitIntentBannerController::class)->group(function () {
            Route::post('desktop_exit_intent_banner/duplicate', 'duplicate');
            Route::put('desktop_exit_intent_banner/activate', 'activate');
            Route::put('desktop_exit_intent_banner/deactivate', 'deactivate');
        });
        Route::resource('desktop_exit_intent_banner', DesktopExitIntentBannerController::class);
        // end banner setting

        // menu setting
        Route::controller(DesktopMenuSettingController::class)->group(function () {
            Route::get('desktop_menu/poplook_app_banner', 'lookbook');
            Route::post('desktop_menu/duplicate', 'duplicate');
            Route::put('desktop_menu/activate', 'activate');
            Route::put('desktop_menu/deactivate', 'deactivate');
        });
        Route::resource('desktop_menu', DesktopMenuSettingController::class);

        Route::controller(MobileMenuSettingController::class)->group(function () {
            Route::get('mobile_menu/poplook_app_banner', 'lookbook');
            Route::post('mobile_menu/duplicate', 'duplicate');
            Route::put('mobile_menu/activate', 'activate');
            Route::put('mobile_menu/deactivate', 'deactivate');
        });
        Route::resource('mobile_menu', MobileMenuSettingController::class);
        // end menu setting

        // catalog
        Route::resource('category', HomeCategoryController::class);
        Route::controller(ProductController::class)->group(function () {
            Route::put('product/status', 'tongleStatus')->name('product.status');
        });
        Route::resource('product', ProductController::class);
        Route::controller(CustomerGroupController::class)->group(function () {
            Route::post('customer_group/update_or_create', 'updateOrCreate')->name('customer_group.updateorcreate');
            Route::get('customer_group/get_customer_selection', 'getCustomerSelection')->name('customer_group.getcustomerselection');
            Route::post('customer_group/add_customer_to_group', 'addCustomerToGroup')->name('customer_group.addcustomertogroup');
        });
        Route::resource('customer_group', CustomerGroupController::class);
        // end catalog

        // retail
        Route::resource('payInStore', PayInStoreController::class);
        Route::controller(PayInStoreController::class)->group(function () {
            // Route::put('navigation_link/update_status', 'updateStatus')->name('navigationlink.updateStatus');
            // Route::post('navigation_link/update_or_create', 'updateOrCreate')->name('navigationlink.updateorcreate');
            Route::post('payInStore/update_order_pay_in_store', 'updateOrderPayInStore')->name('pay_in_store.updateorderpayment');
        });
        Route::resource('settlement', SettlementController::class);
        Route::controller(SettlementController::class)->group(function () {
            // Route::post('role/update_or_create', 'updateOrCreate')->name('role.updateorcreate');
            
            Route::get('settlement/settlement_history_detail/{id}', 'getSettlementHistoryDetail')->name('settlement.getSettlementHistoryDetail');
            Route::post('settlement/success_settlement', 'successSettlement')->name('settlement.successSettlement');
        });
        // end retail

        // custom page
        Route::resource('custom_page', CustomPageController::class);
        // end custom page

        // order
        Route::resource('order', HomeOrderController::class);
        Route::controller(HomeOrderController::class)->group(function () {
            // Route::post('order/pay_in_store', 'updateOrderPayInStore')->name('order.pay_in_store'); //move this to pay in store
        });
        // end order

        // loyalty
        Route::controller(HomeLoyaltyController::class)->group(function () {
            Route::get('loyalty/export_loyalty', 'exportLoyalty');
        });
        Route::resource('loyalty', HomeLoyaltyController::class);
        // end loyalty

        // marketing
        Route::controller(EmailAnalyticsController::class)->group(function () {
            Route::get('email_analytics/{id}/recipients', 'recipients')->name('email_analytics.recipients');
            Route::get('email_analytics/{id}/design', 'design')->name('email_analytics.design');
            Route::get('email_analytics/{id}/launch', 'launch')->name('email_analytics.launch');
        });
        Route::resource('email_analytics', EmailAnalyticsController::class);

        //campaign creation
        // Route::group(['prefix' => 'email_analytics/campaign', 'as' => 'campaign.'], function (){
        //     Route::group(['prefix' => 'email', 'as' => 'email.'], function (){
        //         Route::post('/create', [\App\Http\Controllers\Marketing\EmailCampaignController::class, 'create'])->name('create');
        //         Route::post('/design', [\App\Http\Controllers\Marketing\EmailCampaignController::class, 'htmldesign'])->name('design');
        //         Route::get('/{id}', [\App\Http\Controllers\Marketing\EmailCampaignController::class, 'getDesign'])->name('get_design');
        //         Route::get('/mail/{id}', [\App\Http\Controllers\Marketing\EmailCampaignController::class, 'getCampaingMail'])->name('detail');
        //     });
        // });

        Route::controller(AppNotificationController::class)->prefix('app_notification')->as('app_notification')->group(function () {
            Route::get('/', 'index')->name('.index');
            Route::get('{id}/create', 'createNew')->name('.createNew');
            Route::get('{id}/segment', 'segment')->name('.segment');
            Route::get('{id}/option', 'option')->name('.option');
            Route::get('{id}/launch', 'launch')->name('.launch');

            Route::post('/store', 'create')->name('.store');
            Route::post('/update', 'store')->name('.update');
            Route::post('/options', 'storeOptions')->name('.optionUpdate');

            Route::post('/launch', 'launchUpdate')->name('.launchUpdate');
        });

        Route::prefix('web_push')->as('web_push.')->group(function () {

            Route::controller(WebPushController::class)->group(function (){

                Route::get('/', 'index')->name('index');

                Route::get('{id}/create', 'createNew')->name('createNew');
                Route::get('{id}/segment', 'segment')->name('segment');
                Route::get('{id}/design', 'design')->name('design');
                Route::get('{id}/launch', 'launch')->name('launch');

                // Temporary
                Route::put('segmentUpdate', 'segmentUpdate')->name('segmentUpdate');
                Route::put('designUpdate', 'designUpdate')->name('designUpdate');
                Route::put('launchUpdate', 'launchUpdate')->name('launchUpdate');

            });

            Route::controller(\App\Http\Controllers\Marketing\Web\WebCampaignController::class)->group(function (){

                Route::post('/store', 'create')->name('store');

            });


            //webpush campaign controller


        });

        Route::controller(WhatsAppController::class)->group(function () {
            Route::get('whatsapp/{id}/create', 'createNew')->name('whatsapp.createNew');
            Route::get('whatsapp/{id}/segment', 'segment')->name('whatsapp.segment');
            Route::get('whatsapp/{id}/design', 'design')->name('whatsapp.design');
            Route::get('whatsapp/{id}/goal', 'goal')->name('whatsapp.goal');
            Route::get('whatsapp/{id}/launch', 'launch')->name('whatsapp.launch');
        });
        Route::resource('whatsapp', WhatsAppController::class);

        Route::controller(ContactGroupController::class)->group(function () {
            // Route::get('content-group/{id}/create', 'createNew')->name('web_push.createNew');
            // Route::get('web_push/{id}/segment', 'segment')->name('web_push.segment');
            // Route::get('web_push/{id}/design', 'design')->name('web_push.design');
            // Route::get('web_push/{id}/launch', 'launch')->name('web_push.launch');
        });
        Route::resource('content_group', ContactGroupController::class);
        Route::resource('searchKeyword', SearchKeywordController::class);

        Route::controller(TemplateListController::class)->group(function () {

        });
        Route::resource('template-group', TemplateListController::class);

        //campaign creation
        Route::group(['prefix' => 'email_analytics/campaign', 'as' => 'campaign.'], function () {
            Route::group(['prefix' => 'email', 'as' => 'email.'], function () {
                Route::post('/create', [\App\Http\Controllers\Marketing\EmailCampaignController::class, 'create'])->name('create');
                Route::post('/design', [\App\Http\Controllers\Marketing\EmailCampaignController::class, 'htmldesign'])->name('design');
                Route::get('/{id}', [\App\Http\Controllers\Marketing\EmailCampaignController::class, 'getDesign'])->name('get_design');
                Route::get('/mail/{id}', [\App\Http\Controllers\Marketing\EmailCampaignController::class, 'getCampaingMail'])->name('detail');

                Route::post('/header', [\App\Http\Controllers\Marketing\EmailCampaignController::class, 'saveCampaignMail'])->name('saveCampaignMail');
                Route::post('/zip/', [\App\Http\Controllers\Marketing\EmailCampaignController::class, 'uploadDesign'])->name('zip');
                Route::post('/launch', [\App\Http\Controllers\Marketing\EmailCampaignController::class, 'updateCampaignLaunch'])->name('launch');

            });
        });
        // end marketing
        Route::group(['prefix' => 'email_analytics', 'as' => 'control.', 'controller' => \App\Http\Controllers\Marketing\CampaignController::class], function () {
            Route::post('/delete', 'deleteCampaign')->name('delete');
            Route::post('/duplicate', 'duplicateCampaign')->name('duplicate');

        });

        // setting
        Route::resource('navigation_link', HomeNavigationLinkController::class);
        Route::controller(HomeNavigationLinkController::class)->group(function () {
            Route::post('navigation_link/update_status', 'updateStatus')->name('navigation_link.updatestatus');
            Route::post('navigation_link/update_or_create', 'updateOrCreate')->name('navigation_link.updateorcreate');
            Route::post('navigation_link/update_or_create_child', 'updateOrCreateChild')->name('navigation_link.updateorcreatechild');
            Route::delete('navigation_link/delete_children/{id}', 'destoryChild')->name('navigation_link.deletechildren');
        });
        Route::resource('role', HomeRoleController::class);
        Route::controller(HomeRoleController::class)->group(function () {
            Route::get('role/{role}', 'show')->name('role.show');
            Route::post('role/update_or_create', 'updateOrCreate')->name('role.updateorcreate');
        });
        Route::controller(SettingLogoController::class)->group(function () {
            Route::put('logo/live', 'live')->name('logo.live');
        });
        Route::resource('logo', SettingLogoController::class);

        Route::get('file_upload/fileList', [FileUploadController::class, 'fileList'])->name('file_upload.fileList');
        Route::resource('file_upload', FileUploadController::class);

        Route::put('outlet/{id}/change_position', [OutletController::class, 'changePosition'])->name('outlet.change_position');
        Route::put('outlet/{id}/change_active', [OutletController::class, 'changeActive'])->name('outlet.change_active');
        Route::resource('outlet', OutletController::class);
        // end setting

        // LHDN
        Route::resource('consolodation-invoice', ConsolodationEinvoiceController::class);
        Route::controller(ConsolodationEinvoiceController::class)->group(function () {
            Route::post('consolodation-invoice/downloadExcel', 'downloadExcel')->name('consolodation-invoice.downloadExcel');
        });
        Route::resource('individual-invoice', IndividualEinvoiceController::class);


    });
    
    Route::redirect('/', '/admin');
    Route::resource('admin', AdminController::class);

    Route::resource('profile', ProfileController::class);
    Route::controller(ProfileController::class)->group(function () {
        Route::post('profile/update_pass', 'changePassword')->name('profile.update_pass');
    });
    

    // Route::middleware(['can:dashboard'])->group(function () {
    //     Route::resource('admin', DashboardController::class);
    // });

    // Route::get('file_upload/fileList', [FileUploadController::class, 'fileList'])->name('file_upload.fileList');
    // Route::resource('file_upload', FileUploadController::class);

    // // banner setting
    // Route::middleware(['can:banner_setting'])->group(function () {
    //     Route::controller(BannerController::class)->group(function () {
    //         Route::get('desktop_banner/poplook_app_banner', 'lookbook');
    //         Route::post('desktop_banner/duplicate', 'duplicate');
    //         Route::put('desktop_banner/activate', 'activate');
    //         Route::put('desktop_banner/deactivate', 'deactivate');
    //     });
    //     Route::resource('desktop_banner', BannerController::class);

    //     Route::controller(MobileBannerController::class)->group(function () {
    //         Route::get('mobile_banner/poplook_app_banner', 'lookbook');
    //         Route::post('mobile_banner/duplicate', 'duplicate');
    //         Route::put('mobile_banner/activate', 'activate');
    //         Route::put('mobile_banner/deactivate', 'deactivate');
    //     });
    //     Route::resource('mobile_banner', MobileBannerController::class);

    //     Route::controller(DesktopTopBannerController::class)->group(function () {
    //         Route::post('desktop_top_banner/duplicate', 'duplicate');
    //         Route::put('desktop_top_banner/activate', 'activate');
    //         Route::put('desktop_top_banner/deactivate', 'deactivate');
    //         Route::get('desktop_top_banner/product_list_slider', 'productListSlider');
    //     });
    //     Route::resource('desktop_top_banner', DesktopTopBannerController::class);

    //     Route::controller(MobileTopBannerController::class)->group(function () {
    //         Route::post('mobile_top_banner/duplicate', 'duplicate');
    //         Route::put('mobile_top_banner/activate', 'activate');
    //         Route::put('mobile_top_banner/deactivate', 'deactivate');
    //     });
    //     Route::resource('mobile_top_banner', MobileTopBannerController::class);

    //     Route::controller(DesktopFooterBannerController::class)->group(function () {
    //         Route::post('desktop_footer_banner/duplicate', 'duplicate');
    //         Route::put('desktop_footer_banner/activate', 'activate');
    //         Route::put('desktop_footer_banner/deactivate', 'deactivate');
    //     });
    //     Route::resource('desktop_footer_banner', DesktopFooterBannerController::class);

    //     Route::controller(MobileFooterBannerController::class)->group(function () {
    //         Route::post('mobile_footer_banner/duplicate', 'duplicate');
    //         Route::put('mobile_footer_banner/activate', 'activate');
    //         Route::put('mobile_footer_banner/deactivate', 'deactivate');
    //     });
    //     Route::resource('mobile_footer_banner', MobileFooterBannerController::class);
    // });

    // // menu setting
    // Route::middleware(['can:menu_setting'])->group(function () {
    //     Route::controller(DesktopMenuSettingController::class)->group(function () {
    //         Route::get('desktop_menu/poplook_app_banner', 'lookbook');
    //         Route::post('desktop_menu/duplicate', 'duplicate');
    //         Route::put('desktop_menu/activate', 'activate');
    //         Route::put('desktop_menu/deactivate', 'deactivate');
    //     });
    //     Route::resource('desktop_menu', DesktopMenuSettingController::class);

    //     Route::controller(MobileMenuSettingController::class)->group(function () {
    //         Route::get('mobile_menu/poplook_app_banner', 'lookbook');
    //         Route::post('mobile_menu/duplicate', 'duplicate');
    //         Route::put('mobile_menu/activate', 'activate');
    //         Route::put('mobile_menu/deactivate', 'deactivate');
    //     });
    //     Route::resource('mobile_menu', MobileMenuSettingController::class);
    // });

    // Route::resource('configuration_setting', ConfigurationSettingController::class);
    // Route::controller(ConfigurationSettingController::class)->group(function () {
    //     Route::put('config/update', 'updateConfig');
    // });

    // // customer
    // Route::middleware(['can:customers'])->group(function () {
    //     Route::resource('customer', HomeCustomerController::class);
    //     Route::controller(HomeCustomerController::class)->group(function () {
    //         Route::post('customer/update_pass', 'changePassword')->name('customer.update_pass');
    //         Route::post('customer/update_group', 'changeGroup')->name('customer.update_group');
    //         Route::post('customer/generate_voucher', 'generetaVoucher')->name('customer.generate_voucher');
    //     });
    // });

    // // employee
    // Route::middleware(['can:employee'])->group(function () {
    //     Route::resource('employee', HomeEmployeeController::class);
    //     Route::controller(HomeEmployeeController::class)->group(function () {
    //         Route::post('employee/update_pass', 'changePassword');
    //     });
    // });
    // Route::resource('preview_banner', PreviewBannerController::class);
    // Route::resource('group', GroupController::class);

    // Route::middleware(['can:custom_page'])->group(function () {
    //     Route::resource('custom_page', CustomPageController::class);
    // });

    // Route::middleware(['can:order_list'])->group(function () {
    //     Route::resource('order', HomeOrderController::class);
    // });

    // Route::middleware(['can:loyalty_list'])->group(function () {
    //     Route::controller(HomeLoyaltyController::class)->group(function () {
    //         Route::get('loyalty/export_loyalty', 'exportLoyalty');
    //     });
    //     Route::resource('loyalty', HomeLoyaltyController::class);
    // });

    // Route::middleware(['can:marketing'])->group(function () {
    //     Route::controller(EmailAnalyticsController::class)->group(function () {
    //         Route::get('email_analytics/{id}/recipients', 'recipients')->name('email_analytics.recipients');
    //         Route::get('email_analytics/{id}/design', 'design')->name('email_analytics.design');
    //         Route::get('email_analytics/{id}/launch', 'launch')->name('email_analytics.launch');
    //     });
    //     Route::resource('email_analytics', EmailAnalyticsController::class);

    //     Route::controller(AppNotificationController::class)->group(function () {
    //         Route::get('app_notification/{id}/create', 'createNew')->name('app_notification.createNew');
    //         Route::get('app_notification/{id}/segment', 'segment')->name('app_notification.segment');
    //         Route::get('app_notification/{id}/option', 'option')->name('app_notification.option');
    //         Route::get('app_notification/{id}/launch', 'launch')->name('app_notification.launch');
    //     });
    //     Route::resource('app_notification', AppNotificationController::class);
    // });

    // Route::middleware(['can:category'])->group(function () {
    //     Route::resource('category', HomeCategoryController::class);
    // });

    // Route::middleware(['can:navigation_link'])->group(function () {
    //     Route::resource('navigationlink', HomeNavigationLinkController::class);
    //     Route::controller(HomeNavigationLinkController::class)->group(function () {
    //         Route::post('navigation_link/update_or_create', 'updateOrCreate')->name('navigationlink.updateorcreate');
    //     });
    // });
    // Route::middleware(['can:role'])->group(function () {
    //     Route::resource('role', HomeRoleController::class);
    //     Route::controller(HomeRoleController::class)->group(function () {
    //         Route::post('role/update_or_create', 'updateOrCreate')->name('role.updateorcreate');
    //     });
    // });

    Route::resource('topbanner', TopBannerController::class);
    Route::resource('order', HomeOrderController::class);
    Route::resource('category', HomeCategoryController::class);
    Route::controller(ProductController::class)->group(function () {
        Route::put('product/status', 'tongleStatus')->name('product.status');
    });
    Route::resource('product', ProductController::class);
});
