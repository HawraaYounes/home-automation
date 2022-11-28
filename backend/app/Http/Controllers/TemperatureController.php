<?php

namespace App\Http\Controllers;

use App\Models\Temperature;
use Illuminate\Http\Request;
use Validator;

class TemperatureController extends Controller
{
    public function sendTemperature(Request $request){
        $validator = Validator::make($request->all(), [
            'temperature' => 'required',
            'humidity' => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJSON(), 200);
        }
        Temperature::create($validator->validated());
        return response()->json(["message" => 'Temperature and Humidity records sent'], 201);
    }

   
}
