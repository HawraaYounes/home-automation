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
   
}
