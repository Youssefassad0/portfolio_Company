<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function ListMessages()
    {
        $messages = Contact::all();
        return response()->json([
            'messages' => $messages
        ]);
    }
    public function sendMessage(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'telephone' => 'required|min:6|max:9',
                "message" => 'required|min:10|string'
            ]);
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            $message = new Contact;
            $message->email = $request->input('email');
            $message->telephone = $request->input('telephone');
            $message->message = $request->input('message');
            $message->save();
            return response()->json(['data' => $message, "message" => "Send with success ! "], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function delete($id)
    {
        $contact = Contact::find($id);
        if (!$contact) {
            return response()->json(['error' => 'Message  not found.'], 404);
        }
        $contact->delete();
        return response()->json([
            'message' => 'Deleted With Success!'
        ]);
    }
    public function ListMessage($id)
    {
        $contact = Contact::find($id);
        if (!$contact) {
            return response()->json(['error' => 'Message  not found.'], 404);
        }
        $contact->delete();
        return response()->json([
            'data' => $contact
        ]);
    }
}
