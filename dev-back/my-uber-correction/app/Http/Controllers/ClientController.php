<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Client::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $client = Client::create($request->all());

        return response()->json($client, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Client::find($id);
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
        $client = Client::findOrFail($id);
        $client->update($request->all());
        return response()->json($client, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Client::findOrFail($id)->delete();
        return response(['message' => 'Deleted Successfully'], 200);
    }

    public function add_to_cart($client_id, $product_id)
    {
        $client = Client::findOrFail($client_id);
        $cart = $client->cart;
        if ($cart == null || $cart->status == 'passed' || $cart->status == 'cancelled') {
            $cart = new Order();
        }
        $cart->status = 'in_cart';
        $cart->client_id = $client_id;
        $cart->products->add(Product::find($product_id));
        $cart->save();
        $client->order_id = $cart->id;
        $client->save();
        return response(200);
    }

    public function send_order($client_id)
    {
        $client = Client::findOrFail($client_id);
        $cart = $client->cart;
        $cart->status = 'waiting_for_acceptance';
        $cart->save();
        return response(200);
    }

    public function check_order_status($client_id)
    {
        $client = Client::findOrFail($client_id);
        $cart = $client->cart;
        if ($cart == null) {
            return response(['status' => 'cart_empty'], 200);
        }
        return response()->json($cart->status, 200);
    }
}
