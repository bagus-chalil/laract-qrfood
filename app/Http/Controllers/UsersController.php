<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\ModelHasRoles;
use App\Mail\MailReferalCodeUser;
use App\Helper\AutoGenerateReferal;
use App\Http\Requests\UsersRequest;
use Illuminate\Support\Facades\Mail;
use App\Helper\GenerateNumberController;

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

        if ($request->with_role == 1) {
            $data_role = array(
                'role_id' => 2,
                'model_type' => 'App\Models\User',
                'model_id' => $user->id,
            );
            ModelHasRoles::create($data_role);
        }else{
            //Broadcast Email
            Mail::to($user->email)->send(new MailReferalCodeUser($user));
        }

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
