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

    public function turnOn(Request $request){
       
       $device=Device::find($request->id);
       if(!$device)
       return response()->json(["message" => 'Device not found.'], 200);
       $device->status=1;
       $device->save();

       if(intval($request->id)===1){
        History::create([
            'activity'=>Auth::user()->name ." turned on the Light.",
            'user_id'=>Auth::user()->id
        ]);
    }
        elseif(intval($request->id)===2){
            History::create([
                'activity'=>Auth::user()->name ." opened the Window.",
                'user_id'=>Auth::user()->id
            ]);
    }elseif(intval($request->id)===3){
        History::create([
            'activity'=>Auth::user()->name ." opened the Door.",
            'user_id'=>Auth::user()->id
        ]);
    }

        return response()->json(["message" => 'Device turned on.'], 200);
    }

    public function turnOff(Request $request){
       $device=Device::find($request->id);
       if(!$device)
       return response()->json(["message" => 'Device not found.'], 200);
       $device->status=0;
       $device->save();

       if(intval($request->id)===1){
        History::create([
            'activity'=>Auth::user()->name ." turned off the Light.",
            'user_id'=>Auth::user()->id
        ]);
    }
        elseif(intval($request->id)===2){
            History::create([
                'activity'=>Auth::user()->name ." closed the Window.",
                'user_id'=>Auth::user()->id
            ]);
    }elseif(intval($request->id)===3){
        History::create([
            'activity'=>Auth::user()->name ." closed the Door.",
            'user_id'=>Auth::user()->id
        ]);
    }
        return response()->json(["message" => 'Device turned off.'], 200);
    }
    public function getStatus(Request $request){
        $device=Device::where('id',$request->id)->get();
        return response()->json($device, 200);
    }
}
