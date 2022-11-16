<?php

namespace App\Http\Controllers;

use App\Models\Password;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Validator;

class PasswordController extends Controller
{
    public function updatePassword(Request $request){
        $newPassword=Hash::make($request->value);
        $validator = Validator::make($request->all(), [
            'value' => 'required',
            'device_id' => 'required',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJSON(), 200);
        }
        $password=Password::where('value',$newPassword)->where('device_id',$request->device_id)->get();
        if(count($password)!=0){
           return response()->json(["message" => 'This is an old password, Choose a new one.'], 201);
        }
        Password::where('activated', 1)->where('device_id', $request->device_id)->update(['activated' => 0]);
        $newPassword = Password::create([
            'value' =>$newPassword,
            'device_id'=>$request->device_id,
            'activated'=>1
        ]);
        return response()->json(["message" => 'Password Updated Successfully.'], 201);
    }
}
