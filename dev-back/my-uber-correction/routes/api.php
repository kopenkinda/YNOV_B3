<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\ShipperController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::put('/clients/{client_id}/product/{product_id}', [ClientController::class, 'add_to_cart']);
Route::post('/clients/{client_id}/send_order', [ClientController::class, 'send_order']);
Route::get('/clients/{client_id}/order_status', [ClientController::class, 'check_order_status']);
Route::get('/clients/{client_id}/get_order_position', [ClientController::class, 'get_order_position']);
Route::apiResource('/clients', ClientController::class);

// TODO: add error ???

Route::post('/sellers/{seller_id}/take_order/{order_id}', [SellerController::class, 'take_order']);
Route::post('/sellers/{seller_id}/order_action/{order_id}/{action}', [SellerController::class, 'order_action']);
Route::get('/sellers/{seller_id}/get_passed_orders', [SellerController::class, 'get_passed_orders']);
Route::apiResource('/sellers', SellerController::class);

Route::get('/shippers/{shipper_id}/get_orders', [ShipperController::class, 'get_orders']);
Route::post('/shippers/{shipper_id}/do_order_action/{order_id}/{action}', [ShipperController::class, 'do_order_action']);
Route::post('/shippers/{shipper_id}/update_position', [ShipperController::class, 'update_position']);
Route::apiResource('/shippers', ShipperController::class);

Route::apiResource('/products', ProductController::class);

Route::apiResource('/orders', OrderController::class);
