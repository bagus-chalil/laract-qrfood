<?php

namespace App\Http\Controllers;

use App\Helper\GenerateNumberController;
use App\Http\Controllers\API\AutoGenerateReferal;
use App\Http\Requests\UsersRequest;
use App\Mail\MailReferalCodeUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->auto_code_referal = new AutoGenerateReferal;
    }
    public function index(Request $request)
    {
        $dataUser = User::search($request->search)->paginate($request->filter ?? 10)->appends('query',null)->withQueryString();

        return Inertia::render('Admin/Users/User',[
            'dataUser' => $dataUser,
            'sessions' => session()->all()
        ]);
    }

    public function store(UsersRequest $request)
    {
        $data = array(
                    'name' => $request->name,
                    'email' => $request->email,
                    'no_telephone' => $request->no_telephone,
                    'password' => 'USERSFEST2024_ITFAMILY',
                    'referal_code' => $this->auto_code_referal->generateRandomReferal(),
                    'send_email' => 1,
                );

        $user = User::create($data);

        //Broadcast Email
        Mail::to($user->email)->send(new MailReferalCodeUser($user));

        return redirect(url('users'))->with('message', 'Data Berhasil ditambahkan !');
    }

    public function update(Request $request, $id)
    {
        User::find($id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'no_telephone' => $request->no_telephone,
        ]);

        return redirect(url('category'))->with('message', 'Data Berhasil diperbarui !');
    }
}
