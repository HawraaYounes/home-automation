<?php

namespace App\Http\Controllers;

use App\Models\Password;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Validator;

class PasswordController extends Controller
{
    public function updatePassword(Request $request){
        $validator = Validator::make($request->all(), [
            'value' => 'required',
            'device_id' => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJSON(), 200);
        }
        $password=Password::where('value',$request->value)->where('device_id',$request->id);
        if($password){
            return response()->json(["message" => 'This is an old password, Choose a new one.'], 201);
        }
        Password::where('activated', 1)->where('device_id', $request->id)->update(['activated' => 0]);
        $newPassword = Password::create([
            'value' =>Hash::make($request->value),
            'device_id'=>$request->id,
            'activated'=>1
        ]);
        return response()->json(["message" => 'Password Updated Successfully.'], 201);
    }
}
