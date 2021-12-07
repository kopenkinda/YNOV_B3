<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Seller;
use Illuminate\Http\Request;

class SellerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Seller::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $seller = Seller::create($request->all());

        return response()->json($seller, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Seller::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $seller = Seller::findOrFail($id);
        $seller->update($request->all());

        return response()->json($seller, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Seller::findOrFail($id)->delete();
        return response(['message' => 'Deleted Successfully'], 200);
    }

    public function take_order($seller_id, $order_id)
    {
        $seller = Seller::findOrFail($seller_id);
        $order = Order::findOrFail($order_id);
        if ($order->seller_id == null && $order->status == 'waiting_for_acceptance') {
            $order->seller_id = $seller->id;
            $order->save();
            return response()->json($seller, 200);
        }
        return response()->json(['message' => 'Order already taken'], 400);
    }

    public function order_action($seller_id, $order_id, $action)
    {
        $seller = Seller::findOrFail($seller_id);
        $order = $seller->orders()->findOrFail($order_id);
        $new_status = '';
        switch ($action) {
            case 'accept':
                $new_status = 'accepted';
                break;
            case 'reject':
                $new_status = 'rejected';
                break;
            case 'deliver':
                $new_status = 'delivered';
                break;
            default:
                return response()->json(['message' => 'Invalid action'], 400);
        }
        $order->update(['status' => $new_status]);
        return response()->json(['new_status' => $new_status], 200);
    }

    public function get_passed_orders($seller_id)
    {
        $seller = Seller::findOrFail($seller_id);
        return $seller->orders()->where('status', 'delivered')->get();
    }
}
