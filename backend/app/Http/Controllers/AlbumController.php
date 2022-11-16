<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Album;
use Validator;

class AlbumController extends Controller
{
    public function getAlbums(){
        $albums = Album::all();
        return response()->json($albums, 201);
    }
    public function addAlbum(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJSON(), 200);
        }
        Album::create($validator->validated());
        return response()->json(["message" => 'Album added'], 201);
    }
}
