<?php

namespace App\Http\Controllers;

use App\Models\Memory;
use Illuminate\Http\Request;
use Validator;

class MemoryController extends Controller
{
    public function getMemories($id){
        $memories = Memory::where('album_id',$id)->get();
        return response()->json($memories, 201);
    }

    public function addMemory(Request $request){
        $validator = Validator::make($request->all(), [
            'details' => 'required|string',
            'album_id' => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJSON(), 200);
        }
        Memory::create($validator->validated());
        return response()->json(["message" => 'Memory added'], 201);
    }
}
