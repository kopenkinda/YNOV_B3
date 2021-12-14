<?php

namespace App\Http\Controllers;

use App\Models\Shipper;
use Illuminate\Http\Request;

class ShipperController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Shipper::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $shipper = Shipper::create($request->all());

        return response()->json($shipper, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Shipper::find($id);
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
        $shipper = Shipper::findOrFail($id);
        $shipper->update($request->all());

        return response()->json($shipper, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Shipper::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }

    public function get_orders($shipper_id)
    {
        $shipper = Shipper::findOrFail($shipper_id);
        return $shipper->orders;
    }

    public function do_order_action($shipper_id, $order_id, $action)
    {
        $shipper = Shipper::findOrFail($shipper_id);
        $order = $shipper->orders()->findOrFail($order_id);
        switch ($action) {
            case 'accept':
                $order->update(['status' => 'delivering']);
                break;
            case 'refuse':
                $order->update(['status' => 'refused']);
                break;
            default:
                return response('Invalid action', 400);
        }
    }

    public function update_position(Request $request, $shipper_id)
    {
        $lat = $request->query('lat');
        $long = $request->query('long');
        $shipper = Shipper::findOrFail($shipper_id);
        $shipper->update(['lat' => $lat, 'long' => $long]);
        return response([
            'message' => 'Updated position',
            'lat' => $lat,
            'long' => $long
        ], 200);
    }
}
