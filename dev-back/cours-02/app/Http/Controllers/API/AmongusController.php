<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Amongus;
use Illuminate\Http\Request;

class AmongusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Amongus::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = json_decode($request->getContent());
        $impostor = new Amongus();
        $impostor->name = $data->name;
        $impostor->isImpostor = $data->isImpostor;
        $impostor->save();
        return $impostor;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $amongus = Amongus::where('id', $id)->get()[0];
        return $amongus;
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
        $impostor = Amongus::where('id', $id)->get()[0];
        $data = json_decode($request->getContent());
        $impostor->name = $data->name;
        $impostor->isImpostor = $data->isImpostor;
        $impostor->save();
        return $impostor;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Amongus::destroy($id);
    }
}
