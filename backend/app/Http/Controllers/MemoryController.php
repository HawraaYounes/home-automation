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
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJSON(), 200);
        }
        $memory=Memory::create($validator->validated());

        if($request->hasFile('images')) {
        $allowedfileExtension=['jpeg','jpg','png'];
        $files = $request->file('images'); 
        foreach ($files as $file) {      
            $extension = $file->getClientOriginalExtension();
            $check = in_array($extension,$allowedfileExtension);
            if($check) {
                foreach($request->images as $mediaFiles) {
                    $path = $mediaFiles->store('public/memories');
                    $image = new Image();
                    $image->memory_id= $memory->id;
                    $image->path = $path;
                    $image->save();
                    return response()->json(['Memory added with image'], 201);
                }
            } else {
                return response()->json(['invalid_file_format'], 422);
            }
        }
    }
        return response()->json(["message" => 'Memory added'], 201);
    }
}
