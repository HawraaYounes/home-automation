<?php

namespace App\Http\Controllers;

use App\Models\Device;
use App\Models\History;
use Auth;
use Illuminate\Http\Request;
use Validator;

class DeviceController extends Controller
{

    public function getDevices(){
       $devices=Device::all();
       if(!$devices)
        return response()->json(["message" => 'No devices found.'], 200);
       return response()->json($devices, 200);
    }

   
}
