<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;
use Validator;

class HistoryController extends Controller
{
    
    public function getHistories(){
        $histories=History::all();
        return response()->json($histories, 200);
    }

    public function addHistory(Request $request){
        $validator = Validator::make($request->all(), [
            'activity' => 'required',
            'user_id' => 'required|integer'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJSON(), 200);
        }
        History::create($validator->validated());
        return response()->json(["message" => 'History added'], 201);
    }
    
}
