<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function ListContact()
    {
        $messages = Contact::all();
        return response()->json([
            'messages' => $messages
        ]);
    }
    public function SendContact(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'telephone' => 'required|numeric',
                "message" => 'required|min:10|text'
            ]);
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            $message = new Contact;
            $message->email = $request->input('email');
            $message->telephone = $request->input('etelephonemail');
            $message->message = $request->input('message');
            $message->save();
            return response()->json(['data' => $message, "message" => "Send with success ! "], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
