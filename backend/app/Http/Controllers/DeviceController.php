<?php

namespace App\Http\Controllers;

use App\Models\Device;
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

    public function turnOn($id){
       
       $device=Device::find($id);
       if(!$device)
       return response()->json(["message" => 'Device not found.'], 200);
       $device->status=1;
       $device->save();
        return response()->json(["message" => 'Device turned on.'], 200);
    }

    public function turnOff($id){
       $device=Device::find($id);
       if(!$device)
       return response()->json(["message" => 'Device not found.'], 200);
       $device->status=0;
       $device->save();
        return response()->json(["message" => 'Device turned off.'], 200);
    }
}
