<?php

namespace App\Http\Controllers;

use App\Models\Image;
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
            'path'=>'required'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJSON(), 200);
        } 
        $fileName = time().'.'.$request->file("path")->getClientOriginalExtension(); 
        $request->file("path")->move(public_path('uploads/'), $fileName);
        Memory::create([
            'details' => $request->details,
            'album_id'=>$request->album_id,
            'path'=>$fileName,
        ]);
        return response()->json(["message" => 'Memory added'], 201);
}
}
